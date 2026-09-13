import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCodeSchema } from "@/lib/validation";

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Valida o formato
    const parsed = verifyCodeSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email, code } = parsed.data;

    // 2. Busca o usuário
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // 3. Se já está verificado, libera direto
    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "E-mail já verificado"
      });
    }

    // 4. Busca o código mais recente desse usuário
    const emailCode = await prisma.emailCode.findFirst({
      where: {
        userId: user.id,
        type: "signup",
        usedAt: null
      },
      orderBy: { createdAt: "desc" }
    });

    if (!emailCode) {
      return NextResponse.json(
        { error: "Nenhum código ativo. Solicite um novo." },
        { status: 400 }
      );
    }

    // 5. Verifica se expirou
    if (emailCode.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Código expirado. Solicite um novo." },
        { status: 400 }
      );
    }

    // 6. Verifica se excedeu tentativas
    if (emailCode.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Muitas tentativas. Solicite um novo código." },
        { status: 429 }
      );
    }

    // 7. Confere o código
    if (emailCode.code !== code) {
      await prisma.emailCode.update({
        where: { id: emailCode.id },
        data: { attempts: { increment: 1 } }
      });

      const remaining = MAX_ATTEMPTS - (emailCode.attempts + 1);
      return NextResponse.json(
        {
          error:
            remaining > 0
              ? `Código incorreto. ${remaining} tentativa(s) restante(s).`
              : "Muitas tentativas. Solicite um novo código."
        },
        { status: 400 }
      );
    }

    // 8. Tudo certo — marca usuário como verificado e consome o código
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          emailVerifiedAt: new Date()
        }
      }),
      prisma.emailCode.update({
        where: { id: emailCode.id },
        data: { usedAt: new Date() }
      })
    ]);

    return NextResponse.json({
      success: true,
      message: "E-mail verificado com sucesso"
    });
  } catch (error) {
    console.error("Erro na verificação:", error);
    return NextResponse.json(
      { error: "Erro ao verificar código. Tente novamente." },
      { status: 500 }
    );
  }
}
