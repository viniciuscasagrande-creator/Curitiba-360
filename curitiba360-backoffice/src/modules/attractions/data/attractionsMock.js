export const ATTRACTION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft'
};

export const attractionStatusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  draft: 'Rascunho'
};

export const OPERATION_TYPES = {
  EVENT: 'event',
  PERMANENT: 'permanent',
  SEASON: 'season',
  RECURRING: 'recurring'
};

export const operationTypeLabels = {
  event: 'Evento Único',
  permanent: 'Permanente',
  season: 'Temporada',
  recurring: 'Sessões Recorrentes'
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

export const attractionsMock = [
  {
    id: 'attraction-001',
    status: 'active',
    partnerId: 'partner-001',
    partnerName: 'Instituto Jaime Lerner',
    mainImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',

    general: {
      name: 'Ópera de Arame',
      operationType: 'permanent',
      venueName: 'Parque das Pedreiras',
      zipCode: '82130-010',
      state: 'PR',
      city: 'Curitiba',
      address: 'Rua João Gava',
      number: '970',
      complement: 'Abranches',
      ageRating: 'free',
      capacity: 1500,
      minorsAllowedWithGuardian: true
    },

    schedule: {
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
      bank: '001',
      agency: '1234-5',
      account: '98765-4',
      beneficiaryName: 'Instituto Jaime Lerner',
      beneficiaryDocument: '72.096.639/0001-23',
      statementEmail: 'financeiro@jaimelerner.org'
    },

    media: {
      homeImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
      horizontalImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop',
      promotionalVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },

    negotiationNotes: 'Contrato padrão de comissão de 10%.',
    release: 'Um dos cartões postais mais bonitos de Curitiba.',
    createdAt: '2026-01-10T10:00:00'
  },
  {
    id: 'attraction-002',
    status: 'active',
    partnerId: 'partner-002',
    partnerName: 'Fundação Cultural de Curitiba',
    mainImage: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=800&auto=format&fit=crop',

    general: {
      name: 'Jardim Botânico de Curitiba',
      operationType: 'permanent',
      venueName: 'Jardim Botânico',
      zipCode: '80210-140',
      state: 'PR',
      city: 'Curitiba',
      address: 'Rua Engenheiro Ostoja Roguski',
      number: 'S/N',
      complement: 'Jardim das Américas',
      ageRating: 'free',
      capacity: 5000,
      minorsAllowedWithGuardian: true
    },

    schedule: {
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
      bank: '104',
      agency: '0001',
      account: '123456-7',
      beneficiaryName: 'Fundação Cultural de Curitiba',
      beneficiaryDocument: '12.345.678/0001-99',
      statementEmail: 'contato@fcc.curitiba.pr.gov.br'
    },

    media: {
      homeImage: '',
      horizontalImage: '',
      backgroundImage: '',
      promotionalVideoUrl: ''
    },

    negotiationNotes: 'Acesso público gratuito à área externa.',
    release: 'Estufa metálica icônica inspirada nos jardins franceses.',
    createdAt: '2026-02-01T09:00:00'
  }
];

export const attractionCategoriesMock = [
  {
    id: 'cat-001',
    attractionId: 'attraction-001',
    name: 'Morador Curitiba Adulto',
    status: 'active',
    price: 15.00,
    quantity: 500,
    batchCode: '001',
    description: 'Desconto mediante comprovante de residência em Curitiba.',
    ticketsIssued: 120
  },
  {
    id: 'cat-002',
    attractionId: 'attraction-001',
    name: 'Doador de sangue',
    status: 'active',
    price: 10.00,
    quantity: 100,
    batchCode: '001',
    description: 'Lei Estadual PR 13.964/2002.',
    ticketsIssued: 25
  },
  {
    id: 'cat-003',
    attractionId: 'attraction-001',
    name: 'Estudante',
    status: 'active',
    price: 10.00,
    quantity: 300,
    batchCode: '001',
    description: 'CIE válida.',
    ticketsIssued: 80
  },
  {
    id: 'cat-004',
    attractionId: 'attraction-001',
    name: 'Idoso',
    status: 'active',
    price: 10.00,
    quantity: 200,
    batchCode: '001',
    description: 'Acima de 60 anos com documento.',
    ticketsIssued: 45
  },
  {
    id: 'cat-005',
    attractionId: 'attraction-001',
    name: 'Adulto',
    status: 'active',
    price: 20.00,
    quantity: 1000,
    batchCode: '001',
    description: 'Ingresso de valor integral.',
    ticketsIssued: 450
  }
];

export const attractionTicketsMock = [
  {
    id: 'ticket-001',
    code: 'C360-OPERA-991',
    status: 'sold',
    attractionId: 'attraction-001',
    attractionName: 'Ópera de Arame',
    categoryName: 'Morador Curitiba Adulto',
    location: 'Ópera de Arame',
    orderDate: '2026-07-21T14:30:00',
    customerName: 'Carlos Eduardo Santos',
    customerCpf: '123.456.789-00',
    customerEmail: 'carlos.santos@email.com',
    price: 15.00,
    qrCode: 'QR-C360-OPERA-991'
  },
  {
    id: 'ticket-002',
    code: 'C360-OPERA-992',
    status: 'validated',
    attractionId: 'attraction-001',
    attractionName: 'Ópera de Arame',
    categoryName: 'Estudante',
    location: 'Ópera de Arame',
    orderDate: '2026-07-20T10:15:00',
    customerName: 'Mariana Oliveira',
    customerCpf: '987.654.321-11',
    customerEmail: 'mariana.oliveira@email.com',
    price: 10.00,
    qrCode: 'QR-C360-OPERA-992'
  },
  {
    id: 'ticket-003',
    code: 'C360-OPERA-993',
    status: 'cancelled',
    attractionId: 'attraction-001',
    attractionName: 'Ópera de Arame',
    categoryName: 'Adulto',
    location: 'Ópera de Arame',
    orderDate: '2026-07-18T16:00:00',
    customerName: 'Lucas Ferraz',
    customerCpf: '456.789.123-22',
    customerEmail: 'lucas.ferraz@email.com',
    price: 20.00,
    qrCode: 'QR-C360-OPERA-993'
  }
];
