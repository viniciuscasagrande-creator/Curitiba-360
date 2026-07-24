import { AGENT_STATUS } from '../../shared/constants/partnerStatus';

export const agentsMock = [
  {
    id: '001',
    name: 'João Pereira dos Santos',
    cpf: '123.456.789-00',
    maskedCpf: '123.456.789-**',

    email: 'joao.santos@turismocwb.com',
    phone: '(41) 99999-8888',
    birthDate: '1985-05-01',

    agencyId: '001',
    agencyName: 'Turismo Curitiba Ltda.',

    attractionsCount: 12,
    attractionIds: [
      'attraction-001',
      'attraction-002',
    ],

    language: 'Português',

    status: AGENT_STATUS.ACTIVE,
    statusReason: '',

    createdAt: '2025-01-10T14:32:00',
    updatedAt: '2025-01-10T14:32:00',
  },

  {
    id: '002',
    name: 'Maria Oliveira Costa',
    cpf: '987.654.321-00',
    maskedCpf: '987.654.321-**',

    email: 'maria.costa@prtravel.com',
    phone: '(43) 99999-9999',
    birthDate: '1990-08-20',

    agencyId: '002',
    agencyName: 'Paraná Travel',

    attractionsCount: 8,
    attractionIds: [],

    language: 'Português',

    status: AGENT_STATUS.ACTIVE,
    statusReason: '',

    createdAt: '2025-02-15T09:45:00',
    updatedAt: '2025-02-15T09:45:00',
  },

  {
    id: '003',
    name: 'Carlos Eduardo Lima',
    cpf: '456.789.012-00',
    maskedCpf: '456.789.012-**',

    email: 'carlos.lima@sulreceptivo.com',
    phone: '(41) 98888-2233',
    birthDate: '1988-02-14',

    agencyId: '003',
    agencyName: 'Sul Receptivo',

    attractionsCount: 5,
    attractionIds: [],

    language: 'Português',

    status: AGENT_STATUS.PENDING,
    statusReason: '',

    createdAt: '2025-03-20T11:20:00',
    updatedAt: '2025-03-20T11:20:00',
  },

  {
    id: '004',
    name: 'Fernanda Souza Rocha',
    cpf: '321.654.987-00',
    maskedCpf: '321.654.987-**',

    email: 'fernanda.rocha@iguacu.com',
    phone: '(45) 99999-4455',
    birthDate: '1991-11-12',

    agencyId: '004',
    agencyName: 'Iguaçu Tours',

    attractionsCount: 3,
    attractionIds: [],

    language: 'Português',

    status: AGENT_STATUS.ACTIVE,
    statusReason: '',

    createdAt: '2025-04-05T16:10:00',
    updatedAt: '2025-04-05T16:10:00',
  },

  {
    id: '005',
    name: 'Rafael Almeida Nunes',
    cpf: '789.012.345-00',
    maskedCpf: '789.012.345-**',

    email: 'rafael.nunes@visitare.com',
    phone: '(44) 98888-7788',
    birthDate: '1986-06-10',

    agencyId: '005',
    agencyName: 'Visitare Viagens',

    attractionsCount: 7,
    attractionIds: [],

    language: 'Português',

    status: AGENT_STATUS.INACTIVE,
    statusReason:
      'Agente inativado pela agência.',

    createdAt: '2025-04-12T08:30:00',
    updatedAt: '2025-05-02T15:00:00',
  },
];
