import { INITIAL_EVENT_FINANCIAL_DATA } from '../data/eventFinancialMockData';

const STORAGE_KEY_EVENT_FIN = 'curitiba360_events_financial_v1';

function getStoredFinancial() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_EVENT_FIN);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_EVENT_FIN, JSON.stringify(INITIAL_EVENT_FINANCIAL_DATA));
      return INITIAL_EVENT_FINANCIAL_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler financeiro do evento:', error);
    return INITIAL_EVENT_FINANCIAL_DATA;
  }
}

export const eventFinancialService = {
  async getEventFinancialOverview(eventId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredFinancial();
    return { success: true, data };
  },

  async exportDreReportCSV() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredFinancial();
    const dre = data.dreGerencial;

    const csvRows = [
      ['DRE GERENCIAL DO EVENTO - CURITIBA 360'],
      ['Gerado em', new Date().toLocaleString('pt-BR')],
      ['Evento ID', data.eventId],
      ['Evento Nome', data.nomeEvento],
      [''],
      ['DEMONSTRATIVO DE RESULTADO', 'VALOR (R$)'],
      ...dre.map((d) => [d.linha, d.valor.toFixed(2)])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DRE_Evento_${data.eventId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  }
};
