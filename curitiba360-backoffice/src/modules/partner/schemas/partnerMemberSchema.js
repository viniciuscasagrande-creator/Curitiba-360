import { z } from "zod";

export const partnerMemberSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("E-mail inválido."),
  role: z.string({ required_error: "Selecione uma função." }),
});
