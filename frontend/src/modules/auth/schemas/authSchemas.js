import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Informe seu e-mail.")
  .email("Informe um e-mail válido.");

const passwordSchema = z
  .string()
  .min(8, "A senha deve possuir no mínimo 8 caracteres.")
  .regex(
    /[A-Z]/,
    "A senha deve possuir pelo menos uma letra maiúscula."
  )
  .regex(
    /[a-z]/,
    "A senha deve possuir pelo menos uma letra minúscula."
  )
  .regex(
    /\d/,
    "A senha deve possuir pelo menos um número."
  )
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    "A senha deve possuir pelo menos um caractere especial."
  );

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Informe seu telefone.")
  .refine(
    (value) => {
      const digits = value.replace(/\D/g, "");

      return digits.length === 10 || digits.length === 11;
    },
    {
      message: "Informe um telefone válido com DDD.",
    }
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Informe sua senha."),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: z
      .string()
      .min(1, "Confirme sua nova senha."),
  })
  .refine(
    (data) =>
      data.password === data.passwordConfirmation,
    {
      message: "As senhas não são iguais.",
      path: ["passwordConfirmation"],
    }
  );

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Informe seu nome completo."),

    email: emailSchema,

    phone: phoneSchema,

    password: passwordSchema,

    passwordConfirmation: z
      .string()
      .min(1, "Confirme sua senha."),

    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message:
          "Você precisa aceitar os termos para continuar.",
      }),
    }),
  })
  .refine(
    (data) =>
      data.password === data.passwordConfirmation,
    {
      message: "As senhas não são iguais.",
      path: ["passwordConfirmation"],
    }
  );
