export const INITIAL_SEATING_DATA = {
  eventId: 'EVT-9001',
  nomeEvento: 'Passeio de Trem Morretes VIP 🚂',
  capacidadeTotal: 300,
  vendidosTotal: 275,
  reservadosTotal: 10,
  bloqueadosTotal: 5,
  disponiveisTotal: 10,
  receitaPrevista: 135000.00,

  setores: [
    {
      id: 'SEC-VIP',
      nome: 'Vagão Barão do Serro Azul (VIP)',
      categoria: 'VIP',
      cor: '#9333ea', // purple
      capacidade: 50,
      precoPadrao: 520.00,
      regras: 'Open bar premium e brunch incluso.'
    },
    {
      id: 'SEC-REGULAR',
      nome: 'Vagão Lapa (Classe Turística)',
      categoria: 'Regular',
      cor: '#2563eb', // blue
      capacidade: 230,
      precoPadrao: 450.00,
      regras: 'Serviço de bordo tradicional.'
    },
    {
      id: 'SEC-PCD',
      nome: 'Área Reservada PCD',
      categoria: 'PCD',
      cor: '#059669', // emerald
      capacidade: 20,
      precoPadrao: 260.00,
      regras: 'Espaço adaptado com acompanhante.'
    }
  ],

  assentos: Array.from({ length: 30 }).map((_, i) => ({
    id: `ST-${i + 1}`,
    fila: String.fromCharCode(65 + Math.floor(i / 10)),
    numero: (i % 10) + 1,
    setorId: i < 10 ? 'SEC-VIP' : i < 25 ? 'SEC-REGULAR' : 'SEC-PCD',
    preco: i < 10 ? 520.00 : i < 25 ? 450.00 : 260.00,
    status: i < 20 ? 'vendido' : i < 25 ? 'reservado' : i < 28 ? 'disponivel' : 'bloqueado'
  })),

  iaSuggestions: [
    {
      id: 'SUG-1',
      tipo: 'capacidade',
      titulo: '💡 Otimização de Layout: +24 assentos adicionais',
      descricao: 'Existe espaço útil na área VIP para inclusão de 2 mesas bistrô sem comprometer a circulação.'
    },
    {
      id: 'SUG-2',
      tipo: 'pcd',
      titulo: '♿ Conformidade PCD: Atendida (6.6% do total)',
      descricao: 'Capacidade de 20 lugares adaptados excede a exigência legal mínima de 2%.'
    }
  ],

  publicationChecklist: {
    setoresValidos: true,
    assentosValidos: true,
    capacidadeValida: true,
    numeracaoValida: true,
    precosDefinidos: true,
    lotesVinculados: true,
    semConflitos: true
  }
};
