export const INITIAL_SECURITY_DATA = {
  profile: {
    nome: 'Carlos Eduardo Spínola',
    email: 'carlos.spinola@curitiba360.com.br',
    cargo: 'Produtor Executivo & Gestor de Operações',
    empresa: 'Curitiba 360 Turismo & Eventos S.A.',
    cpf: '***.452.889-**',
    biometriaFaceId: true,
    pinLocalAtivo: true,
    twoFactorAuth: true
  },

  dispositivosAutorizados: [
    { id: 'DEV-01', modelo: 'iPhone 15 Pro Max', os: 'iOS 17.4', ip: '189.22.10.4', status: 'este_dispositivo', ultimoAcesso: 'Agora mesmo' },
    { id: 'DEV-02', modelo: 'iPad Pro 12.9"', os: 'iPadOS 17.2', ip: '189.22.10.8', status: 'ativo', ultimoAcesso: 'Ontem às 18:30' },
    { id: 'DEV-03', modelo: 'Samsung Galaxy Tab S9', os: 'Android 14', ip: '201.88.42.12', status: 'ativo', ultimoAcesso: 'Há 3 dias' }
  ],

  permissoes: [
    { recurso: 'Dashboard Executivo', permitido: true },
    { recurso: 'Validar Ingressos Check-in', permitido: true },
    { recurso: 'Aprovar Extornos & Reembolsos', permitido: true },
    { recurso: 'Alterar Lotes & Preços', permitido: false },
    { recurso: 'Revogar Dispositivos do Staff', permitido: true }
  ],

  auditoriaLogs: [
    { id: 'AUD-1', evento: 'Autenticação Biométrica (Face ID)', dispositivo: 'iPhone 15 Pro Max', horario: 'Hoje às 14:00', resultado: 'SUCESSO' },
    { id: 'AUD-2', evento: 'Sincronização SQLite em Lote', dispositivo: 'iPhone 15 Pro Max', horario: 'Hoje às 13:45', resultado: 'SUCESSO' },
    { id: 'AUD-3', evento: 'Tentativa de Login em Novo Dispositivo', dispositivo: 'Galaxy S23', horario: 'Ontem às 22:10', resultado: 'BLOQUEADO (2FA)' }
  ]
};
