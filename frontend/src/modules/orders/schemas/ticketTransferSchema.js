import { z } from "zod";

export const ticketTransferSchema =
  z.object({
    name: z
      .string()
      .min(
        3,
        "Informe o nome completo."
      ),

    email: z
      .string()
      .email(
        "Informe um e-mail válido."
      ),

    cpf: z
      .string()
      .min(
        11,
        "Informe um CPF válido."
      ),

    confirmEmail: z
      .string()
      .email(
        "Confirme o e-mail."
      ),
  })
  .refine(
    (data) =>
      data.email ===
      data.confirmEmail,
    {
      message:
        "Os e-mails não são iguais.",
      path: ["confirmEmail"],
    }
  );
