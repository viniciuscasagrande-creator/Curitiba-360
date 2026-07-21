import { INITIAL_REPORTS_DATA } from '../data/reportsMockData';

const STORAGE_KEY_REPORTS_APP = 'curitiba360_reports_mobile_v1';

function getStoredReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_REPORTS_APP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_REPORTS_APP, JSON.stringify(INITIAL_REPORTS_DATA));
      return INITIAL_REPORTS_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de relatórios:', error);
    return INITIAL_REPORTS_DATA;
  }
}

function persistReports(data) {
  try {
    localStorage.setItem(STORAGE_KEY_REPORTS_APP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de relatórios:', error);
  }
}

export const reportsService = {
  async getReportsOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredReports();
    return { success: true, data };
  },

  async exportReport(reportId, format = 'PDF') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredReports();
    const rep = data.relatorios.find((r) => r.id === reportId);

    if (rep) {
      data.downloadsLocais.unshift({
        id: `DL-${Date.now()}`,
        titulo: `${rep.titulo} (${format})`,
        dataDownload: new Date().toLocaleString('pt-BR'),
        tamanho: rep.tamanho
      });
      persistReports(data);
    }

    return { success: true, message: `📄 Relatório exportado com sucesso em formato ${format}! Arquivo preparado para compartilhamento via Expo Sharing.` };
  },

  async toggleFavoriteDocument(docId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredReports();
    const index = data.documentosEvento.findIndex((d) => d.id === docId);
    if (index !== -1) {
      data.documentosEvento[index].favorito = !data.documentosEvento[index].favorito;
      persistReports(data);
    }
    return { success: true };
  }
};
