export const INITIAL_FINANCE_API_DATA = {
  payments: [
    {
      id: 'PAY-901',
      orderId: 'ORD-8801',
      comprador: 'Ana Beatriz Souza',
      metodo: 'PIX',
      valor: 520.00,
      taxaPlataforma: 26.00,
      valorLiquido: 494.00,
      status: 'pago',
      pixQrCode: '00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865405520.005802BR5915Curitiba 3606008Curitiba62070503***6304E2CA',
      dataPagamento: '2026-07-21 10:15:30'
    },
    {
      id: 'PAY-902',
      orderId: 'ORD-8802',
      comprador: 'Lucas Henrique Spínola',
      metodo: 'CARTAO_CREDITO',
      valor: 240.00,
      taxaPlataforma: 12.00,
      valorLiquido: 228.00,
      status: 'pago',
      cartaoBandeira: 'Mastercard **** 4491',
      dataPagamento: '2026-07-21 11:30:45'
    }
  ],

  refunds: [
    {
      id: 'REF-701',
      paymentId: 'PAY-902',
      comprador: 'Lucas Henrique Spínola',
      valorEstorno: 240.00,
      motivo: 'Desistência no prazo legal de 7 dias (CDC)',
      status: 'aprovado', // pendente, aprovado, concluido
      dataSolicitacao: '2026-07-21 12:10'
    }
  ],

  payouts: [
    {
      id: 'POUT-101',
      produtor: 'Serra Verde Express LTDA',
      chavePix: 'financeiro@serraverde.com.br',
      banco: 'Banco do Brasil (001)',
      valorSolicitado: 45000.00,
      taxaRepasse: 0.00,
      valorLiquido: 45000.00,
      status: 'liquidado',
      dataLiquidação: '2026-07-20 17:00'
    }
  ],

  reconciliationMetrics: {
    receitaBrutaTotal: 760.00,
    taxasAdquirenteRetidas: 38.00,
    saldoDisponivelRepasse: 722.00,
    statusConciliacao: 'CONCILIADO_100%'
  }
};
