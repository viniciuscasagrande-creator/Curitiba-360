import { INITIAL_CLOSINGS, INITIAL_RECONCILIATION_SALES } from '../data/reconciliationMockData';

const STORAGE_KEY_CLOSINGS = 'curitiba360_reconciliation_closings_v1';
const STORAGE_KEY_RECON_SALES = 'curitiba360_reconciliation_sales_v1';

function getStoredClosings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CLOSINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CLOSINGS, JSON.stringify(INITIAL_CLOSINGS));
      return INITIAL_CLOSINGS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler fechamentos:', error);
    return INITIAL_CLOSINGS;
  }
}

function getStoredReconSales() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_RECON_SALES);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_RECON_SALES, JSON.stringify(INITIAL_RECONCILIATION_SALES));
      return INITIAL_RECONCILIATION_SALES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler vendas conciliação:', error);
    return INITIAL_RECONCILIATION_SALES;
  }
}

function persistClosings(data) {
  try {
    localStorage.setItem(STORAGE_KEY_CLOSINGS, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar fechamentos:', error);
  }
}

function persistReconSales(data) {
  try {
    localStorage.setItem(STORAGE_KEY_RECON_SALES, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar vendas conciliação:', error);
  }
}

export const reconciliationService = {
  async listFinancialClosings(agencyId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const closings = getStoredClosings().filter((c) => c.agencyId === agencyId || !agencyId);
    return { success: true, data: closings };
  },

  async getReconciliationSummary(agencyId, periodId = 'PER-2026-07') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const closings = getStoredClosings();
    const period = closings.find((c) => c.id === periodId && (c.agencyId === agencyId || !agencyId)) || closings[1] || closings[0];

    const allSales = getStoredReconSales().filter((s) => s.periodId === period.id && (s.agencyId === agencyId || !agencyId));

    const valorBruto = allSales.reduce((acc, s) => acc + (s.valorBruto || 0), 0);
    const taxaGateway = allSales.reduce((acc, s) => acc + (s.taxaGateway || 0), 0);
    const reembolsos = allSales.reduce((acc, s) => acc + (s.reembolso || 0), 0);
    const receitaLiquida = allSales.reduce((acc, s) => acc + (s.receitaLiquida || 0), 0);
    const comissaoTotal = allSales.reduce((acc, s) => acc + (s.valorComissao || 0), 0);

    const vendasPendentes = allSales.filter((s) => s.statusConciliacao === 'pendente').length;
    const vendasDivergentes = allSales.filter((s) => s.statusConciliacao === 'divergente').length;
    const vendasConciliadas = allSales.filter((s) => s.statusConciliacao === 'conciliado').length;

    return {
      success: true,
      period,
      summary: {
        valorBruto,
        taxaGateway,
        reembolsos,
        receitaLiquida,
        comissaoTotal,
        vendasTotal: allSales.length,
        vendasConciliadas,
        vendasPendentes,
        vendasDivergentes,
        podeFechar: vendasPendentes === 0 && vendasDivergentes === 0
      }
    };
  },

  async listReconciliationSales(agencyId, periodId = 'PER-2026-07', filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let sales = getStoredReconSales().filter((s) => (s.periodId === periodId || !periodId) && (s.agencyId === agencyId || !agencyId));

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      sales = sales.filter((s) =>
        s.id.toLowerCase().includes(term) ||
        (s.bilheteId && s.bilheteId.toLowerCase().includes(term)) ||
        (s.eventoNome && s.eventoNome.toLowerCase().includes(term)) ||
        (s.agenteNome && s.agenteNome.toLowerCase().includes(term)) ||
        (s.canalVenda && s.canalVenda.toLowerCase().includes(term))
      );
    }

    if (filters.status && filters.status !== 'todos') {
      sales = sales.filter((s) => s.statusConciliacao === filters.status);
    }

    return { success: true, data: sales, total: sales.length };
  },

  async reconcileSale(agencyId, saleId, notes = 'Conciliação manual efetuada pelo operador financeiro') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let sales = getStoredReconSales();
    const index = sales.findIndex((s) => s.id === saleId);
    if (index === -1) throw new Error('Venda não encontrada para conciliação.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    sales[index] = {
      ...sales[index],
      statusConciliacao: 'conciliado',
      motivoDivergencia: null,
      conciliadoEm: timeStr,
      conciliadoPor: 'Operador Financeiro',
      notasConciliacao: notes
    };

    persistReconSales(sales);
    return { success: true, data: sales[index] };
  },

  async closeFinancialPeriod(agencyId, periodId, user = 'Admin Financeiro') {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Verificar se existem vendas pendentes/divergentes
    const summaryRes = await this.getReconciliationSummary(agencyId, periodId);
    if (!summaryRes.summary.podeFechar) {
      throw new Error(
        `Impossível fechar período: Existem ${summaryRes.summary.vendasPendentes} venda(s) pendente(s) e ${summaryRes.summary.vendasDivergentes} divergente(s). Trate todas as pendências antes de realizar o fechamento.`
      );
    }

    let closings = getStoredClosings();
    const index = closings.findIndex((c) => c.id === periodId);
    if (index === -1) throw new Error('Período financeiro não encontrado.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    closings[index] = {
      ...closings[index],
      status: 'fechado',
      dataFechamento: timeStr,
      fechadoPor: user,
      valorBruto: summaryRes.summary.valorBruto,
      taxaGateway: summaryRes.summary.taxaGateway,
      reembolsos: summaryRes.summary.reembolsos,
      receitaLiquida: summaryRes.summary.receitaLiquida,
      comissaoTotal: summaryRes.summary.comissaoTotal,
      vendasTotal: summaryRes.summary.vendasTotal,
      vendasPendentes: 0,
      vendasDivergentes: 0
    };

    persistClosings(closings);
    return { success: true, closing: closings[index] };
  }
};
