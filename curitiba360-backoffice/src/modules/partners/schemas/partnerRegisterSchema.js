import { z } from "zod";

function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

export const partnerRegisterSchema = z
  .object({
    responsibleName: z
      .string()
      .trim()
      .min(3, "Informe o nome do responsável."),

    responsibleEmail: z
      .string()
      .trim()
      .email("Informe um e-mail válido."),

    responsiblePhone: z
      .string()
      .trim()
      .refine(
        (value) => {
          const digits = onlyDigits(value);

          return (
            digits.length === 10 ||
            digits.length === 11
          );
        },
        {
          message: "Informe um telefone válido com DDD.",
        }
      ),

    companyName: z
      .string()
      .trim()
      .min(2, "Informe o nome da empresa."),

    tradeName: z
      .string()
      .trim()
      .min(2, "Informe o nome comercial."),

    documentType: z.enum(["cnpj", "cpf"]),

    document: z
      .string()
      .trim()
      .min(1, "Informe o documento."),

    category: z
      .string()
      .min(1, "Selecione uma categoria."),

    website: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;

          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        },
        {
          message:
            "Informe uma URL válida, incluindo https://.",
        }
      ),

    instagram: z
      .string()
      .trim()
      .optional(),

    zipCode: z
      .string()
      .trim()
      .refine(
        (value) =>
          onlyDigits(value).length === 8,
        {
          message: "Informe um CEP válido.",
        }
      ),

    street: z
      .string()
      .trim()
      .min(2, "Informe o endereço."),

    number: z
      .string()
      .trim()
      .min(1, "Informe o número."),

    complement: z
      .string()
      .trim()
      .optional(),

    neighborhood: z
      .string()
      .trim()
      .min(2, "Informe o bairro."),

    city: z
      .string()
      .trim()
      .min(2, "Informe a cidade."),

    state: z
      .string()
      .length(2, "Informe a UF."),

    description: z
      .string()
      .trim()
      .min(
        30,
        "Descreva o negócio com pelo menos 30 caracteres."
      )
      .max(
        1000,
        "A descrição deve ter no máximo 1000 caracteres."
      ),

    acceptCommercialTerms: z.literal(true, {
      errorMap: () => ({
        message:
          "Você precisa aceitar os termos comerciais.",
      }),
    }),

    acceptPrivacy: z.literal(true, {
      errorMap: () => ({
        message:
          "Você precisa aceitar a política de privacidade.",
      }),
    }),
  })
  .superRefine((data, context) => {
    const documentDigits = onlyDigits(
      data.document
    );

    if (
      data.documentType === "cnpj" &&
      documentDigits.length !== 14
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["document"],
        message: "Informe um CNPJ válido.",
      });
    }

    if (
      data.documentType === "cpf" &&
      documentDigits.length !== 11
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["document"],
        message: "Informe um CPF válido.",
      });
    }
  });
