export const INITIAL_EVENTS_DATA = [
  {
    id: 'EVT-9001',
    codigoInterno: 'CWB-SERRA-VIP',
    nome: 'Passeio de Trem Morretes VIP 🚂',
    nomePublico: 'Trem da Serra do Mar VIP - Experiência Gastronômica',
    categoria: 'Passeios & Tours',
    subcategoria: 'Ecoturismo & Experiências',
    classificacao: 'Livre',
    organizador: 'Serra Verde Express',
    agenciaResponsavel: 'Batel Pass Turismo',
    gestorEvento: 'Carolina Ferraz (AGT-2001)',
    responsavelFinanceiro: 'Financeiro CWB',
    responsavelComercial: 'Marcos Roberto',
    venue: 'Estação Rodoferroviária de Curitiba',
    endereco: 'Av. Presidente Affonso Camargo, 330',
    cidade: 'Curitiba',
    uf: 'PR',
    cep: '80060-090',
    capacidadeTotal: 300,
    ingressosVendidos: 275,
    ocupacaoPct: 91.6,
    receitaAcumulada: 123750.00,
    status: 'Publicado', // Rascunho, Em configuração, Em revisão, Aprovado, Publicado, Em vendas, Realizado, Encerrado, Pausado, Cancelado, Arquivado, Reprovado
    dataInicio: '2026-08-01',
    dataFim: '2026-08-31',
    horarioAbertura: '08:00',
    horarioEncerramento: '17:00',
    aberturaPortoes: '07:30',
    descricaoCurta: 'Experiência de luxo no trem da Serra do Mar Paranaense.',
    descricaoCompleta: 'Experiência luxuosa pela Serra do Mar Paranaense em vagões temáticos com serviço de bordo open bar e bistro exclusivo de Curitiba a Morretes.',
    imagemUrl: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=800&auto=format&fit=crop',
    moeda: 'BRL',
    taxaServicoPct: 10,
    politicaTaxa: 'absorvida', // absorvida, repassada
    limitePorComprador: 6,

    politicas: {
      cancelamento: 'Cancelamento gratuito até 7 dias após a compra (Art. 49 CDC).',
      reembolso: 'Reembolso integral em até 72h via PIX.',
      meiaEntrada: 'Válido para estudantes, idosos (>60 anos) e professores com comprovante.'
    },

    publicationChecklist: {
      dadosBasicosOk: true,
      localConfiguradoOk: true,
      dataValidaOk: true,
      capacidadeDefinidaOk: true,
      responsaveisVinculadosOk: true,
      politicasPreenchidasOk: true,
      imagemCapaOk: true,
      loteDisponivelOk: true,
      dadosFinanceirosOk: true
    },

    lotes: [
      { id: 'LOT-1', nome: '1º Lote Promo', preco: 390.00, qtdTotal: 100, qtdVendida: 100, status: 'esgotado' },
      { id: 'LOT-2', nome: '2º Lote Regular', preco: 450.00, qtdTotal: 150, qtdVendida: 150, status: 'esgotado' },
      { id: 'LOT-3', nome: 'Lote VIP Últimas Vagas', preco: 520.00, qtdTotal: 50, qtdVendida: 25, status: 'ativo' }
    ]
  },
  {
    id: 'EVT-9002',
    codigoInterno: 'CWB-MADALOSSO-BATEL',
    nome: 'Jantar Dançante Madalosso Batel 🍷',
    nomePublico: 'Noite Italiana & Jantar Dançante Madalosso',
    categoria: 'Gastronomia & Eventos',
    subcategoria: 'Culinária Italiana',
    classificacao: 'Livre',
    organizador: 'Família Madalosso',
    agenciaResponsavel: 'Tour CWB Premium',
    gestorEvento: 'Rodrigo Alves',
    responsavelFinanceiro: 'Financeiro Madalosso',
    responsavelComercial: 'Luciana Mello',
    venue: 'Restaurante Madalosso Batel',
    endereco: 'Av. Batel, 1550',
    cidade: 'Curitiba',
    uf: 'PR',
    cep: '80420-090',
    capacidadeTotal: 500,
    ingressosVendidos: 380,
    ocupacaoPct: 76.0,
    receitaAcumulada: 258400.00,
    status: 'Em vendas',
    dataInicio: '2026-08-15',
    dataFim: '2026-08-15',
    horarioAbertura: '19:30',
    horarioEncerramento: '23:30',
    aberturaPortoes: '19:00',
    descricaoCurta: 'Noite festiva com rodízio completo da culinária italiana.',
    descricaoCompleta: 'Noite festiva com rodízio completo da clássica culinária italiana paranaense, carta de vinhos selecionados e música ao vivo.',
    imagemUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    moeda: 'BRL',
    taxaServicoPct: 10,
    politicaTaxa: 'repassada',
    limitePorComprador: 10,

    politicas: {
      cancelamento: 'Cancelamento permitido até 48h antes do evento.',
      reembolso: 'Reembolso via estorno em cartão ou PIX.',
      meiaEntrada: 'Crianças de 5 a 12 anos pagam meia-entrada.'
    },

    publicationChecklist: {
      dadosBasicosOk: true,
      localConfiguradoOk: true,
      dataValidaOk: true,
      capacidadeDefinidaOk: true,
      responsaveisVinculadosOk: true,
      politicasPreenchidasOk: true,
      imagemCapaOk: true,
      loteDisponivelOk: true,
      dadosFinanceirosOk: true
    },

    lotes: [
      { id: 'LOT-10', nome: 'Ingresso Individual Jantar', preco: 680.00, qtdTotal: 400, qtdVendida: 320, status: 'ativo' },
      { id: 'LOT-11', nome: 'Mesa Familiar 4 Pessoas', preco: 2400.00, qtdTotal: 25, qtdVendida: 15, status: 'ativo' }
    ]
  },
  {
    id: 'EVT-9003',
    codigoInterno: 'CWB-BEER-FESTIVAL',
    nome: 'Festival Cervejeiro Curitiba 🍺',
    nomePublico: 'Curitiba Craft Beer Festival 2026',
    categoria: 'Festivais',
    subcategoria: 'Cervejas Artesanais',
    classificacao: '18 anos',
    organizador: 'Associação Cerveja CWB',
    agenciaResponsavel: 'Curitiba360 Direct',
    gestorEvento: 'Fernando Garcia',
    responsavelFinanceiro: 'Financeiro CWB Beer',
    responsavelComercial: 'Ana Paula Spínola',
    venue: 'Pedreira Paulo Leminski',
    endereco: 'Rua João Gava, 970',
    cidade: 'Curitiba',
    uf: 'PR',
    cep: '82130-010',
    capacidadeTotal: 2000,
    ingressosVendidos: 450,
    ocupacaoPct: 22.5,
    receitaAcumulada: 36000.00,
    status: 'Em revisão',
    dataInicio: '2026-09-10',
    dataFim: '2026-09-12',
    horarioAbertura: '14:00',
    horarioEncerramento: '22:00',
    aberturaPortoes: '13:00',
    descricaoCurta: 'O maior festival de cervejas artesanais do Sul do Brasil.',
    descricaoCompleta: 'O maior festival de cervejas artesanais do Sul do Brasil com mais de 80 cervejarias, gastronômicos e grandes shows de rock nacional.',
    imagemUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop',
    moeda: 'BRL',
    taxaServicoPct: 10,
    politicaTaxa: 'repassada',
    limitePorComprador: 4,

    politicas: {
      cancelamento: 'Cancelamento até 7 dias antes do evento.',
      reembolso: 'Reembolso do valor do ingresso excluindo a taxa de conveniência.',
      meiaEntrada: 'Meia-entrada social com doação de 1kg de alimento não perecível.'
    },

    publicationChecklist: {
      dadosBasicosOk: true,
      localConfiguradoOk: true,
      dataValidaOk: true,
      capacidadeDefinidaOk: true,
      responsaveisVinculadosOk: true,
      politicasPreenchidasOk: false, // Pendência de políticas para revisão
      imagemCapaOk: true,
      loteDisponivelOk: true,
      dadosFinanceirosOk: true
    },

    lotes: [
      { id: 'LOT-20', nome: 'Passaporte 3 Dias', preco: 80.00, qtdTotal: 1000, qtdVendida: 350, status: 'ativo' },
      { id: 'LOT-21', nome: 'Ingresso Avulso 1 Dia', preco: 35.00, qtdTotal: 1000, qtdVendida: 100, status: 'ativo' }
    ]
  }
];
