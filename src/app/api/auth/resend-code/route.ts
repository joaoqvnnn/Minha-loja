import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendVerificationCode } from "@/lib/email";

const resendSchema = z.object({
  email: z.string().trim().toLowerCase().email()
});

const RESEND_COOLDOWN_SECONDS = 60;
const MAX_RESENDS_PER_HOUR = 5;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = resendSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // 1. Busca o usuário
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Por segurança, não revela se o e-mail existe ou não
      return NextResponse.json({
        success: true,
        message: "Se o e-mail existir, um novo código será enviado."
      });
    }

    // 2. Se já está verificado, não precisa reenviar
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Este e-mail já foi verificado" },
        { status: 400 }
      );
    }

    // 3. Cooldown — último código enviado há menos de 60s?
    const lastCode = await prisma.emailCode.findFirst({
      where: { userId: user.id, type: "signup" },
      orderBy: { createdAt: "desc" }
    });

    if (lastCode) {
      const secondsSinceLastCode =
        (Date.now() - lastCode.createdAt.getTime()) / 1000;

      if (secondsSinceLastCode < RESEND_COOLDOWN_SECONDS) {
        const wait = Math.ceil(
          RESEND_COOLDOWN_SECONDS - secondsSinceLastCode
        );
        return NextResponse.json(
          { error: `Aguarde ${wait}s para reenviar` },
          { status: 429 }
        );
      }
    }

    // 4. Limite de 5 reenvios por hora
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const resendsLastHour = await prisma.emailCode.count({
      where: {
        userId: user.id,
        type: "signup",
        createdAt: { gte: oneHourAgo }
      }
    });

    if (resendsLastHour >= MAX_RESENDS_PER_HOUR) {
      return NextResponse.json(
        { error: "Muitos reenvios. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    // 5. Invalida códigos antigos ainda não usados
    await prisma.emailCode.updateMany({
      where: {
        userId: user.id,
        type: "signup",
        usedAt: null
      },
      data: { usedAt: new Date() }
    });

    // 6. Gera novo código
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

    // 7. Envia por e-mail
    try {
      await sendVerificationCode(user.email, user.name, code);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
      return NextResponse.json(
        { error: "Não foi possível enviar o e-mail. Tente novamente." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Novo código enviado"
    });
  } catch (error) {
    console.error("Erro no reenvio:", error);
    return NextResponse.json(
      { error: "Erro ao reenviar código" },
      { status: 500 }
    );
  }
}
