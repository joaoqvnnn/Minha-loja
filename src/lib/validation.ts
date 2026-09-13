import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Nome precisa ter pelo menos 3 letras")
      .max(80, "Nome muito longo"),

    email: z.string().trim().toLowerCase().email("E-mail inválido"),

    phone: z
      .string()
      .trim()
      .regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos (só números)"),

    password: z
      .string()
      .min(8, "Senha precisa ter pelo menos 8 caracteres")
      .max(72, "Senha muito longa")
      .regex(/[a-zA-Z]/, "Senha precisa ter pelo menos uma letra")
      .regex(/\d/, "Senha precisa ter pelo menos um número"),

    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  });

export type SignupInput = z.infer<typeof signupSchema>;

export const verifyCodeSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  code: z.string().trim().regex(/^\d{6}$/, "O código tem 6 dígitos")
});

export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z.string().min(1, "Digite sua senha")
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail inválido")
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8, "Senha precisa ter pelo menos 8 caracteres")
      .regex(/[a-zA-Z]/, "Senha precisa ter pelo menos uma letra")
      .regex(/\d/, "Senha precisa ter pelo menos um número"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  });
