export const INITIAL_MONITORING_DATA = {
  lastUpdatedTime: '14:02:15',

  kpis: {
    receitaTempoReal: 136125.00,
    ingressosVendidos: 275,
    capacidadeTotal: 300,
    checkinsEfetuados: 245,
    publicoPresente: 245,
    ocupacaoGeralPct: 81.6,
    tempoMedioEsperaMin: 3.5
  },

  setoresOcupacao: [
    { id: 'SET-1', nome: 'Vagão Barão do Serro Azul (VIP)', vendidos: 50, capacidade: 50, ocupacaoPct: 100, status: 'Esgotado' },
    { id: 'SET-2', nome: 'Vagão Lapa (Classe Turística)', vendidos: 175, capacidade: 200, ocupacaoPct: 87.5, status: 'Quase Cheio' },
    { id: 'SET-3', nome: 'Vagão Camarote Morretes', vendidos: 50, capacidade: 50, ocupacaoPct: 100, status: 'Esgotado' }
  ],

  filasEntrada: [
    { id: 'GATE-01', nome: 'Portão 01 - Acesso Principal', pessoasNaFila: 12, tempoEsperaMin: 2.5, status: 'Fluido' },
    { id: 'GATE-02', nome: 'Portão 02 - Acesso Preferencial', pessoasNaFila: 4, tempoEsperaMin: 1.0, status: 'Rápido' },
    { id: 'GATE-03', nome: 'Catraca VIP / Camarotes', pessoasNaFila: 2, tempoEsperaMin: 0.5, status: 'Livre' }
  ],

  ocorrenciasAoVivo: [
    { id: 'LIVE-1', titulo: 'Manutenção Preventiva Catraca 03', setor: 'Entrada Principal', horario: '13:50', severidade: 'baixa', resolvido: true },
    { id: 'LIVE-2', titulo: 'Reforço de Segurança Solicitado no Vagão 02', setor: 'Embarque', horario: '14:00', severidade: 'media', resolvido: false }
  ]
};
