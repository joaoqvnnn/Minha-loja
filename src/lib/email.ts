import nodemailer from "nodemailer";

const FROM_NAME = process.env.SMTP_FROM_NAME || "Fofoca Store";
const FROM_EMAIL = process.env.SMTP_FROM || process.env.SMTP_USER;
const FROM = `"${FROM_NAME}" <${FROM_EMAIL}>`;

// ═══════════════════════════════════════════════════════════════
// CRIA O TRANSPORTER
// Usa porta 465 com SSL (mais confiável no Render que 587)
// ═══════════════════════════════════════════════════════════════

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 465);
  const useSSL = port === 465;

  console.log("[email] Criando transporter:");
  console.log("  host:", process.env.SMTP_HOST);
  console.log("  port:", port);
  console.log("  secure:", useSSL);
  console.log("  user:", process.env.SMTP_USER);
  console.log(
    "  pass length:",
    process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0
  );
  console.log(
    "  pass tem espaço:",
    process.env.SMTP_PASS?.includes(" ") ? "SIM" : "NÃO"
  );

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: useSSL,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    tls: {
      rejectUnauthorized: false
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// DIAGNÓSTICO
// ═══════════════════════════════════════════════════════════════

export function checkEmailConfig() {
  return {
    SMTP_HOST: process.env.SMTP_HOST || "FALTANDO",
    SMTP_PORT: process.env.SMTP_PORT || "FALTANDO",
    SMTP_USER: process.env.SMTP_USER || "FALTANDO",
    SMTP_PASS: process.env.SMTP_PASS
      ? `ok (${process.env.SMTP_PASS.length} caracteres)`
      : "FALTANDO",
    SMTP_PASS_tem_espaco: process.env.SMTP_PASS?.includes(" ") ? "SIM" : "NÃO",
    SMTP_FROM: process.env.SMTP_FROM || "FALTANDO",
    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || "FALTANDO"
  };
}

// ═══════════════════════════════════════════════════════════════
// ENVIO DE CÓDIGO
// ═══════════════════════════════════════════════════════════════

export async function sendVerificationCode(
  to: string,
  name: string,
  code: string
): Promise<void> {
  const transporter = createTransporter();

  console.log("[email] Verificando conexão com o Gmail...");
  await transporter.verify();
  console.log("[email] ✅ Conexão verificada com sucesso");

  console.log(`[email] Enviando código ${code} para ${to}...`);
  const info = await transporter.sendMail({
    from: FROM,
    to,
    subject: "Seu código de verificação — Fofoca Store",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="font-size: 22px; font-weight: 700; color: #18181b; margin: 0 0 16px 0;">
          Olá, ${name}!
        </h1>
        <p style="font-size: 15px; color: #52525b; line-height: 1.6; margin: 0 0 24px 0;">
          Use o código abaixo para confirmar sua conta. Ele é válido por <strong>15 minutos</strong>.
        </p>
        <div style="background: #f4f4f5; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
          <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #7c3aed; font-family: monospace;">
            ${code}
          </div>
        </div>
        <p style="font-size: 13px; color: #71717a; line-height: 1.5; margin: 24px 0 0 0;">
          Se você não solicitou este código, ignore este e-mail.
        </p>
      </div>
    `
  });

  console.log("[email] ✅ E-mail enviado!");
  console.log("  messageId:", info.messageId);
  console.log("  accepted:", info.accepted);
  console.log("  rejected:", info.rejected);
  console.log("  response:", info.response);
}

// ═══════════════════════════════════════════════════════════════
// ENVIO DE RESET DE SENHA
// ═══════════════════════════════════════════════════════════════

export async function sendPasswordReset(
  to: string,
  name: string,
  resetLink: string
): Promise<void> {
  const transporter = createTransporter();

  await transporter.verify();

  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Recuperação de senha",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="font-size: 22px; font-weight: 700; color: #18181b; margin: 0 0 16px 0;">
          Olá, ${name}
        </h1>
        <p style="font-size: 15px; color: #52525b; line-height: 1.6; margin: 0 0 24px 0;">
          Recebemos um pedido para redefinir sua senha. Toque no botão abaixo para continuar.
        </p>
        <a href="${resetLink}" style="display: inline-block; background: #7c3aed; color: #ffffff; padding: 14px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; text-decoration: none;">
          Redefinir senha
        </a>
        <p style="font-size: 13px; color: #71717a; line-height: 1.5; margin: 24px 0 0 0;">
          O link expira em 1 hora. Se você não solicitou, ignore este e-mail.
        </p>
      </div>
    `
  });
}
