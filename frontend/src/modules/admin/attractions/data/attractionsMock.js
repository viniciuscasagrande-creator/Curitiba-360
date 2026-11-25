export const ATTRACTION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DRAFT: 'draft'
};

export const OPERATION_TYPES = {
  PERMANENT: 'permanent',
  SINGLE_EVENT: 'single_event',
  SEASON: 'season',
  RECURRING_SESSIONS: 'recurring_sessions'
};

export const attractionStatusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  pending: 'Pendente',
  draft: 'Rascunho'
};

export const operationTypeLabels = {
  permanent: 'Permanente',
  single_event: 'Evento único',
  season: 'Temporada',
  recurring_sessions: 'Sessões recorrentes'
};

export const TICKET_STATUS = {
  SOLD: 'sold',
  VALIDATED: 'validated',
  CANCELLED: 'cancelled',
  RESERVED: 'reserved',
  PENDING: 'pending',
  EXPIRED: 'expired',
  REFUNDED: 'refunded',
  BLOCKED: 'blocked',
  COURTESY: 'courtesy'
};

export const ticketStatusLabels = {
  sold: 'Vendido',
  validated: 'Validado',
  cancelled: 'Cancelado',
  reserved: 'Reservado',
  pending: 'Pendente',
  expired: 'Expirado',
  refunded: 'Reembolsado',
  blocked: 'Bloqueado',
  courtesy: 'Cortesia'
};

export const ticketStatusStyles = {
  sold: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  validated: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  reserved: 'bg-amber-50 text-amber-700 border-amber-200',
  pending: 'bg-purple-50 text-purple-700 border-purple-200',
  expired: 'bg-slate-100 text-slate-500 border-slate-200',
  refunded: 'bg-orange-50 text-orange-700 border-orange-200',
  blocked: 'bg-red-100 text-red-800 border-red-300',
  courtesy: 'bg-teal-50 text-teal-700 border-teal-200'
};

export const attractionsMock = [
  {
    id: 'attraction-001',
    partnerId: 'partner-001',
    partnerName: 'Instituto Jaime Lerner',
    name: 'Ópera de Arame',
    status: 'active',
    operationType: 'permanent',

    location: {
      venueName: 'Parque das Pedreiras',
      zipCode: '82130-010',
      state: 'PR',
      city: 'Curitiba',
      address: 'Rua João Gava',
      number: '970',
      complement: 'Abranches'
    },

    operation: {
      ageRating: 0,
      capacity: 1500,
      minorsAllowedWithGuardian: true,
      date: '',
      startTime: '10:00',
      doorsOpenTime: '09:30'
    },

    infrastructure: {
      coveredArea: true,
      accessibility: true,
      parking: true
    },

    banking: {
      usePartnerData: true,
      bankCode: '001',
      agency: '1234-5',
      account: '98765-4',
      beneficiaryName: 'Instituto Jaime Lerner',
      beneficiaryDocument: '72.096.639/0001-23',
      statementEmail: 'financeiro@jaimelerner.org'
    },

    media: {
      mainImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
      homeImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
      horizontalImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop',
      promotionalVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },

    negotiationNotes: 'Contrato padrão de concessão de espaço cultural com comissão de 10%.',
    description: 'Um dos pontos turísticos mais emblemáticos de Curitiba, construído em estrutura tubular de aço e teto transparente.',

    createdAt: '2026-01-10T10:00:00',
    updatedAt: '2026-07-20T14:00:00'
  },
  {
    id: 'attraction-002',
    partnerId: 'partner-002',
    partnerName: 'Fundação Cultural de Curitiba',
    name: 'Jardim Botânico de Curitiba',
    status: 'active',
    operationType: 'permanent',

    location: {
      venueName: 'Jardim Botânico',
      zipCode: '80210-140',
      state: 'PR',
      city: 'Curitiba',
      address: 'Rua Engenheiro Ostoja Roguski',
      number: 'S/N',
      complement: 'Jardim das Américas'
    },

    operation: {
      ageRating: 0,
      capacity: 5000,
      minorsAllowedWithGuardian: true,
      date: '',
      startTime: '06:00',
      doorsOpenTime: '06:00'
    },

    infrastructure: {
      coveredArea: false,
      accessibility: true,
      parking: true
    },

    banking: {
      usePartnerData: true,
      bankCode: '104',
      agency: '0001',
      account: '123456-7',
      beneficiaryName: 'Fundação Cultural de Curitiba',
      beneficiaryDocument: '12.345.678/0001-99',
      statementEmail: 'contato@fcc.curitiba.pr.gov.br'
    },

    media: {
      mainImageUrl: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=800&auto=format&fit=crop',
      homeImageUrl: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=800&auto=format&fit=crop',
      horizontalImageUrl: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=1200&auto=format&fit=crop',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=1920&auto=format&fit=crop',
      promotionalVideoUrl: ''
    },

    negotiationNotes: 'Parceria pública institucional com entrada gratuita para área externa.',
    description: 'Famosa estufa de ferro e vidro inspirada no Palácio de Cristal de Londres, cercada por jardins em estilo francês.',

    createdAt: '2026-02-01T09:00:00',
    updatedAt: '2026-07-22T11:00:00'
  },
  {
    id: 'attraction-003',
    partnerId: 'partner-001',
    partnerName: 'Instituto Jaime Lerner',
    name: 'Festival de Inverno da Pedreira 2026',
    status: 'pending',
    operationType: 'single_event',

    location: {
      venueName: 'Pedreira Paulo Leminski',
      zipCode: '82130-010',
      state: 'PR',
      city: 'Curitiba',
      address: 'Rua João Gava',
      number: '970',
      complement: 'Pista Principal'
    },

    operation: {
      ageRating: 16,
      capacity: 25000,
      minorsAllowedWithGuardian: true,
      date: '2026-08-15',
      startTime: '18:00',
      doorsOpenTime: '15:00'
    },

    infrastructure: {
      coveredArea: false,
      accessibility: true,
      parking: true
    },

    banking: {
      usePartnerData: false,
      bankCode: '341',
      agency: '4321',
      account: '54321-0',
      beneficiaryName: 'Eventos Pedreira LTDA',
      beneficiaryDocument: '99.888.777/0001-11',
      statementEmail: 'financeiro@pedreiraeventos.com'
    },

    media: {
      mainImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      homeImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      horizontalImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1920&auto=format&fit=crop',
      promotionalVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },

    negotiationNotes: 'Evento especial com lote promocional e repasse antecipado de 50%.',
    description: 'Grande festival de música ao ar livre com atrações nacionais e praça gastronômica curitibana.',

    createdAt: '2026-06-01T15:00:00',
    updatedAt: '2026-07-23T10:00:00'
  }
];

