import { INITIAL_CRM_SALES_DATA } from '../data/crmMockData';

const STORAGE_KEY_CRM_SALES = 'curitiba360_crm_sales_v1';

function getStoredCrmSales() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CRM_SALES);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CRM_SALES, JSON.stringify(INITIAL_CRM_SALES_DATA));
      return INITIAL_CRM_SALES_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de vendas do CRM:', error);
    return INITIAL_CRM_SALES_DATA;
  }
}

export const crmSalesService = {
  async getCrmSalesOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredCrmSales();
    return { success: true, data };
  }
};
