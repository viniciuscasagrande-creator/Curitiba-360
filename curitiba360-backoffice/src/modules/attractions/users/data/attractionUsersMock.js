export const USER_ROLES = [
  'Administrador',
  'Editor',
  'Leitor',
  'Agência',
  'Agente',
  'Financeiro',
  'Validador'
];

export const INITIAL_ATTRACTION_USERS = [
  {
    id: 'USR-1001',
    firstName: 'Carlos',
    lastName: 'Eduardo',
    name: 'Carlos Eduardo',
    email: 'carlos.eduardo@curitiba360.com.br',
    document: '123.456.789-00',
    phone: '(41) 99888-1122',
    role: 'Administrador',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    attractionName: 'Parque Jaime Lerner',
    defaultLanguage: 'pt-BR',
    createdAt: '2025-01-15T09:30:00',
    lastLogin: '2026-07-23T14:20:00'
  },
  {
    id: 'USR-1002',
    firstName: 'Mariana',
    lastName: 'Souza',
    name: 'Mariana Souza',
    email: 'mariana.souza@parquejaimelerner.com.br',
    document: '987.654.321-11',
    phone: '(41) 98765-4321',
    role: 'Editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    attractionName: 'Parque Jaime Lerner',
    defaultLanguage: 'pt-BR',
    createdAt: '2025-03-10T11:15:00',
    lastLogin: '2026-07-22T18:45:00'
  },
  {
    id: 'USR-1003',
    firstName: 'Roberto',
    lastName: 'Almeida',
    name: 'Roberto Almeida',
    email: 'roberto.agencia@curitibatours.com.br',
    document: '456.789.123-22',
    phone: '(41) 99111-2233',
    role: 'Agência',
    status: 'active',
    avatar: null,
    attractionName: 'Parque Jaime Lerner',
    defaultLanguage: 'pt-BR',
    createdAt: '2025-05-20T16:00:00',
    lastLogin: '2026-07-20T10:10:00'
  },
  {
    id: 'USR-1004',
    firstName: 'Fernanda',
    lastName: 'Lima',
    name: 'Fernanda Lima',
    email: 'fernanda.financeiro@parquejaimelerner.com.br',
    document: '321.654.987-33',
    phone: '(41) 98444-5566',
    role: 'Financeiro',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    attractionName: 'Parque Jaime Lerner',
    defaultLanguage: 'pt-BR',
    createdAt: '2025-06-01T08:00:00',
    lastLogin: '2026-07-23T11:30:00'
  },
  {
    id: 'USR-1005',
    firstName: 'Lucas',
    lastName: 'Mendes',
    name: 'Lucas Mendes',
    email: 'lucas.validador@parquejaimelerner.com.br',
    document: '654.321.987-44',
    phone: '(41) 99555-6677',
    role: 'Validador',
    status: 'inactive',
    avatar: null,
    attractionName: 'Parque Jaime Lerner',
    defaultLanguage: 'pt-BR',
    createdAt: '2025-08-12T14:50:00',
    lastLogin: '2026-06-15T09:00:00'
  }
];

export default INITIAL_ATTRACTION_USERS;
