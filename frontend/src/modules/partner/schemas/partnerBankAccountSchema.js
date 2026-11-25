import { z } from "zod";

export const partnerBankAccountSchema = z.object({
  holderName: z.string().min(3, "O nome do titular deve ter no mínimo 3 caracteres."),
  holderDocument: z.string().min(11, "CPF ou CNPJ inválido."),
  bankName: z.string().min(2, "Informe o nome do banco."),
  agency: z.string().min(2, "Agência inválida."),
  account: z.string().min(2, "Conta inválida."),
  accountDigit: z.string().min(1, "Dígito da conta inválido."),
  pixKey: z.string().nullable().optional(),
});
