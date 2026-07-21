export const INITIAL_ORDERS_API_DATA = {
  orders: [
    {
      id: 'ORD-8801',
      idempotencyKey: 'idem-key-7781-9921',
      comprador: 'Ana Beatriz Souza',
      email: 'ana.beatriz@email.com',
      total: 520.00,
      status: 'paid', // paid, pending, cancelled
      dataCriacao: '2026-07-21 10:15',
      itens: [{ tipo: 'Ingresso VIP Barão', qtd: 1, valorUnit: 520.00 }]
    },
    {
      id: 'ORD-8802',
      idempotencyKey: 'idem-key-4412-1102',
      comprador: 'Lucas Henrique Spínola',
      email: 'lucas.spinola@email.com',
      total: 240.00,
      status: 'paid',
      dataCriacao: '2026-07-21 11:30',
      itens: [{ tipo: 'Classe Turística Lapa', qtd: 2, valorUnit: 120.00 }]
    }
  ],

  tickets: [
    {
      code: 'CTB-OFF-001',
      ticketId: 'TKT-8801-01',
      orderId: 'ORD-8801',
      participante: 'Ana Beatriz Souza',
      cpf: '***.334.556-**',
      categoria: 'Vagão Barão do Serro Azul (VIP)',
      assento: 'Fila A - Assento 03',
      status: 'valido',
      qrCodeData: 'https://api.curitiba360.com.br/v1/tickets/CTB-OFF-001/qr'
    },
    {
      code: 'CTB-OFF-002',
      ticketId: 'TKT-8802-01',
      orderId: 'ORD-8802',
      participante: 'Lucas Henrique Spínola',
      cpf: '***.888.999-**',
      categoria: 'Vagão Lapa (Classe Turística)',
      assento: 'Fila B - Assento 12',
      status: 'ja_usado',
      qrCodeData: 'https://api.curitiba360.com.br/v1/tickets/CTB-OFF-002/qr'
    }
  ],

  idempotencyStore: [
    { key: 'idem-key-7781-9921', orderId: 'ORD-8801', processadoEm: '2026-07-21 10:15:02' },
    { key: 'idem-key-4412-1102', orderId: 'ORD-8802', processadoEm: '2026-07-21 11:30:15' }
  ]
};
