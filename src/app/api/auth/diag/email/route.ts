import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const result: Record<string, unknown> = {
    passo1_variaveis: {
      SMTP_HOST: process.env.SMTP_HOST || "FALTANDO",
      SMTP_PORT: process.env.SMTP_PORT || "FALTANDO",
      SMTP_USER: process.env.SMTP_USER || "FALTANDO",
      SMTP_PASS: process.env.SMTP_PASS
        ? `ok (${process.env.SMTP_PASS.length} caracteres)`
        : "FALTANDO",
      SMTP_PASS_tem_espaco: process.env.SMTP_PASS?.includes(" ") ? "SIM" : "NÃO",
      SMTP_FROM: process.env.SMTP_FROM || "FALTANDO",
      SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || "FALTANDO"
    }
  };

  try {
    const port = Number(process.env.SMTP_PORT || 465);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 15000,
      greetingTimeout: 15000
    });

    result.passo2_conexao = "Testando conexão...";
    await transporter.verify();
    result.passo2_conexao = "✅ Gmail aceitou usuário e senha";

    result.passo3_envio = "Enviando e-mail de teste...";
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "Teste"}" <${
        process.env.SMTP_FROM || process.env.SMTP_USER
      }>`,
      to: process.env.SMTP_FROM || process.env.SMTP_USER,
      subject: "Teste — Fofoca Store",
      html: `<h2>Se você está vendo isso, o envio funciona!</h2>`
    });

    result.passo3_envio = "✅ E-mail de teste enviado";
    result.info_messageId = info.messageId;
    result.info_accepted = info.accepted;
    result.info_rejected = info.rejected;
    result.info_response = info.response;
    result.resultado = "🎉 TUDO FUNCIONANDO";
  } catch (error: unknown) {
    const e = error as { message?: string; code?: string; response?: string };
    result.erro = "❌ FALHOU";
    result.erro_mensagem = e.message || String(error);
    result.erro_codigo = e.code || "sem código";
    result.erro_resposta = e.response || "sem resposta do Gmail";
  }

  return NextResponse.json(result, {
    status: 200,
    headers: { "Cache-Control": "no-store" }
  });
}
