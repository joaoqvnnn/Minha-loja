import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { sendVerificationCode } from "@/lib/email";
import { signupSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log("[signup] ─── Nova tentativa de cadastro ───");

  try {
    // ═══ 1. Lê o corpo ═══════════════════════════════════════
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      console.error("[signup] JSON inválido no corpo");
      return NextResponse.json(
        { error: "Dados inválidos enviados" },
        { status: 400 }
      );
    }

    // ═══ 2. Valida ═══════════════════════════════════════════
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      console.warn("[signup] Validação falhou:", firstError.message);
      return NextResponse.json(
        { error: firstError.message, field: firstError.path[0] },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;
    console.log(`[signup] Dados ok — email: ${email}`);

    // ═══ 3. Verifica duplicidade ═════════════════════════════
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.warn(`[signup] E-mail já cadastrado: ${email}`);
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado", field: "email" },
        { status: 409 }
      );
    }

    // ═══ 4. Criptografa senha ════════════════════════════════
    const passwordHash = await hashPassword(password);

    // ═══ 5. Cria o usuário ═══════════════════════════════════
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        emailVerified: false
      }
    });

    console.log(`[signup] Usuário criado: ${user.id}`);

    // ═══ 6. Gera código ══════════════════════════════════════
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.emailCode.create({
      data: {
        userId: user.id,
        code,
        type: "signup",
        expiresAt
      }
    });

    console.log(`[signup] Código gerado para ${email}`);

    // ═══ 7. Envia e-mail (NÃO bloqueia se falhar) ════════════
    let emailSent = false;
    let emailError: string | null = null;

    try {
      console.log("[signup] Tentando enviar e-mail...");

      await Promise.race([
        sendVerificationCode(email, name, code),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout ao enviar e-mail (20s)")), 20000)
        )
      ]);

      emailSent = true;
      console.log(`[signup] E-mail enviado com sucesso para ${email}`);
    } catch (err: unknown) {
      const e = err as { message?: string; code?: string; response?: string };
      emailError = e.message || "Erro desconhecido ao enviar e-mail";

      console.error("[signup] ❌ FALHA NO E-MAIL:");
      console.error("  mensagem:", e.message);
      console.error("  código:", e.code);
      console.error("  resposta Gmail:", e.response);
    }

    // ═══ 8. Responde ═════════════════════════════════════════
    return NextResponse.json({
      success: true,
      message: emailSent
        ? "Cadastro criado. Verifique seu e-mail."
        : "Cadastro criado, mas houve um problema ao enviar o e-mail.",
      email,
      emailSent,
      emailError: emailError || undefined
    });
  } catch (error: unknown) {
    const e = error as { message?: string; code?: string };

    console.error("[signup] ❌ ERRO GERAL:");
    console.error("  mensagem:", e.message);
    console.error("  código:", e.code);
    console.error("  stack:", error);

    // Mensagens específicas por tipo de erro
    let userMessage = "Erro ao criar conta. Tente novamente.";

    if (e.code === "P1001") {
      userMessage = "Banco de dados indisponível. Aguarde alguns segundos.";
    } else if (e.code === "P2002") {
      userMessage = "E-mail já cadastrado.";
    } else if (e.message?.includes("Timeout")) {
      userMessage = "Tempo esgotado. Tente novamente.";
    }

    return NextResponse.json(
      { error: userMessage, detail: e.message },
      { status: 500 }
    );
  }
}
