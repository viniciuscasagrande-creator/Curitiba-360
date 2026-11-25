export const INITIAL_AI_CORE_DATA = {
  aiGatewayStatus: {
    gateway: 'Online (Cloud Run AI Router)',
    provedorAtivo: 'Google Gemini 1.5 Pro (DeepMind)',
    provedorBackup: 'OpenAI GPT-4o / Claude 3.5 Sonnet',
    ragStatus: 'RAG Engine Ativo (Vector Database Chroma)',
    tokensProcessadosHoje: 845000,
    latenciaMediaMs: 240
  },

  modelosDisponiveis: [
    { id: 'gemini-pro', nome: 'Google Gemini 1.5 Pro', provedor: 'Google', status: 'ativo', latencia: '220ms' },
    { id: 'gpt-4o', nome: 'OpenAI GPT-4o', provedor: 'OpenAI', status: 'ativo', latencia: '310ms' },
    { id: 'claude-sonnet', nome: 'Claude 3.5 Sonnet', provedor: 'Anthropic', status: 'ativo', latencia: '280ms' },
    { id: 'llama3-70b', nome: 'Meta Llama 3 70B (Ollama Local)', provedor: 'Meta / Local', status: 'ativo', latencia: '190ms' }
  ],

  copilotConversations: [
    {
      id: 'MSG-01',
      remetente: 'Produtor',
      texto: 'Quantos ingressos vendi hoje no passeio do Trem do Por do Sol?',
      horario: '14:20'
    },
    {
      id: 'MSG-02',
      remetente: 'Curitiba 360 AI',
      texto: '📊 Hoje você vendeu 142 ingressos para o Trem do Pôr do Sol, gerando uma receita de R$ 36.920,00. O lote VIP Barão está com 84% de ocupação! Recomendo abrir o próximo lote agora.',
      horario: '14:20'
    }
  ],

  fraudRiskScores: [
    {
      id: 'TX-8901',
      comprador: 'Ana Beatriz Souza',
      valor: 520.00,
      scoreRisco: 12,
      nivel: 'Baixo',
      recomendacao: 'Aprovar Transação',
      fatores: ['IP Fixo Curitiba', 'Histórico de Compras 3+ anos', 'CPF Válido']
    },
    {
      id: 'TX-8902',
      comprador: 'Usuário Suspeito Bot',
      valor: 2400.00,
      scoreRisco: 88,
      nivel: 'Alto',
      recomendacao: 'Bloquear & Exigir Biometria / MFA',
      fatores: ['VPN / Proxy Detectado', '10 compras em 3 segundos', 'Cartão Internacional']
    }
  ],

  regrasAutomacao: [
    {
      id: 'RULE-01',
      gatilho: 'SE Vendas do Lote atingirem 80%',
      acao: 'ENTÃO Abrir Lote 2 + Enviar E-mail Mkt + Notificar no WhatsApp',
      status: 'ativo',
      disparosExecutados: 24
    },
    {
      id: 'RULE-02',
      gatilho: 'SE Fila na Catraca 1 ultrapassar 15 pessoas',
      acao: 'ENTÃO Redirecionar para Catraca 2 + Alertas no App Staff',
      status: 'ativo',
      disparosExecutados: 5
    }
  ]
};
