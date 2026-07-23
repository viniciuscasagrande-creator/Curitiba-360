export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked'
};

export const USER_ROLES = {
  ADMINISTRATOR: 'administrator',
  MANAGER: 'manager',
  FINANCIAL: 'financial',
  PARTNER: 'partner',
  SUPERVISOR: 'supervisor',
  OPERATOR: 'operator',
  SUPPORT: 'support',
  CHECK_IN: 'check-in'
};

export const roleLabels = {
  administrator: 'Administrador',
  manager: 'Gestor',
  financial: 'Financeiro',
  partner: 'Parceiro',
  supervisor: 'Supervisor',
  operator: 'Operador',
  support: 'Atendimento',
  'check-in': 'Check-in'
};

export const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  pending: 'Convite pendente',
  blocked: 'Bloqueado'
};

export const usersMock = [
  {
    id: '2798',
    firstName: 'Darlene',
    lastName: 'Robertson',
    email: 'darlene.robertson@gmail.com',
    phone: '(41) 99999-1101',
    document: '111.222.333-44',
    role: 'administrator',
    company: 'Curitiba 360',
    status: 'active',
    createdAt: '2026-07-02T16:44:22',
    lastLoginAt: '2026-07-22T09:24:12',
    twoFactorEnabled: true
  },
  {
    id: '2799',
    firstName: 'João',
    lastName: 'da Silva',
    email: 'joao.silva@curitiba360.com',
    phone: '(41) 99999-1102',
    document: '222.333.444-55',
    role: 'manager',
    company: 'Curitiba 360',
    status: 'active',
    createdAt: '2026-07-03T10:20:00',
    lastLoginAt: '2026-07-22T08:42:14',
    twoFactorEnabled: true
  },
  {
    id: '2800',
    firstName: 'Mariana',
    lastName: 'Costa',
    email: 'mariana@parquejaimelerner.com.br',
    phone: '(41) 99999-1103',
    document: '333.444.555-66',
    role: 'partner',
    company: 'Parque Jaime Lerner',
    status: 'active',
    createdAt: '2026-07-04T11:30:00',
    lastLoginAt: '2026-07-21T17:36:51',
    twoFactorEnabled: false
  },
  {
    id: '2801',
    firstName: 'Carlos',
    lastName: 'Oliveira',
    email: 'carlos.financeiro@curitiba360.com',
    phone: '(41) 99999-1104',
    document: '444.555.666-77',
    role: 'financial',
    company: 'Curitiba 360',
    status: 'inactive',
    createdAt: '2026-07-05T14:00:00',
    lastLoginAt: '2026-07-10T13:15:19',
    twoFactorEnabled: true
  },
  {
    id: '2802',
    firstName: 'Patrícia',
    lastName: 'Almeida',
    email: 'patricia.operacao@curitiba360.com',
    phone: '(41) 99999-1105',
    document: '555.666.777-88',
    role: 'operator',
    company: 'Parque Jaime Lerner',
    status: 'pending',
    createdAt: '2026-07-06T09:10:00',
    lastLoginAt: null,
    twoFactorEnabled: false
  },
  {
    id: '2803',
    firstName: 'Ricardo',
    lastName: 'Souza',
    email: 'ricardo.checkin@curitiba360.com',
    phone: '(41) 99999-1106',
    document: '666.777.888-99',
    role: 'check-in',
    company: 'Parque Jaime Lerner',
    status: 'blocked',
    createdAt: '2026-07-08T16:40:00',
    lastLoginAt: '2026-07-15T18:08:10',
    twoFactorEnabled: false
  }
];

export default usersMock;
