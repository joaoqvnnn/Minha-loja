import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { sendVerificationCode } from "@/lib/email";
import { signupSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Valida os dados
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json(
        { error: firstError.message, field: firstError.path[0] },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;

    // 2. Verifica se e-mail já existe
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado", field: "email" },
        { status: 409 }
      );
    }

    // 3. Criptografa a senha
    const passwordHash = await hashPassword(password);

    // 4. Cria o usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        emailVerified: false
      }
    });

    // 5. Gera código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await prisma.emailCode.create({
      data: {
        userId: user.id,
        code,
        type: "signup",
        expiresAt
      }
    });

    // 6. Envia e-mail com o código
    try {
      await sendVerificationCode(email, name, code);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
      // Não bloqueia o cadastro — o usuário pode reenviar depois
    }

    return NextResponse.json({
      success: true,
      message: "Cadastro criado. Verifique seu e-mail.",
      email
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { error: "Erro ao criar conta. Tente novamente." },
      { status: 500 }
    );
  }
}
