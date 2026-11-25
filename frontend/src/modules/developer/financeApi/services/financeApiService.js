import { INITIAL_FINANCE_API_DATA } from '../data/financeApiMockData';

const STORAGE_KEY_FINANCE_API = 'curitiba360_finance_api_v1';

function getStoredFinanceApi() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_FINANCE_API);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_FINANCE_API, JSON.stringify(INITIAL_FINANCE_API_DATA));
      return INITIAL_FINANCE_API_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados da API financeira:', error);
    return INITIAL_FINANCE_API_DATA;
  }
}

function persistFinanceApi(data) {
  try {
    localStorage.setItem(STORAGE_KEY_FINANCE_API, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados da API financeira:', error);
  }
}

export const financeApiService = {
  async getFinanceOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredFinanceApi();
    return { success: true, data };
  },

  async processRefundRequest(refundData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredFinanceApi();

    const newRefund = {
      id: `REF-${Date.now().toString().slice(-4)}`,
      status: 'aprovado',
      dataSolicitacao: new Date().toLocaleString('pt-BR'),
      ...refundData
    };

    data.refunds.unshift(newRefund);
    persistFinanceApi(data);
    return { success: true, refund: newRefund, message: '💸 Solicitação de reembolso criada e processada no gateway!' };
  },

  async requestPayout(payoutData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredFinanceApi();

    const newPayout = {
      id: `POUT-${Date.now().toString().slice(-4)}`,
      status: 'liquidado',
      dataLiquidação: new Date().toLocaleString('pt-BR'),
      taxaRepasse: 0.00,
      valorLiquido: payoutData.valorSolicitado,
      ...payoutData
    };

    data.payouts.unshift(newPayout);
    persistFinanceApi(data);
    return { success: true, payout: newPayout, message: `🏦 Repasse Pix no valor de R$ ${payoutData.valorSolicitado.toFixed(2)} transferido com sucesso!` };
  }
};
