import { z } from "zod";

export const securitySchema = z.object({
  currentPassword: z.string().min(1, "A senha atual é obrigatória."),
  newPassword: z
    .string()
    .min(8, "A nova senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Z]/, "A nova senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A nova senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A nova senha deve conter pelo menos um número.")
    .regex(/[^A-Za-z0-9]/, "A nova senha deve conter pelo menos um caractere especial."),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});
