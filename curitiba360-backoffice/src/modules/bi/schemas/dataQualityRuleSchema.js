import { z } from "zod";

export const dataQualityRuleSchema = z.object({
  tableName: z.string().min(2, "Nome da tabela obrigatório."),
  columnName: z.string().min(2, "Nome da coluna obrigatório."),
  ruleType: z.string().min(2, "Tipo da validação (Ex: not_null) obrigatório.")
});
