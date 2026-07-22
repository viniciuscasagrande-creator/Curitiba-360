import { z } from "zod";

export const preferencesSchema = z.object({
  categories: z
    .array(z.string())
    .max(
      10,
      "Selecione no máximo 10 categorias."
    ),

  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    whatsapp: z.boolean(),
    promotions: z.boolean(),
    events: z.boolean(),
  }),

  accessibility: z.object({
    reducedMotion: z.boolean(),
    highContrast: z.boolean(),
    largerText: z.boolean(),
  }),
});
