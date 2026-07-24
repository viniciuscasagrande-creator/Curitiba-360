import { AGENCY_STATUS } from '../../shared/constants/partnerStatus';

export const agenciesMock = [
  {
    id: '001',

    tradeName: 'Turismo Curitiba Ltda.',
    corporateName:
      'Turismo Curitiba Serviços Ltda.',
    cnpj: '12.345.678/0001-90',

    email: 'ana.lima@turismocwb.com',
    responsibleName: 'Ana Lima',
    responsibleCpf: '123.456.789-00',
    responsiblePhone: '(41) 99999-8888',

    companyType: 'Empresa de Pequeno Porte',
    stateRegistration: 'Isento',

    zipCode: '80010-010',
    street: 'Rua XV de Novembro',
    number: '123',
    complement: 'Sala 402',
    district: 'Centro',
    city: 'Curitiba',
    state: 'PR',
    country: 'Brasil',

    site: 'https://turismocwb.com.br',
    commercialPhone: '(41) 3333-4444',

    agentsCount: 8,
    attractions: [
      {
        id: 'attraction-001',
        name: 'Ópera de Arame',
      },
      {
        id: 'attraction-002',
        name: 'Parque Jaime Lerner',
      },
    ],

    status: AGENCY_STATUS.ACTIVE,
    statusReason: '',
    createdAt: '2025-01-10T14:32:00',
    updatedAt: '2025-01-10T14:32:00',

    bankAccount: {
      bankCode: '001',
      bankName: 'Banco do Brasil',
      accountType: 'Corrente',
      agency: '1234-5',
      account: '12345-6',
      pixKey: '12.345.678/0001-90',
      pixKeyType: 'CNPJ',
      holder: 'Turismo Curitiba Ltda.',
      holderDocument: '12.345.678/0001-90',
    },

    managers: [
      {
        id: 'manager-001',
        name: 'Marina Costa Ribeiro',
        email:
          'marina.costa@turismocwb.com',
        phone: '(41) 98888-7777',
      },
    ],

    documents: [
      {
        id: 'document-001',
        type: 'CNPJ',
        name: 'cartao-cnpj.pdf',
        url: '',
      },
      {
        id: 'document-002',
        type: 'Contrato Social',
        name: 'contrato-social.pdf',
        url: '',
      },
    ],
  },

  {
    id: '002',

    tradeName: 'Paraná Travel',
    corporateName:
      'Paraná Travel Turismo Ltda.',
    cnpj: '98.765.432/0001-11',

    email: 'carlos.melo@prtravel.com',
    responsibleName: 'Carlos Melo',
    responsibleCpf: '987.654.321-00',
    responsiblePhone: '(43) 99999-1111',

    companyType: 'Sociedade Limitada',
    stateRegistration: '123456789',

    zipCode: '86010-120',
    street: 'Avenida Paraná',
    number: '900',
    complement: '',
    district: 'Centro',
    city: 'Londrina',
    state: 'PR',
    country: 'Brasil',

    site: 'https://prtravel.com',
    commercialPhone: '(43) 3333-9000',

    agentsCount: 3,
    attractions: [],

    status: AGENCY_STATUS.ACTIVE,
    statusReason: '',
    createdAt: '2025-02-15T09:45:00',
    updatedAt: '2025-02-15T09:45:00',

    bankAccount: {
      bankCode: '341',
      bankName: 'Itaú',
      accountType: 'Corrente',
      agency: '4455',
      account: '99887-0',
      pixKey: 'financeiro@prtravel.com',
      pixKeyType: 'E-mail',
      holder: 'Paraná Travel Turismo Ltda.',
      holderDocument: '98.765.432/0001-11',
    },

    managers: [],
    documents: [],
  },

  {
    id: '003',

    tradeName: 'Sul Receptivo',
    corporateName:
      'Sul Receptivo Turismo Ltda.',
    cnpj: '45.678.901/0001-22',

    email: 'fernanda@sulreceptivo.com',
    responsibleName: 'Fernanda Souza',
    responsibleCpf: '456.789.012-00',
    responsiblePhone: '(41) 98888-2222',

    companyType: 'Sociedade Limitada',
    stateRegistration: 'Isento',

    zipCode: '80230-010',
    street: 'Rua Brigadeiro Franco',
    number: '450',
    complement: '',
    district: 'Rebouças',
    city: 'Curitiba',
    state: 'PR',
    country: 'Brasil',

    site: '',
    commercialPhone: '(41) 3222-5544',

    agentsCount: 0,
    attractions: [],

    status:
      AGENCY_STATUS.PENDING_APPROVAL,
    statusReason: '',
    createdAt: '2025-03-20T11:20:00',
    updatedAt: '2025-03-20T11:20:00',

    bankAccount: {
      bankCode: '',
      bankName: '',
      accountType: '',
      agency: '',
      account: '',
      pixKey: '',
      pixKeyType: '',
      holder: '',
      holderDocument: '',
    },

    managers: [],
    documents: [],
  },

  {
    id: '004',

    tradeName: 'Iguaçu Tours',
    corporateName: 'Iguaçu Tours Ltda.',
    cnpj: '33.221.100/0001-44',

    email: 'ricardo@iguacutours.com',
    responsibleName: 'Ricardo Alves',
    responsibleCpf: '321.654.987-00',
    responsiblePhone: '(45) 99999-5544',

    companyType: 'Sociedade Limitada',
    stateRegistration: '902334455',

    zipCode: '85851-020',
    street: 'Avenida Brasil',
    number: '320',
    complement: '',
    district: 'Centro',
    city: 'Foz do Iguaçu',
    state: 'PR',
    country: 'Brasil',

    site: 'https://iguacutours.com',
    commercialPhone: '(45) 3522-8877',

    agentsCount: 5,
    attractions: [],

    status:
      AGENCY_STATUS.WAITING_CONTRACT,
    statusReason: '',
    createdAt: '2025-04-05T16:10:00',
    updatedAt: '2025-04-05T16:10:00',

    bankAccount: {},
    managers: [],
    documents: [],
  },

  {
    id: '005',

    tradeName: 'Visitare Viagens',
    corporateName: 'Visitare Viagens Ltda.',
    cnpj: '77.889.900/0001-55',

    email: 'juliana@visitare.com',
    responsibleName: 'Juliana Martins',
    responsibleCpf: '789.012.345-00',
    responsiblePhone: '(44) 98888-6655',

    companyType: 'Sociedade Limitada',
    stateRegistration: 'Isento',

    zipCode: '87010-000',
    street: 'Avenida Brasil',
    number: '1200',
    complement: 'Conjunto 12',
    district: 'Zona 01',
    city: 'Maringá',
    state: 'PR',
    country: 'Brasil',

    site: 'https://visitare.com',
    commercialPhone: '(44) 3222-1100',

    agentsCount: 0,
    attractions: [],

    status: AGENCY_STATUS.INACTIVE,
    statusReason:
      'Cadastro inativado pelo administrador.',
    createdAt: '2025-04-12T08:30:00',
    updatedAt: '2025-05-01T10:20:00',

    bankAccount: {},
    managers: [],
    documents: [],
  },
];
