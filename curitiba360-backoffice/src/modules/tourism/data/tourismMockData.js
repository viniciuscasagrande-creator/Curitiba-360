export const INITIAL_TOURISM_DATA = {
  experiences: [
    { id: 'EXP-01', nome: 'Trem do Pôr do Sol Especial', duracao: '4h', local: 'Curitiba a Morretes', preco: 290.00, disponibilidade: 'Diário' },
    { id: 'EXP-02', nome: 'City Tour Linha Turismo Curitiba', duracao: '2.5h', local: '26 Pontos de Parada', preco: 50.00, disponibilidade: 'Terça a Domingo' },
    { id: 'EXP-03', nome: 'Jantar Italiano Clássico Madalosso', duracao: '3h', local: 'Santa Felicidade', preco: 120.00, disponibilidade: 'Diário' }
  ],

  roteiroInteligente: [
    { dia: 'Sexta-feira', atividades: ['Check-in Hotel Mabu', 'Jantar em Santa Felicidade'] },
    { dia: 'Sábado', atividades: ['Passeio de Trem para Morretes', 'Visita ao Museu Oscar Niemeyer'] },
    { dia: 'Domingo', atividades: ['Feira do Largo da Ordem', 'Almoço Costela e Retorno'] }
  ],

  metrics: {
    totalVisitantes: 45000,
    permanenciaMediaDias: 2.8,
    gastoMedioDiario: 350.00,
    pegadaCarbonoCompensada: '92.4%',
    ocupacaoHoteleiraMedia: '84%'
  }
};
