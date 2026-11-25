export const INITIAL_SMARTCITY_DATA = {
  espacosPublicos: [
    { id: 'ESP-01', nome: 'Pedreira Paulo Leminski', capacidade: 25000, regiao: 'Abranches', status: 'Ocupado (Montagem)' },
    { id: 'ESP-02', nome: 'Ópera de Arame', capacidade: 1500, regiao: 'Abranches', status: 'Disponível' },
    { id: 'ESP-03', nome: 'Parque Barigui - Pavilhão de Exposições', capacidade: 8000, regiao: 'Santo Inácio', status: 'Reservado' }
  ],

  licencasDigitais: [
    { id: 'LIC-901', evento: 'Festival Gastronômico da Capoeira', solicitante: 'Associação Cultural PR', tipo: 'Alvará Temporário de Som e Espaço', status: 'Aprovado' },
    { id: 'LIC-902', evento: 'Maratona Internacional de Curitiba', solicitante: 'Federação Paranaense de Atletismo', tipo: 'Interdição de Vias Públicas', status: 'Em Análise Técnica' }
  ],

  impactoEconomico: {
    receitaMovimentadaAno: 142000000.00,
    empregosDiretosGerados: 14500,
    impostosArrecadados: 18900000.00,
    ocupacaoRedeHoteleira: '86%'
  }
};
