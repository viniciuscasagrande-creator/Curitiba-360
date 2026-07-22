import { z } from "zod";

export const datasetSchema = z.object({
  name: z.string().min(2, "Nome da tabela obrigatório."),
  type: z.string().min(2, "Tipo da tabela obrigatório (Fato ou Dimensão).")
});
