import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const FROM = `"${process.env.SMTP_FROM_NAME || "Minha Loja"}" <${
  process.env.SMTP_FROM || process.env.SMTP_USER
}>`;

/**
 * Envia e-mail com código de verificação de cadastro.
 */
export async function sendVerificationCode(
  to: string,
  name: string,
  code: string
): Promise<void> {
  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Seu código de verificação",
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
}

/**
 * Envia e-mail de recuperação de senha.
 */
export async function sendPasswordReset(
  to: string,
  name: string,
  resetLink: string
): Promise<void> {
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
