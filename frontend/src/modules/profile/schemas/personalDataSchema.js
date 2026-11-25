import { z } from "zod";
import { validateCpf, validatePhone, validateCep } from "../utils/validators";

export const personalDataSchema = z.zobject ? z.zobject({
  name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres."),
  phone: z.string().refine(validatePhone, "O telefone deve conter 10 ou 11 dígitos."),
  birthDate: z.string().nullable().or(z.string().min(1, "A data de nascimento é obrigatória.")),
  cpf: z.string().refine(validateCpf, "Informe um CPF válido."),
  gender: z.string().min(1, "Selecione o gênero."),
  address: z.object({
    zipCode: z.string().refine(validateCep, "O CEP deve conter 8 dígitos."),
    street: z.string().min(1, "A rua é obrigatória."),
    number: z.string().min(1, "O número é obrigatório."),
    complement: z.string().optional().nullable().or(z.string()),
    neighborhood: z.string().min(1, "O bairro é obrigatório."),
    city: z.string().min(1, "A cidade é obrigatória."),
    state: z.string().length(2, "O estado deve conter exatamente 2 letras."),
  }),
}) : z.object({
  name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres."),
  phone: z.string().refine(validatePhone, "O telefone deve conter 10 ou 11 dígitos."),
  birthDate: z.string().nullable().or(z.string().min(1, "A data de nascimento é obrigatória.")),
  cpf: z.string().refine(validateCpf, "Informe um CPF válido."),
  gender: z.string().min(1, "Selecione o gênero."),
  address: z.object({
    zipCode: z.string().refine(validateCep, "O CEP deve conter 8 dígitos."),
    street: z.string().min(1, "A rua é obrigatória."),
    number: z.string().min(1, "O número é obrigatório."),
    complement: z.string().optional().nullable().or(z.string()),
    neighborhood: z.string().min(1, "O bairro é obrigatório."),
    city: z.string().min(1, "A cidade é obrigatória."),
    state: z.string().length(2, "O estado deve conter exatamente 2 letras."),
  }),
});
