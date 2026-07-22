import { z } from "zod";

export const biReportSchema = z.object({
  name: z.string().min(3, "O nome do relatório deve conter pelo menos 3 caracteres."),
  metrics: z.array(z.string()).min(1, "Selecione pelo menos uma métrica."),
  dimensions: z.array(z.string()).min(1, "Selecione pelo menos uma dimensão.")
});
