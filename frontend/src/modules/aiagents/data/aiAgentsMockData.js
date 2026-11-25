export const INITIAL_AIAGENTS_DATA = {
  controlCenter: {
    agentesAtivos: 6,
    provedoresConectados: ['Google Gemini 1.5 Pro', 'OpenAI GPT-4o', 'Claude 3.5', 'Llama 3 (Ollama)'],
    execucoesHoje: 14250,
    custoMedioExecucao: 'R$ 0,0004',
    latenciaMediaMs: 180,
    humanInTheLoopAprovacao: '100% de Governança'
  },

  agentesBiblioteca: [
    { id: 'AGT-01', nome: 'Agente Comercial Prospector', modulo: 'CRM 360', status: 'ativo', precisao: '98.2%', execucoes: 3400 },
    { id: 'AGT-02', nome: 'Agente Conciliador Financeiro', modulo: 'Financeiro', status: 'ativo', precisao: '99.9%', execucoes: 1250 },
    { id: 'AGT-03', nome: 'Agente de Atendimento & FAQ', modulo: 'Atendimento', status: 'ativo', precisao: '96.5%', execucoes: 8900 },
    { id: 'AGT-04', nome: 'Agente de Sustentabilidade ESG', modulo: 'ESG', status: 'ativo', precisao: '99.1%', execucoes: 700 }
  ],

  multiagentFlow: [
    { etapa: '1. Solicitação do Usuário', agente: 'Copiloto Executivo', acao: 'Interpretou pedido de orçamento e relatório' },
    { etapa: '2. Consulta Comercial', agente: 'Agente Comercial', acao: 'Verificou disponibilidades e propostas ativas no CRM' },
    { etapa: '3. Análise Financeira', agente: 'Agente Financeiro', acao: 'Calculou impostos ISSQN e margem de lucro' },
    { etapa: '4. Resposta Consolidada', agente: 'Orquestrador AI', acao: 'Sintetizou proposta final em PDF em 1.2 segundos' }
  ]
};
