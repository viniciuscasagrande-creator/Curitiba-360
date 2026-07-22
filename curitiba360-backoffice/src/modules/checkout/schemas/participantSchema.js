import { z } from "zod";
import { validateCPF } from "../utils/validators";

export const participantSchema = z.object({
  name: z.string().min(2, "Nome completo é obrigatório."),
  cpf: z.string().refine((val) => validateCPF(val), {
    message: "CPF inválido.",
  }),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de nascimento inválida.",
  }),
  email: z.string().email("Endereço de e-mail inválido."),
});
