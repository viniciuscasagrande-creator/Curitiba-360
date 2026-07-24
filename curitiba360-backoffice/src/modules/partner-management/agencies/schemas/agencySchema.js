import { z } from 'zod';

const requiredText = (message) =>
  z
    .string()
    .trim()
    .min(1, message);

const optionalText = z
  .string()
  .trim()
  .optional()
  .or(z.literal(''));

const documentSchema = z.object({
  id: z.string(),
  name: requiredText(
    'Informe o nome do documento.',
  ),
  type: requiredText(
    'Informe o tipo do documento.',
  ),
  url: optionalText,
  file: z.any().nullable().optional(),
});

const managerSchema = z.object({
  id: z.string(),
  name: requiredText(
    'Informe o nome do gestor.',
  ),
  role: optionalText,
  email: z
    .string()
    .trim()
    .email('Informe um e-mail válido.'),
  phone: optionalText,
  permission: z.enum([
    'Administrador',
    'Financeiro',
    'Operacional',
    'Consulta',
  ]),
});

export const agencySchema = z.object({
  tradeName: requiredText(
    'Informe o nome fantasia.',
  ),

  corporateName: requiredText(
    'Informe a razão social.',
  ),

  cnpj: requiredText('Informe o CNPJ.')
    .refine(
      (value) =>
        value.replace(/\D/g, '')
          .length === 14,
      'O CNPJ deve possuir 14 números.',
    ),

  stateRegistration: optionalText,

  companyType: requiredText(
    'Selecione o tipo da empresa.',
  ),

  site: optionalText.refine(
    (value) =>
      !value ||
      /^https?:\/\/.+/i.test(value),
    'Informe um endereço iniciado por http:// ou https://.',
  ),

  commercialPhone: optionalText,

  responsibleName: requiredText(
    'Informe o nome do responsável.',
  ),

  responsibleCpf: requiredText(
    'Informe o CPF do responsável.',
  ).refine(
    (value) =>
      value.replace(/\D/g, '').length ===
      11,
    'O CPF deve possuir 11 números.',
  ),

  responsibleRg: optionalText,

  responsibleBirthDate: optionalText,

  email: z
    .string()
    .trim()
    .email('Informe um e-mail válido.'),

  responsiblePhone: requiredText(
    'Informe o telefone do responsável.',
  ),

  responsibleRole: optionalText,

  zipCode: requiredText('Informe o CEP.')
    .refine(
      (value) =>
        value.replace(/\D/g, '').length ===
        8,
      'O CEP deve possuir 8 números.',
    ),

  street: requiredText(
    'Informe o logradouro.',
  ),

  number: requiredText(
    'Informe o número.',
  ),

  complement: optionalText,

  district: requiredText(
    'Informe o bairro.',
  ),

  city: requiredText(
    'Informe a cidade.',
  ),

  state: requiredText(
    'Informe o estado.',
  ).max(2, 'Utilize a sigla da UF.'),

  country: requiredText(
    'Informe o país.',
  ),

  bankAccount: z.object({
    bankCode: optionalText,
    bankName: requiredText(
      'Informe o banco.',
    ),
    agency: requiredText(
      'Informe a agência bancária.',
    ),
    account: requiredText(
      'Informe o número da conta.',
    ),
    operation: optionalText,
    accountType: requiredText(
      'Selecione o tipo da conta.',
    ),
    holder: requiredText(
      'Informe o titular da conta.',
    ),
    holderDocument: requiredText(
      'Informe o documento do titular.',
    ),
    pixKey: optionalText,
    pixKeyType: optionalText,
  }),

  managers: z.array(managerSchema),
  documents: z.array(documentSchema),

  status: z.string().optional(),
});

export const agencyStepFields = {
  company: [
    'tradeName',
    'corporateName',
    'cnpj',
    'companyType',
    'site',
    'commercialPhone',
  ],

  responsible: [
    'responsibleName',
    'responsibleCpf',
    'email',
    'responsiblePhone',
  ],

  address: [
    'zipCode',
    'street',
    'number',
    'district',
    'city',
    'state',
    'country',
  ],

  bank: [
    'bankAccount.bankName',
    'bankAccount.agency',
    'bankAccount.account',
    'bankAccount.accountType',
    'bankAccount.holder',
    'bankAccount.holderDocument',
  ],

  managers: ['managers'],
  documents: ['documents'],
};