export const attractionCategoriesMock = [
  {
    id: 'cat-001',
    attractionId: 'attraction-001',
    name: 'Morador Curitiba Adulto',
    description: 'Desconto exclusivo para residentes de Curitiba mediante comprovante.',
    type: 'discount',
    price: 15.00,
    halfPrice: false,
    requiredDocs: 'Comprovante de residência no nome do titular e documento oficial com foto.',
    ageGroup: 'Livre',
    cpfLimit: 2,
    quantity: 500,
    status: 'active',
    customMessage: 'Apresentar comprovante na entrada.',
    orderExpirationHours: 48,
    batchCode: '001'
  },
  {
    id: 'cat-002',
    attractionId: 'attraction-001',
    name: 'Estudante',
    description: 'Meia-entrada conforme Lei Federal 12.933/2013.',
    type: 'half',
    price: 10.00,
    halfPrice: true,
    requiredDocs: 'Carteira de Identificação Estudantil (CIE) válida.',
    ageGroup: 'Livre',
    cpfLimit: 1,
    quantity: 300,
    status: 'active',
    customMessage: 'CIE física ou digital válida.',
    orderExpirationHours: 48,
    batchCode: '001'
  },
  {
    id: 'cat-003',
    attractionId: 'attraction-001',
    name: 'Adulto (Inteira)',
    description: 'Ingresso de valor integral sem desconto.',
    type: 'standard',
    price: 20.00,
    halfPrice: false,
    requiredDocs: 'Documento oficial com foto.',
    ageGroup: 'Livre',
    cpfLimit: 4,
    quantity: 1000,
    status: 'active',
    customMessage: 'Bom divertimento!',
    orderExpirationHours: 48,
    batchCode: '001'
  },
  {
    id: 'cat-004',
    attractionId: 'attraction-001',
    name: 'Doador de Sangue',
    description: 'Desconto garantido pela Lei Estadual PR 13.964/2002.',
    type: 'discount',
    price: 10.00,
    halfPrice: true,
    requiredDocs: 'Carteira de doador emitida pelo Hemepar nos últimos 6 meses.',
    ageGroup: 'Livre',
    cpfLimit: 1,
    quantity: 100,
    status: 'active',
    customMessage: 'Obrigado por doar sangue!',
    orderExpirationHours: 48,
    batchCode: '001'
  }
];

export const attractionTicketsMock = [
  {
    id: 'ticket-001',
    code: 'C360-OPERA-8841',
    status: 'sold',
    attractionId: 'attraction-001',
    attractionName: 'Ópera de Arame',
    categoryName: 'Morador Curitiba Adulto',
    location: 'Ópera de Arame - Palco Principal',
    orderDate: '2026-07-21T14:30:00',
    customerName: 'Carlos Eduardo Santos',
    customerCpf: '123.456.789-00',
    customerEmail: 'carlos.santos@email.com',
    price: 15.00,
    qrCode: 'QR-C360-OPERA-8841'
  },
  {
    id: 'ticket-002',
    code: 'C360-OPERA-8842',
    status: 'validated',
    attractionId: 'attraction-001',
    attractionName: 'Ópera de Arame',
    categoryName: 'Estudante',
    location: 'Ópera de Arame - Palco Principal',
    orderDate: '2026-07-20T10:15:00',
    customerName: 'Mariana Oliveira',
    customerCpf: '987.654.321-11',
    customerEmail: 'mariana.oliveira@email.com',
    price: 10.00,
    qrCode: 'QR-C360-OPERA-8842'
  },
  {
    id: 'ticket-003',
    code: 'C360-OPERA-8843',
    status: 'cancelled',
    attractionId: 'attraction-001',
    attractionName: 'Ópera de Arame',
    categoryName: 'Adulto (Inteira)',
    location: 'Ópera de Arame - Palco Principal',
    orderDate: '2026-07-18T16:00:00',
    customerName: 'Lucas Ferraz',
    customerCpf: '456.789.123-22',
    customerEmail: 'lucas.ferraz@email.com',
    price: 20.00,
    qrCode: 'QR-C360-OPERA-8843'
  },
  {
    id: 'ticket-004',
    code: 'C360-OPERA-8844',
    status: 'reserved',
    attractionId: 'attraction-001',
    attractionName: 'Ópera de Arame',
    categoryName: 'Adulto (Inteira)',
    location: 'Ópera de Arame - Palco Principal',
    orderDate: '2026-07-23T11:00:00',
    customerName: 'Fernanda Lima',
    customerCpf: '321.654.987-33',
    customerEmail: 'fernanda.lima@email.com',
    price: 20.00,
    qrCode: 'QR-C360-OPERA-8844'
  }
];
