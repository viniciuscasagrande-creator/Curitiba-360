import { z } from "zod";

export const biFilterSchema = z.object({
  period: z.string().min(1, "O período é obrigatório."),
  organizationId: z.string().optional(),
  partnerId: z.string().optional()
});
