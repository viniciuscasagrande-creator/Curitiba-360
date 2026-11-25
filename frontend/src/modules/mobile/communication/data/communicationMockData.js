export const INITIAL_COMMUNICATION_DATA = {
  activeChannel: 'chan-seguranca',

  canais: [
    { id: 'chan-geral', nome: '#geral-operacao', descricao: 'Comunicação geral de toda a equipe', unreadCount: 0 },
    { id: 'chan-seguranca', nome: '#seguranca-embarque', descricao: 'Equipe de Segurança & Portaria', unreadCount: 2 },
    { id: 'chan-bordo', nome: '#servico-bordo-vip', descricao: 'Atendimento & Catering Vagão Barão', unreadCount: 0 }
  ],

  mensagens: [
    { id: 'MSG-1', autor: 'Carolina Ferraz (Produtora)', cargo: 'Produção', texto: 'Portões A e B abertos! Início do credenciamento e embarque.', horario: '07:30', prioritaria: false },
    { id: 'MSG-2', autor: 'Marcelo Rossi (Segurança)', cargo: 'Segurança', texto: 'Fluxo na Catraca 01 estabilizado. 85 check-ins efetuados.', horario: '07:45', prioritaria: false },
    { id: 'MSG-3', autor: 'Central de Comando', cargo: 'Comando', texto: '⚠️ ATENÇÃO: Trem VIP parte em 15 minutos! Finalizar embarque do Vagão Barão.', horario: '07:55', prioritaria: true }
  ],

  alertasUrgentes: [
    { id: 'ALT-1', titulo: '⚠️ Alerta de Embarque Próximo', severidade: 'media', mensagem: 'Faltam 5 passageiros VIP no Vagão Barão. Chamar no alto-falante da Estação.', horario: '07:52', lido: false },
    { id: 'ALT-2', titulo: '🛡️ Teste de Rádio Efetuado', severidade: 'baixa', mensagem: 'Comunicação VHF canal 04 operando 100%.', horario: '07:15', lido: true }
  ],

  pushSettings: {
    somAtivo: true,
    vibracaoAtiva: true,
    alertasCriticos: true,
    silenciarNoTurno: false
  }
};
