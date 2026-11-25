export const INITIAL_CHECKIN_DATA = {
  eventId: 'EVT-9001',
  nomeEvento: 'Passeio de Trem Morretes VIP 🚂',
  publicoTotal: 300,
  checkinsRealizados: 245,
  checkinsPendentes: 55,
  velocidadeEntradaPaxMin: 18,
  tempoMedioValidacaoMs: 320,

  catracasPortoes: [
    { id: 'CTR-1', nome: 'Portão A - Catraca 01 (VIP)', status: 'online', fluxoPaxMin: 8, totalLidos: 85, operador: 'Juliana Paes' },
    { id: 'CTR-2', nome: 'Portão A - Catraca 02 (VIP)', status: 'online', fluxoPaxMin: 6, totalLidos: 72, operador: 'Marcos Roberto' },
    { id: 'CTR-3', nome: 'Portão B - Catraca 03 (PCD / Preferencial)', status: 'online', fluxoPaxMin: 4, totalLidos: 88, operador: 'Luciana Mello' }
  ],

  ingressosParaValidar: [
    {
      qrCode: 'QR-TREM-VIP-9001-A1',
      ticketId: 'TKT-9001-01',
      comprador: 'Carlos Alberto Spínola',
      cpf: '***.458.910-**',
      categoria: 'Vagão Barão do Serro Azul (VIP)',
      assento: 'Fila A - Assento 01',
      status: 'valido', // valido, ja_usado, cancelado
      dataCheckin: '2026-07-21 07:45'
    },
    {
      qrCode: 'QR-TREM-VIP-9001-A2',
      ticketId: 'TKT-9001-02',
      comprador: 'Mariana Duarte',
      cpf: '***.123.888-**',
      categoria: 'Vagão Barão do Serro Azul (VIP)',
      assento: 'Fila A - Assento 02',
      status: 'valido',
      dataCheckin: null
    },
    {
      qrCode: 'QR-TREM-VIP-9001-B5',
      ticketId: 'TKT-9001-05',
      comprador: 'Roberto Fonseca',
      cpf: '***.987.222-**',
      categoria: 'Meia-Entrada Estudante',
      assento: 'Fila B - Assento 05',
      status: 'ja_usado',
      dataCheckin: '2026-07-21 07:32'
    },
    {
      qrCode: 'CTB-TESTE-001',
      ticketId: 'CTB-TESTE-001',
      comprador: 'Comprador Teste Válido',
      cpf: '***.001.001-**',
      categoria: 'Passeio VIP Teste',
      assento: 'Fila A - Assento 10',
      status: 'valido',
      dataCheckin: null
    },
    {
      qrCode: 'CTB-TESTE-002',
      ticketId: 'CTB-TESTE-002',
      comprador: 'Comprador Teste Duplicado',
      cpf: '***.002.002-**',
      categoria: 'Passeio VIP Teste',
      assento: 'Fila A - Assento 11',
      status: 'ja_usado',
      dataCheckin: '2026-07-21 08:00'
    }
  ]
};
