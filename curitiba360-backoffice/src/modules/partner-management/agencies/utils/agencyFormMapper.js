export function maskCnpj(value) {
  return String(value ?? '')
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
}

export function maskCpf(value) {
  return String(value ?? '')
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
    .slice(0, 14);
}

export function maskPhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

export function maskCep(value) {
  return String(value ?? '')
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
}

export const initialAgencyFormData = {
  // Etapa 1 - Empresa
  tradeName: '',
  corporateName: '',
  cnpj: '',
  stateRegistration: '',
  companyType: 'Empresa de Pequeno Porte',
  site: '',
  commercialPhone: '',

  // Etapa 2 - Responsável
  responsibleName: '',
  responsibleCpf: '',
  responsibleRg: '',
  responsibleBirthDate: '',
  email: '',
  responsiblePhone: '',
  responsibleRole: 'Diretor / Sócio',

  // Etapa 3 - Endereço
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  district: '',
  city: 'Curitiba',
  state: 'PR',
  country: 'Brasil',

  // Etapa 4 - Dados Bancários
  bankCode: '001',
  bankName: 'Banco do Brasil',
  agency: '',
  account: '',
  accountType: 'Corrente',
  pixKey: '',
  pixKeyType: 'CNPJ',
  holder: '',
  holderDocument: '',

  // Etapa 5 - Gestores
  managers: [],

  // Etapa 6 - Documentos
  documents: [],
};
