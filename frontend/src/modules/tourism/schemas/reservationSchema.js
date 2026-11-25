import { z } from "zod";

const participantSchema = z.object({
  name: z.string().min(3, "Informe o nome completo."),
  document: z.string().optional(),
  birthDate: z.string().optional()
});

export const reservationSchema = z.object({
  attractionId: z.string().min(1, "Atrativo inválido."),
  visitDate: z.string().min(1, "Selecione uma data."),
  visitTime: z.string().optional(),
  participants: z
    .array(participantSchema)
    .min(1, "Informe pelo menos um participante.")
    .max(10, "O limite é de 10 participantes."),
  acceptPolicies: z.literal(true, {
    errorMap: () => ({
      message: "Aceite as políticas da reserva."
    })
  })
});
