export function maskCnpj(value = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function maskCpf(value = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/\.(\d{3})(\d)/, '.$1.$2')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

export function maskCep(value = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');
}

export function maskPhone(value = '') {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return numbers
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export const emptyAgencyForm = {
  tradeName: '',
  corporateName: '',
  cnpj: '',
  stateRegistration: '',
  companyType: '',
  site: '',
  commercialPhone: '',

  responsibleName: '',
  responsibleCpf: '',
  responsibleRg: '',
  responsibleBirthDate: '',
  email: '',
  responsiblePhone: '',
  responsibleRole: '',

  zipCode: '',
  street: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  country: 'Brasil',

  bankAccount: {
    bankCode: '',
    bankName: '',
    agency: '',
    account: '',
    operation: '',
    accountType: '',
    holder: '',
    holderDocument: '',
    pixKey: '',
    pixKeyType: '',
  },

  managers: [],
  documents: [],

  status: 'Pendente de Aprovação',
};

export function mapAgencyToForm(agency) {
  if (!agency) {
    return structuredClone(emptyAgencyForm);
  }

  return {
    ...emptyAgencyForm,
    ...agency,

    bankAccount: {
      ...emptyAgencyForm.bankAccount,
      ...(agency.bankAccount ?? {}),
    },

    managers: (agency.managers ?? []).map((manager) => ({
      id: manager.id ?? crypto.randomUUID(),
      name: manager.name ?? '',
      role: manager.role ?? '',
      email: manager.email ?? '',
      phone: manager.phone ?? '',
      permission: manager.permission ?? 'Consulta',
    })),

    documents: (agency.documents ?? []).map((document) => ({
      id: document.id ?? crypto.randomUUID(),
      name: document.name ?? '',
      type: document.type ?? 'Outros',
      url: document.url ?? '',
      file: null,
    })),
  };
}

export function mapFormToAgency(formData, existingAgency) {
  const now = new Date().toISOString();

  return {
    ...existingAgency,
    ...formData,

    bankAccount: {
      ...formData.bankAccount,
    },

    managers: formData.managers.map((manager) => ({
      ...manager,
    })),

    documents: formData.documents.map((document) => ({
      id: document.id,
      name: document.name,
      type: document.type,
      url: document.url ?? '',
    })),

    status:
      existingAgency?.status ??
      formData.status ??
      'Pendente de Aprovação',

    agentsCount: existingAgency?.agentsCount ?? 0,

    createdAt: existingAgency?.createdAt ?? now,

    updatedAt: now,
  };
}
