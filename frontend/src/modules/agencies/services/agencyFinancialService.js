import { agencyService } from './agencyService';

const STORAGE_KEY_FINANCIAL = 'curitiba360_agency_financial_v1';

const INITIAL_FINANCIAL_DATA = {
  'AG-1001': {
    banco: {
      bancoNome: 'Banco do Brasil S.A. (001)',
      agencia: '1234-5',
      contaCorrente: '56789-0',
      tipoConta: 'PJ - Corrente',
      tipoChavePix: 'CNPJ',
      chavePix: '98.765.432/0001-10',
      titular: 'Turismo Curitiba 360 Ltda',
      verificado: true
    },
    carteira: {
      saldoDisponivel: 18450.00,
      saldoAguardando: 4200.00,
      totalRepassado: 142000.00,
      cicloRepasse: 'Semanal (Segundas-feiras)',
      taxaPlataforma: 2.5
    },
    historicoRepasses: [
      {
        id: 'REP-8001',
        dataSolicitacao: '2026-07-20 14:30',
        dataLiquidacao: '2026-07-20 14:32',
        valor: 12500.00,
        status: 'pago',
        chavePix: '98.765.432/0001-10',
        comprovanteId: 'PIX-E00000000202607201432ABC998877',
        solicitante: 'Maria Oliveira'
      },
      {
        id: 'REP-8002',
        dataSolicitacao: '2026-07-13 10:15',
        dataLiquidacao: '2026-07-13 10:18',
        valor: 15800.00,
        status: 'pago',
        chavePix: '98.765.432/0001-10',
        comprovanteId: 'PIX-E00000000202607131018XYZ112233',
        solicitante: 'Maria Oliveira'
      },
      {
        id: 'REP-8003',
        dataSolicitacao: '2026-07-21 09:00',
        dataLiquidacao: null,
        valor: 5000.00,
        status: 'processando',
        chavePix: '98.765.432/0001-10',
        comprovanteId: null,
        solicitante: 'Maria Oliveira'
      }
    ]
  }
};

function getStoredFinancial() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_FINANCIAL);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_FINANCIAL, JSON.stringify(INITIAL_FINANCIAL_DATA));
      return INITIAL_FINANCIAL_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar dados financeiros:', error);
    return INITIAL_FINANCIAL_DATA;
  }
}

function persistFinancial(financialData) {
  try {
    localStorage.setItem(STORAGE_KEY_FINANCIAL, JSON.stringify(financialData));
  } catch (error) {
    console.error('Erro ao persistir dados financeiros:', error);
  }
}

export const agencyFinancialService = {
  async getFinancialOverview(agencyId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const allData = getStoredFinancial();
    
    let agencyFin = allData[agencyId];
    if (!agencyFin) {
      // Padrão genérico se a agência for recém criada
      const agencyRes = await agencyService.getAgencyById(agencyId).catch(() => ({ data: {} }));
      const ag = agencyRes.data || {};

      agencyFin = {
        banco: {
          bancoNome: 'Itaú Unibanco S.A. (341)',
          agencia: '0450',
          contaCorrente: '12345-6',
          tipoConta: 'PJ - Corrente',
          tipoChavePix: 'CNPJ',
          chavePix: ag.cnpj || '00.000.000/0001-00',
          titular: ag.razaoSocial || ag.nomeFantasia || 'Agência de Turismo',
          verificado: true
        },
        carteira: {
          saldoDisponivel: 12500.00,
          saldoAguardando: 2100.00,
          totalRepassado: 45000.00,
          cicloRepasse: 'Semanal (Segundas-feiras)',
          taxaPlataforma: 2.5
        },
        historicoRepasses: [
          {
            id: 'REP-7990',
            dataSolicitacao: '2026-07-15 11:00',
            dataLiquidacao: '2026-07-15 11:02',
            valor: 8500.00,
            status: 'pago',
            chavePix: ag.cnpj || '00.000.000/0001-00',
            comprovanteId: 'PIX-E00000000202607151102ABC123',
            solicitante: ag.responsavel || 'Gerente Comercial'
          }
        ]
      };
      allData[agencyId] = agencyFin;
      persistFinancial(allData);
    }

    return {
      success: true,
      data: agencyFin
    };
  },

  async updateBankDetails(agencyId, bankData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const allData = getStoredFinancial();
    if (!allData[agencyId]) allData[agencyId] = {};

    allData[agencyId].banco = {
      ...allData[agencyId].banco,
      ...bankData,
      verificado: true
    };

    persistFinancial(allData);
    return { success: true, banco: allData[agencyId].banco };
  },

  async requestPayout(agencyId, amount, solicitante = 'Gerente Comercial') {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const allData = getStoredFinancial();
    const agencyFin = allData[agencyId] || (await this.getFinancialOverview(agencyId)).data;

    if (amount > agencyFin.carteira.saldoDisponivel) {
      throw new Error('Saldo disponível insuficiente para transferência PIX.');
    }

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const payoutId = `REP-${8000 + agencyFin.historicoRepasses.length + 1}`;

    const newRequest = {
      id: payoutId,
      dataSolicitacao: timeStr,
      dataLiquidacao: timeStr, // Simulação de liquidação instantânea via PIX B2B (Diagrama bo-07)
      valor: Number(amount),
      status: 'pago',
      chavePix: agencyFin.banco.chavePix,
      comprovanteId: `PIX-E${Math.random().toString().slice(2, 18)}2026`,
      solicitante
    };

    agencyFin.carteira.saldoDisponivel -= Number(amount);
    agencyFin.carteira.totalRepassado += Number(amount);
    agencyFin.historicoRepasses.unshift(newRequest);

    allData[agencyId] = agencyFin;
    persistFinancial(allData);

    return { success: true, payout: newRequest, carteira: agencyFin.carteira };
  }
};
