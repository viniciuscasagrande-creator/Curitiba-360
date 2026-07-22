import { z } from "zod";

export const billingSchema = z.object({
  cep: z.string().min(9, "CEP inválido."),
  street: z.string().min(3, "O logradouro é obrigatório."),
  number: z.string().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "O bairro é obrigatório."),
  city: z.string().min(2, "A cidade é obrigatória."),
  state: z.string().length(2, "O estado (UF) deve ter 2 caracteres."),
});
