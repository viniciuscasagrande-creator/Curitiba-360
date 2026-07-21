export const INITIAL_STAFF_DATA = {
  staffMember: {
    id: 'STF-101',
    nome: 'Marcelo Rossi',
    funcao: 'Chefe de Segurança & Operação',
    setor: 'Portão Principal & Embarque',
    turno: 'Manhã / Tarde (06:00 - 15:00)',
    prontidaoStatus: 'Pronto / Em Atividade ✓',
    pendentesSync: 0
  },

  kpis: {
    tarefasCriticas: 2,
    checklistsConcluidos: 4,
    checklistsTotais: 5,
    ocorrenciasAbertas: 1
  },

  tarefas: [
    { id: 'TSK-1', titulo: 'Conferir Alvará e Extintores no Vagão 01', prioridade: 'alta', setor: 'Segurança', status: 'concluido' },
    { id: 'TSK-2', titulo: 'Testar Comunicação via Rádio com a Central', prioridade: 'alta', setor: 'Operação', status: 'concluido' },
    { id: 'TSK-3', titulo: 'Supervisionar Entrada de Público Preferencial (PCD)', prioridade: 'media', setor: 'Embarque', status: 'em_andamento' },
    { id: 'TSK-4', titulo: 'Vistoria Final de Limpeza nos Sanitários VIP', prioridade: 'baixa', setor: 'Higienização', status: 'pendente' }
  ],

  credenciaisCampo: [
    { id: 'CRD-STF-01', titular: 'Marcos Silva', cargo: 'Staff de Apoio', qr: 'CRD-STF-01-QR', status: 'ativo' },
    { id: 'CRD-VND-02', titular: 'Chef Mariana', cargo: 'Catering Batel', qr: 'CRD-VND-02-QR', status: 'ativo' }
  ],

  ocorrencias: [
    { id: 'INC-1', tipo: 'Infraestrutura', descricao: 'Pequeno vazamento de água próximo à catraca 02', gravidade: 'baixa', horario: '08:15', status: 'resolvido' },
    { id: 'INC-2', tipo: 'Segurança', descricao: 'Pessoa sem credencial tentando acesso ao Vagão VIP', gravidade: 'media', horario: '08:40', status: 'em_atendimento' }
  ]
};
