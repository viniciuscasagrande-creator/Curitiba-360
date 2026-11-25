import { z } from "zod";

export const partnerProfileSchema = z.object({
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  website: z.string().url("Informe um link de site válido.").or(z.literal("")),
  instagram: z.string().or(z.literal("")),
});
