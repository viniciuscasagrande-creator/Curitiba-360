export const INITIAL_OMNICHANNEL_DATA = {
  conversations: [
    {
      id: 'CONV-501',
      clienteId: 'CLI-801',
      clienteNome: 'Carlos Alberto Spínola',
      clienteTelefone: '(41) 99888-7766',
      clienteEmail: 'carlos.spinola@email.com',
      canal: 'whatsapp', // whatsapp, email, push
      naoLidas: 0,
      ultimaMensagemData: '2026-07-21 11:45',
      ultimaMensagemTexto: 'Perfeito! O voucher do passeio de trem chegou no meu e-mail. Obrigado, Carolina!',
      status: 'atendido',
      mensagens: [
        { id: 'M-1', sender: 'agent', texto: 'Olá, Carlos! Tudo bem? Segue a confirmação do seu passeio de trem VIP Morretes!', timestamp: '11:40', canal: 'whatsapp' },
        { id: 'M-2', sender: 'client', texto: 'Perfeito! O voucher do passeio de trem chegou no meu e-mail. Obrigado, Carolina!', timestamp: '11:45', canal: 'whatsapp' }
      ]
    },
    {
      id: 'CONV-502',
      clienteId: 'CLI-802',
      clienteNome: 'Mariana Duarte',
      clienteTelefone: '(41) 99222-1100',
      clienteEmail: 'mariana.duarte@email.com',
      canal: 'whatsapp',
      naoLidas: 2,
      ultimaMensagemData: '2026-07-21 12:10',
      ultimaMensagemTexto: 'Gostaria de saber se vocês têm vagas para o passeio do final de semana que vem?',
      status: 'aguardando_resposta',
      mensagens: [
        { id: 'M-10', sender: 'client', texto: 'Boa tarde! Gostaria de saber se vocês têm vagas para o passeio do final de semana que vem?', timestamp: '12:10', canal: 'whatsapp' }
      ]
    },
    {
      id: 'CONV-503',
      clienteId: 'CLI-803',
      clienteNome: 'Rodrigo Santoro Filho',
      clienteTelefone: '(11) 98765-1122',
      clienteEmail: 'rodrigo.santoro@email.com',
      canal: 'email',
      naoLidas: 0,
      ultimaMensagemData: '2026-07-20 16:00',
      ultimaMensagemTexto: 'Re: Proposta Comercial Grupo SP - Curitiba360',
      status: 'atendido',
      mensagens: [
        { id: 'M-20', sender: 'agent', texto: 'Prezado Rodrigo, enviamos a proposta revisada em anexo.', timestamp: '16:00', canal: 'email' }
      ]
    }
  ],

  templates: [
    {
      id: 'TPL-1',
      titulo: 'Boas-Vindas & Apresentação',
      categoria: 'Vendas',
      canal: 'whatsapp',
      conteudo: 'Olá, {NOME}! Sou {AGENTE} da Curitiba 360. Seja muito bem-vindo! Como posso ajudar na escolha dos melhores passeios em Curitiba hoje?'
    },
    {
      id: 'TPL-2',
      titulo: 'Confirmação de Reserva & Voucher PDF',
      categoria: 'Pós-Venda',
      canal: 'whatsapp',
      conteudo: 'Olá {NOME}! Sua compra do {EVENTO} foi confirmada com sucesso! 🎉 Seu voucher já está disponível no app. Segue o QR Code de embarque!'
    },
    {
      id: 'TPL-3',
      titulo: 'Proposta Comercial Corporativa',
      categoria: 'Orçamentos',
      canal: 'email',
      conteudo: 'Prezado(a) {NOME},\n\nConforme conversamos, enviamos em anexo a proposta comercial para atendimento do seu grupo no evento {EVENTO}.\n\nFicamos à disposição!'
    },
    {
      id: 'TPL-4',
      titulo: 'Cupom de Desconto Reativação (15% OFF)',
      categoria: 'Marketing',
      canal: 'whatsapp',
      conteudo: 'Sentimos sua falta, {NOME}! 🌟 Preparamos um cupom especial de 15% OFF para sua próxima aventura em Curitiba: {CUPOM}. Válido por 48h!'
    }
  ],

  campaignsOmnichannel: [
    {
      id: 'CMP-OMNI-1',
      nome: 'Disparo Especial Festival Gastronômico Batel',
      canal: 'WhatsApp & E-mail',
      publicoAlvo: 'Clientes VIP & Recorrentes (450 contatos)',
      mensagensEnviadas: 450,
      taxaEntrega: '99.2%',
      taxaAbertura: '78.5%',
      conversoesVendas: 42,
      status: 'concluida'
    },
    {
      id: 'CMP-OMNI-2',
      nome: 'Lembrete Final de Semana Inverno Curitiba',
      canal: 'WhatsApp',
      publicoAlvo: 'Leads Qualificados em Negociação (85 contatos)',
      mensagensEnviadas: 85,
      taxaEntrega: '100%',
      taxaAbertura: '91.2%',
      conversoesVendas: 18,
      status: 'em_andamento'
    }
  ]
};
