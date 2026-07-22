import { z } from "zod";

export const creditCardSchema = z.object({
  cardNumber: z.string().min(19, "Número do cartão inválido."),
  holderName: z.string().min(3, "Nome no cartão é obrigatório."),
  expiry: z.string().min(5, "Validade inválida (MM/AA)."),
  cvv: z.string().min(3, "CVV inválido.").max(4),
  installments: z.number().min(1, "Selecione as parcelas."),
});

export const paymentSchema = z.object({
  method: z.enum(["pix", "credit_card", "debit_card", "apple_pay", "google_pay"]),
  creditCard: creditCardSchema.optional(),
});
