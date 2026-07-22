import { z } from "zod";

export const biMetricSchema = z.object({
  name: z.string().min(3, "Nome da métrica obrigatório."),
  slug: z.string().min(3, "Slug da métrica obrigatório."),
  formula: z.string().min(5, "Fórmula SQL/Métrica obrigatória."),
  domain: z.enum(["sales", "financial", "marketing", "operations", "loyalty"])
});
