import { INITIAL_FINANCIAL_CENTER_METRICS } from '../data/financeCenterMockData';

const STORAGE_KEY_FINANCE_CENTER = 'curitiba360_finance_center_v1';

function getStoredFinanceCenter() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_FINANCE_CENTER);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_FINANCE_CENTER, JSON.stringify(INITIAL_FINANCIAL_CENTER_METRICS));
      return INITIAL_FINANCIAL_CENTER_METRICS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler Centro Financeiro:', error);
    return INITIAL_FINANCIAL_CENTER_METRICS;
  }
}

export const financeCenterService = {
  async getFinancialCenterOverview(periodFilter = '30d') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredFinanceCenter();

    // Simulação de ajuste conforme o filtro de período
    let mult = 1;
    if (periodFilter === '7d') mult = 0.25;
    if (periodFilter === '6m') mult = 6;
    if (periodFilter === '1y') mult = 12;

    const summary = {
      ...data.resumo,
      receitaBruta: data.resumo.receitaBruta * mult,
      receitaLiquida: data.resumo.receitaLiquida * mult,
      totalComissoes: data.resumo.totalComissoes * mult
    };

    return {
      success: true,
      data: {
        ...data,
        resumo: summary
      }
    };
  },

  exportOperationsCSV(operations = []) {
    const headers = ['ID Operação', 'Data/Hora', 'Tipo Operação', 'Descrição', 'Agência', 'Valor (R$)', 'Status', 'Meio Pagamento'];
    const rows = operations.map((op) => [
      op.id,
      op.data,
      op.tipo,
      `"${op.descricao}"`,
      `"${op.agencia}"`,
      op.valor.toFixed(2),
      op.status,
      op.meio
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Extrato_Financeiro_Curitiba360_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
