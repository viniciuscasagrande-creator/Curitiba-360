export const INITIAL_EVENT_OPERATION_DATA = {
  eventId: 'EVT-9001',
  nomeEvento: 'Passeio de Trem Morretes VIP 🚂',
  statusOperacao: 'Em Execução / Normal',
  publicoPresente: 245,
  publicoEsperado: 300,
  staffAtivoCount: 32,
  cronogramaProgressoPct: 85,
  vistoriaBombeirosStatus: 'Aprovado ✓',

  equipeStaff: [
    { id: 'STF-1', nome: 'Carolina Ferraz', funcao: 'Produtora Executiva', setor: 'Direção', telefone: '(41) 99988-1122', status: 'presente' },
    { id: 'STF-2', nome: 'Marcelo Rossi', funcao: 'Chefe de Segurança', setor: 'Segurança', telefone: '(41) 98877-2233', status: 'presente' },
    { id: 'STF-3', nome: 'Juliana Paes', funcao: 'Supervisora de Bordo', setor: 'Atendimento', telefone: '(41) 97766-3344', status: 'presente' },
    { id: 'STF-4', nome: 'Roberto Carlos', funcao: 'Técnico de Som & Guia', setor: 'Produção', telefone: '(41) 96655-4455', status: 'ausente' }
  ],

  fornecedores: [
    { id: 'VND-1', empresa: 'Serra Verde Locações', servico: 'Vagões & Tração Ferroviária', contato: 'Carlos Spínola', valor: 45000.00, status: 'pago' },
    { id: 'VND-2', empresa: 'Catering Batel Bistro', servico: 'Alimentação & Bebidas VIP', contato: 'Chef Mariana', valor: 28000.00, status: 'pago' },
    { id: 'VND-3', empresa: 'Grupo Paranaense de Som', servico: 'Sonorização & Acústica', contato: 'Eduardo Lima', valor: 8500.00, status: 'pendente' }
  ],

  credenciamentoBadges: [
    { id: 'CRD-101', titular: 'Carolina Ferraz', tipo: 'Staff / Produção', nivelAcesso: 'Acesso Livre (All Areas)', qrCode: 'CRD-ALL-101', status: 'emitido' },
    { id: 'CRD-102', titular: 'Gabriel Spínola', tipo: 'Imprensa / Mídia', nivelAcesso: 'Área VIP & Palco', qrCode: 'CRD-PRESS-102', status: 'emitido' },
    { id: 'CRD-103', titular: 'Equipe Catering Batel', tipo: 'Fornecedor', nivelAcesso: 'Cozinha & Bordo', qrCode: 'CRD-VND-103', status: 'emitido' }
  ],

  cronogramaTimeline: [
    { id: 'TM-1', horario: '06:00', tarefa: 'Chegada das equipes de montagem e geradores', responsavel: 'Serra Verde Locações', status: 'concluido' },
    { id: 'TM-2', horario: '07:00', tarefa: 'Passagem de som e abastecimento do catering', responsavel: 'Catering Batel Bistro', status: 'concluido' },
    { id: 'TM-3', horario: '07:30', tarefa: 'Abertura dos portões e início do credenciamento', responsavel: 'Juliana Paes', status: 'concluido' },
    { id: 'TM-4', horario: '08:00', tarefa: 'Partida do Trem VIP sentido Serra do Mar', responsavel: 'Carolina Ferraz', status: 'em_andamento' },
    { id: 'TM-5', horario: '17:00', tarefa: 'Chegada de retorno à Estação e encerramento', responsavel: 'Equipe Geral', status: 'pendente' }
  ],

  checklistVistoria: [
    { id: 'CHK-1', item: 'Alvará da Prefeitura e Licença de Funcionamento', ok: true },
    { id: 'CHK-2', item: 'Laudo de Vistoria do Corpo de Bombeiros', ok: true },
    { id: 'CHK-3', item: 'Ambulância UTI Móvel no local', ok: true },
    { id: 'CHK-4', item: 'Testes de Geradores de Energia Reserva', ok: true },
    { id: 'CHK-5', item: 'Limpeza e Higienização dos Vagões', ok: true }
  ]
};
