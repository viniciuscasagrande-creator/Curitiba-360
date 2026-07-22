import { z } from "zod";

export const payoutRequestSchema =
  z.object({
    amount: z.coerce
      .number({
        invalid_type_error:
          "Informe um valor válido.",
      })
      .positive(
        "O valor deve ser maior que zero."
      ),

    bankAccountId: z
      .string()
      .min(
        1,
        "Selecione uma conta bancária."
      ),

    confirmation: z
      .literal(true, {
        errorMap: () => ({
          message:
            "Confirme os dados da solicitação.",
        }),
      }),
  });
