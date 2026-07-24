export const attractionMock = {
  id: 'parque-jaime-lerner',
  name: 'Parque Jaime Lerner',
  city: 'Curitiba',
  state: 'PR',
};

export const salesReportMock = [
  {
    id: 'sale-001',
    category: 'Adulto',
    quantity: 2798,
    unitPrice: 17.5,
    total: 48965,
  },
  {
    id: 'sale-002',
    category: 'Morador Curitiba Adulto',
    quantity: 2798,
    unitPrice: 17.5,
    total: 48965,
  },
  {
    id: 'sale-003',
    category: 'Estudante',
    quantity: 2798,
    unitPrice: 17.5,
    total: 48965,
  },
  {
    id: 'sale-004',
    category: 'Doador',
    quantity: 2798,
    unitPrice: 17.5,
    total: 48965,
  },
];

export const categoryOptions = [
  'Adulto',
  'Morador Curitiba Adulto',
  'Estudante',
  'Doador',
];

export const agentOptions = [
  'João da Silva',
  'Pedro da Silva',
];

export const paymentTypeOptions = [
  'Pix',
  'Cartão de crédito',
  'Cartão de débito',
  'Dinheiro',
];

export const ticketTypeOptions = [
  'Inteira',
  'Meia',
  'Cortesia',
];

export const categoriesReportMock = [
  {
    id: 'category-report-001',
    category: 'Adulto',
    date: '2026-01-02T10:10:00',
    seller: 'Site Curitiba 360',
    paymentType: 'Pix',
    ticketType: 'Inteira',
    price: 17.5,
    fee: 1.5,
  },
  {
    id: 'category-report-002',
    category: 'Morador Curitiba Adulto',
    date: '2026-01-02T11:00:00',
    seller: 'Site Curitiba 360',
    paymentType: 'Cartão de crédito',
    ticketType: 'Inteira',
    price: 17.5,
    fee: 1.5,
  },
  {
    id: 'category-report-003',
    category: 'Estudante',
    date: '2026-01-02T12:00:00',
    seller: 'Site Curitiba 360',
    paymentType: 'Pix',
    ticketType: 'Meia',
    price: 17.5,
    fee: 1.5,
  },
  {
    id: 'category-report-004',
    category: 'Doador',
    date: '2026-01-02T13:00:00',
    seller: 'Site Curitiba 360',
    paymentType: 'Pix',
    ticketType: 'Cortesia',
    price: 17.5,
    fee: 1.5,
  },
  {
    id: 'category-report-005',
    category: 'Adulto',
    date: '2026-01-02T14:30:00',
    seller: 'João da Silva',
    paymentType: 'Cartão de crédito',
    ticketType: 'Inteira',
    price: 17.5,
    fee: 1.5,
  },
  {
    id: 'category-report-006',
    category: 'Estudante',
    date: '2026-01-02T15:20:00',
    seller: 'Pedro da Silva',
    paymentType: 'Cartão de débito',
    ticketType: 'Meia',
    price: 17.5,
    fee: 1.5,
  },
];

export const courtesyReportMock = [
  {
    id: 'courtesy-001',
    date: '2026-01-01T10:20:00',
    category: 'Adulto',
    seller: 'João da Silva',
    agency: 'Site Curitiba 360',
    customer: 'Carlos Eduardo',
    reason: 'Patrocínio',
    quantity: 2,
    unitValue: 17.5,
  },
  {
    id: 'courtesy-002',
    date: '2026-01-01T11:15:00',
    category: 'Estudante',
    seller: 'Pedro da Silva',
    agency: 'Site Curitiba 360',
    customer: 'Maria Fernanda',
    reason: 'Ação social',
    quantity: 4,
    unitValue: 17.5,
  },
  {
    id: 'courtesy-003',
    date: '2026-01-01T12:45:00',
    category: 'Doador',
    seller: 'João da Silva',
    agency: 'Site Curitiba 360',
    customer: 'Empresa XPTO',
    reason: 'Parceiro',
    quantity: 10,
    unitValue: 17.5,
  },
  {
    id: 'courtesy-004',
    date: '2026-01-01T14:30:00',
    category: 'Morador Curitiba Adulto',
    seller: 'Site Curitiba 360',
    agency: 'Portal',
    customer: 'José Pereira',
    reason: 'Cortesia comercial',
    quantity: 1,
    unitValue: 17.5,
  },
  {
    id: 'courtesy-005',
    date: '2026-01-02T09:40:00',
    category: 'Adulto',
    seller: 'Ana Oliveira',
    agency: 'Bilheteria',
    customer: 'Mariana Souza',
    reason: 'Imprensa',
    quantity: 2,
    unitValue: 17.5,
  },
  {
    id: 'courtesy-006',
    date: '2026-01-02T15:10:00',
    category: 'Estudante',
    seller: 'Site Curitiba 360',
    agency: 'Portal',
    customer: 'Instituto Curitiba',
    reason: 'Ação institucional',
    quantity: 5,
    unitValue: 17.5,
  },
];

export const courtesyReasonOptions = [
  'Patrocínio',
  'Ação social',
  'Parceiro',
  'Cortesia comercial',
  'Imprensa',
  'Ação institucional',
];

export const validationStatusOptions = [
  "Validado",
  "Rejeitado",
  "Cancelado",
  "Expirado"
];

export const validationReportMock = [
  {
    id: 'validation-001',
    validationDate: '2026-01-03T09:12:10',
    ticketCode: '123456789001',
    orderNumber: 'PED-1001',
    customer: 'Carlos Eduardo',
    category: 'Adulto',
    gate: 'Portaria Principal',
    validator: 'Totem 01',
    operator: 'João Souza',
    status: 'Validado',
  },
  {
    id: 'validation-002',
    validationDate: '2026-01-03T09:18:45',
    ticketCode: '123456789002',
    orderNumber: 'PED-1002',
    customer: 'Maria Fernanda',
    category: 'Estudante',
    gate: 'Portaria Principal',
    validator: 'Totem 02',
    operator: 'Pedro Lima',
    status: 'Validado',
  },
  {
    id: 'validation-003',
    validationDate: '2026-01-03T09:25:11',
    ticketCode: '123456789003',
    orderNumber: 'PED-1003',
    customer: 'José Pereira',
    category: 'Adulto',
    gate: 'Portaria VIP',
    validator: 'Leitor Manual',
    operator: 'Ana Paula',
    status: 'Rejeitado',
  },
  {
    id: 'validation-004',
    validationDate: '2026-01-03T09:40:55',
    ticketCode: '123456789004',
    orderNumber: 'PED-1004',
    customer: 'Empresa XPTO',
    category: 'Cortesia',
    gate: 'Portaria Serviço',
    validator: 'Totem 03',
    operator: 'Lucas Ferreira',
    status: 'Cancelado',
  },
  {
    id: 'validation-005',
    validationDate: '2026-01-03T10:15:33',
    ticketCode: '123456789005',
    orderNumber: 'PED-1005',
    customer: 'Juliana Costa',
    category: 'Adulto',
    gate: 'Portaria Principal',
    validator: 'Totem 01',
    operator: 'João Souza',
    status: 'Expirado',
  },
];
