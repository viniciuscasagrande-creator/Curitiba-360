import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter no mínimo 5 caracteres.")
    .max(100, "O título deve ter no máximo 100 caracteres."),

  type: z.string({
    required_error: "Selecione o tipo do produto.",
  }),

  category: z.string({
    required_error: "Selecione uma categoria.",
  }),

  shortDescription: z
    .string()
    .min(10, "A descrição curta deve ter no mínimo 10 caracteres.")
    .max(250, "A descrição curta deve ter no máximo 250 caracteres."),

  description: z
    .string()
    .min(20, "A descrição detalhada deve ter no mínimo 20 caracteres."),

  basePrice: z
    .number()
    .min(0, "O preço base não pode ser negativo."),

  maxCapacity: z
    .number()
    .min(1, "A capacidade mínima é 1 participante."),

  limitPerCPF: z
    .number()
    .min(1, "O limite por CPF deve ser de no mínimo 1 ingresso."),
});

export default productSchema;
