import { z } from "zod";
import { validateCPF } from "../utils/validators";

export const buyerSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  surname: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres."),
  cpf: z.string().refine((val) => validateCPF(val), {
    message: "CPF inválido.",
  }),
  email: z.string().email("Endereço de e-mail inválido."),
  phone: z.string().min(14, "Telefone inválido."),
});
