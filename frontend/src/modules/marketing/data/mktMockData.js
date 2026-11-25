export const INITIAL_MKT_DATA = {
  marketingMetrics: {
    visitantes: 145000,
    conversoes: 12500,
    taxaConversao: 8.6,
    cac: 18.50,
    roas: '4.5x',
    roi: '3.8x',
    taxaRecompra: 24.2
  },

  campanhas: [
    { id: 'CMP-01', nome: 'Passeio Trem Pôr do Sol - Meta Ads', canal: 'Meta Ads', Cliques: 8900, compras: 420, roas: '5.2x', status: 'ativo' },
    { id: 'CMP-02', nome: 'Lançamento Lote VIP Festival Inverno', canal: 'WhatsApp Blast', Cliques: 12400, compras: 850, roas: '8.4x', status: 'ativo' },
    { id: 'CMP-03', nome: 'Lookalike Clientes Frequentes', canal: 'Google Ads', Cliques: 4500, compras: 110, roas: '2.1x', status: 'ativo' }
  ],

  afiliados: [
    { id: 'AFL-01', nome: 'Luiza Curitiba Dicas (Influenciador)', cliques: 4200, vendas: 180, receita: 24500.00, comissao: 1225.00 },
    { id: 'AFL-02', nome: 'Parceiro Serra Turismo (Agência)', cliques: 8900, vendas: 340, receita: 52000.00, comissao: 2600.00 }
  ]
};
