import { z } from "zod";

export const partnerRegistrationSchema = z.object({
  legalName: z.string().min(3, "O nome empresarial deve ter no mínimo 3 caracteres."),
  tradeName: z.string().min(3, "O nome fantasia deve ter no mínimo 3 caracteres."),
  document: z.string().min(11, "CNPJ ou CPF inválido."),
  responsibleName: z.string().min(3, "Nome do responsável inválido."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().min(8, "Telefone inválido."),
  type: z.string({ required_error: "Selecione o tipo de parceiro." }),
});
