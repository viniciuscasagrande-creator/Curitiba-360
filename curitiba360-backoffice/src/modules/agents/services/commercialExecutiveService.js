import { INITIAL_COMMERCIAL_EXECUTIVE_DATA } from '../data/commercialExecutiveMockData';

const STORAGE_KEY_COMMERCIAL_EXEC = 'curitiba360_commercial_executive_v1';

function getStoredExecutiveData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_COMMERCIAL_EXEC);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_COMMERCIAL_EXEC, JSON.stringify(INITIAL_COMMERCIAL_EXECUTIVE_DATA));
      return INITIAL_COMMERCIAL_EXECUTIVE_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados do Painel Executivo:', error);
    return INITIAL_COMMERCIAL_EXECUTIVE_DATA;
  }
}

export const commercialExecutiveService = {
  async getCommercialExecutiveOverview() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredExecutiveData();
    return { success: true, data };
  },

  async exportExecutiveReportCSV() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredExecutiveData();
    const kpis = data.kpis;

    const csvRows = [
      ['PAINEL EXECUTIVO COMERCIAL 360 - CURITIBA 360'],
      ['Gerado em', new Date().toLocaleString('pt-BR')],
      ['Status da Operacao', 'Normal / Alta Eficiencia'],
      [''],
      ['METRICA EXECUTIVA', 'VALOR'],
      ['Receita Total Mes', `R$ ${kpis.receitaTotal.toFixed(2)}`],
      ['Meta Mensal Comercial', `R$ ${kpis.metaMes.toFixed(2)} (${kpis.metaPct}%)`],
      ['Forecast IA Ponderado', `R$ ${kpis.forecastIA.toFixed(2)} (${kpis.forecastConfiancaPct}% confianca)`],
      ['Taxa de Conversao', `${kpis.conversaoPct}%`],
      ['Ticket Medio', `R$ ${kpis.ticketMedio.toFixed(2)}`],
      ['LTV Medio', `R$ ${kpis.ltvMedio.toFixed(2)}`],
      ['CAC Medio', `R$ ${kpis.cacMedio.toFixed(2)}`],
      ['ROI Marketing', kpis.roiMarketing],
      ['Margem Bruta', `${kpis.margemBrutaPct}%`],
      ['NPS Comercial', kpis.npsComercial],
      ['Clientes Ativos', kpis.clientesAtivosTotal],
      ['Agencias Vinculadas', kpis.agenciasAtivas],
      ['Agentes Ativos', kpis.agentesAtivos],
      ['SLA Cumprido Geral', `${kpis.slaCumpridoGeralPct}%`]
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Relatorio_Executivo_Comercial_360.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  }
};
