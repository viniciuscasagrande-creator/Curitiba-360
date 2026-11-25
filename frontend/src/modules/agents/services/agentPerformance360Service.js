import { INITIAL_PERFORMANCE_360_DATA } from '../data/agentPerformance360MockData';

const STORAGE_KEY_PERFORMANCE_360 = 'curitiba360_agent_performance360_v1';

function getStoredPerformance360() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PERFORMANCE_360);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_PERFORMANCE_360, JSON.stringify(INITIAL_PERFORMANCE_360_DATA));
      return INITIAL_PERFORMANCE_360_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de Performance 360:', error);
    return INITIAL_PERFORMANCE_360_DATA;
  }
}

export const agentPerformance360Service = {
  async getPerformance360Overview(agentId = 'AGT-2001') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredPerformance360();
    return { success: true, data };
  },

  async exportPerformanceReportCSV() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredPerformance360();
    const kpis = data.kpis;

    const csvRows = [
      ['RELATORIO EXECUTIVO DE PERFORMANCE 360 - AGENTE COMERCIAL'],
      ['Gerado em', new Date().toLocaleString('pt-BR')],
      ['Agente ID', 'AGT-2001'],
      ['Agente Nome', 'Carolina Ferraz'],
      ['Agencia', 'Tour CWB Premium'],
      [''],
      ['METRICA', 'VALOR'],
      ['Faturamento Mes', `R$ ${kpis.receitaTotalMes.toFixed(2)}`],
      ['Meta Mensal', `R$ ${kpis.metaMensalValor.toFixed(2)} (${kpis.metaMensalPct}%)`],
      ['Comissao Disponivel', `R$ ${kpis.comissaoDisponivel.toFixed(2)}`],
      ['Ingressos Emitidos', kpis.ingressosEmitidos],
      ['Ticket Medio', `R$ ${kpis.ticketMedio.toFixed(2)}`],
      ['Taxa de Conversao', `${kpis.taxaConversaoPct}%`],
      ['XP Total', kpis.xpTotal],
      ['Nivel Gamificacao', kpis.nivelGamificacao],
      ['Ranking Regional', `#${kpis.posicaoRankingRegional}`],
      ['Ranking Nacional', `#${kpis.posicaoRankingNacional}`],
      ['SLA Cumprido', `${kpis.slaCumpridoPct}%`]
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Relatorio_Performance_360_AGT-2001.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  }
};
