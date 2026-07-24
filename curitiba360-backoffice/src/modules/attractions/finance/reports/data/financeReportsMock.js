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
    id: 1,
    date: "2026-01-01T10:20:00",
    category: "Adulto",
    seller: "João da Silva",
    agency: "Site Curitiba 360",
    customer: "Carlos Eduardo",
    reason: "Patrocínio",
    quantity: 2,
    value: 17.50,
    total: 35.00
  },
  {
    id: 2,
    date: "2026-01-01T11:15:00",
    category: "Estudante",
    seller: "Pedro da Silva",
    agency: "Site Curitiba 360",
    customer: "Maria Fernanda",
    reason: "Ação Social",
    quantity: 4,
    value: 17.50,
    total: 70.00
  },
  {
    id: 3,
    date: "2026-01-01T12:45:00",
    category: "Doador",
    seller: "João da Silva",
    agency: "Site Curitiba 360",
    customer: "Empresa XPTO",
    reason: "Parceiro",
    quantity: 10,
    value: 17.50,
    total: 175.00
  },
  {
    id: 4,
    date: "2026-01-01T14:30:00",
    category: "Morador Curitiba Adulto",
    seller: "Site Curitiba 360",
    agency: "Portal",
    customer: "José Pereira",
    reason: "Cortesia Comercial",
    quantity: 1,
    value: 17.50,
    total: 17.50
  }
];
