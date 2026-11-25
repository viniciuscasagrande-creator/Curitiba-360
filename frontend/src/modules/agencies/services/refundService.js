import { INITIAL_REFUND_REQUESTS, INITIAL_REFUND_POLICIES } from '../data/refundMockData';

const STORAGE_KEY_REFUNDS = 'curitiba360_refunds_requests_v1';
const STORAGE_KEY_POLICIES = 'curitiba360_refunds_policies_v1';

function getStoredRefunds() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_REFUNDS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_REFUNDS, JSON.stringify(INITIAL_REFUND_REQUESTS));
      return INITIAL_REFUND_REQUESTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler reembolsos:', error);
    return INITIAL_REFUND_REQUESTS;
  }
}

function getStoredPolicies() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_POLICIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_POLICIES, JSON.stringify(INITIAL_REFUND_POLICIES));
      return INITIAL_REFUND_POLICIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler políticas de reembolso:', error);
    return INITIAL_REFUND_POLICIES;
  }
}

function persistRefunds(data) {
  try {
    localStorage.setItem(STORAGE_KEY_REFUNDS, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar reembolsos:', error);
  }
}

function persistPolicies(data) {
  try {
    localStorage.setItem(STORAGE_KEY_POLICIES, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar políticas:', error);
  }
}

export const refundService = {
  async getRefundSummary(filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const list = getStoredRefunds();

    const hojeStr = new Date().toISOString().split('T')[0];
    const solicitacoesHoje = list.filter((r) => r.dataSolicitacao.startsWith(hojeStr)).length;
    const pendentes = list.filter((r) => r.status.startsWith('pendente') || r.status === 'analise_ia').length;
    const aprovadas = list.filter((r) => r.status === 'concluido' || r.status === 'em_processamento').length;
    const negadas = list.filter((r) => r.status === 'negado').length;
    const valorTotalSolicitado = list.reduce((acc, r) => acc + (r.valorTotal || 0), 0);
    const valorReembolsadoTotal = list.filter((r) => r.status === 'concluido').reduce((acc, r) => acc + (r.valorReembolsado || 0), 0);
    const scoreMedioRisco = Math.round(list.reduce((acc, r) => acc + (r.scoreRiscoIA || 0), 0) / (list.length || 1));

    return {
      success: true,
      summary: {
        solicitacoesHoje,
        pendentes,
        aprovadas,
        negadas,
        tempoMedio: '45 min',
        valorTotalSolicitado,
        valorReembolsadoTotal,
        scoreMedioRisco
      }
    };
  },

  async listRefundRequests(filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let list = getStoredRefunds();

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((r) =>
        r.id.toLowerCase().includes(term) ||
        r.pedidoId.toLowerCase().includes(term) ||
        r.bilheteId.toLowerCase().includes(term) ||
        r.clienteNome.toLowerCase().includes(term) ||
        r.eventoNome.toLowerCase().includes(term) ||
        (r.agenciaNome && r.agenciaNome.toLowerCase().includes(term)) ||
        (r.gateway && r.gateway.toLowerCase().includes(term))
      );
    }

    if (filters.status && filters.status !== 'todos') {
      if (filters.status === 'pendentes') {
        list = list.filter((r) => r.status.startsWith('pendente') || r.status === 'analise_ia');
      } else {
        list = list.filter((r) => r.status === filters.status);
      }
    }

    if (filters.gateway && filters.gateway !== 'todos') {
      list = list.filter((r) => r.gateway === filters.gateway);
    }

    return { success: true, data: list, total: list.length };
  },

  async getRefundById(refundId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const list = getStoredRefunds();
    const request = list.find((r) => r.id === refundId);
    if (!request) throw new Error('Solicitação de reembolso não encontrada.');
    return { success: true, data: request };
  },

  async createRefundRequest(requestData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = getStoredRefunds();
    const policies = getStoredPolicies();
    const newId = `REF-${7000 + list.length + 1}`;
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    // Avaliação do Motor de Regras de IA
    const diffDias = Math.floor((new Date() - new Date(requestData.dataCompra || new Date())) / (1000 * 60 * 60 * 24));
    const dentroPrazos = diffDias <= policies.maxDiasCompra;
    const valorPequeno = requestData.valorTotal <= policies.limiteValorAutoAprovacao;
    const elegivelAuto = dentroPrazos && valorPequeno && !requestData.bilheteUsado;

    const initialStatus = elegivelAuto ? 'concluido' : 'pendente_financeiro';
    const scoreIA = requestData.bilheteUsado ? 85 : dentroPrazos ? 15 : 60;

    const newRequest = {
      id: newId,
      status: initialStatus,
      scoreRiscoIA: scoreIA,
      recomendacaoIA: elegivelAuto ? 'Aprovação Automática Recomendada' : 'Análise Financeira Requerida',
      fraudeDetectada: requestData.bilheteUsado,
      dataSolicitacao: timeStr,
      etapaAtual: elegivelAuto ? 6 : 3,
      valorReembolsado: elegivelAuto ? requestData.valorTotal : 0,
      taxaRetida: 0,
      tipoReembolso: 'total',
      timeline: [
        { passo: 1, label: 'Solicitado pelo Cliente', data: timeStr, status: 'concluido', obs: 'Formulário registrado' },
        { passo: 2, label: 'Análise Automática / IA', data: timeStr, status: 'concluido', obs: `Score de risco: ${scoreIA}/100` },
        { passo: 3, label: 'Análise Financeira', data: timeStr, status: elegivelAuto ? 'concluido' : 'em_andamento', obs: elegivelAuto ? 'Auto aprovado pelo motor de regras' : 'Em análise' },
        { passo: 4, label: 'Análise Produtor', data: elegivelAuto ? timeStr : null, status: elegivelAuto ? 'concluido' : 'pendente', obs: 'Inventário estornado' },
        { passo: 5, label: 'Envio ao Gateway', data: elegivelAuto ? timeStr : null, status: elegivelAuto ? 'concluido' : 'pendente', obs: 'Estorno enviado via API' },
        { passo: 6, label: 'Concluído', data: elegivelAuto ? timeStr : null, status: elegivelAuto ? 'concluido' : 'pendente', obs: 'Concluído com sucesso' }
      ],
      historicoAprovacoes: [
        { data: timeStr, papel: 'Motor de Regras IA', acao: elegivelAuto ? 'Aprovado Automaticamente' : 'Encaminhado para Análise Financeira', usuario: 'AI Engine v2.4' }
      ],
      ...requestData
    };

    list.unshift(newRequest);
    persistRefunds(list);
    return { success: true, data: newRequest };
  },

  async approveRefund(refundId, approvalData = {}) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    let list = getStoredRefunds();
    const index = list.findIndex((r) => r.id === refundId);
    if (index === -1) throw new Error('Solicitação de reembolso não encontrada.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const req = list[index];

    const papel = approvalData.papel || 'Financeiro Curitiba360';
    const motivo = approvalData.motivo || 'Reembolso aprovado conforme políticas B2B';
    const valorReembolsado = approvalData.valorReembolsado || req.valorTotal;
    const taxaRetida = req.valorTotal - valorReembolsado;

    // Atualizar Timeline
    const timeline = req.timeline.map((item) => {
      if (item.passo <= 4) return { ...item, status: 'concluido', data: timeStr };
      if (item.passo === 5) return { ...item, status: 'em_andamento', data: timeStr, obs: `Processando estorno via ${req.gateway}` };
      return item;
    });

    const histo = req.historicoAprovacoes || [];
    histo.push({
      data: timeStr,
      papel,
      acao: `Aprovado reembolso de R$ ${valorReembolsado.toFixed(2)} (${motivo})`,
      usuario: approvalData.usuario || 'Operador Financeiro'
    });

    list[index] = {
      ...req,
      status: 'em_processamento',
      etapaAtual: 5,
      valorReembolsado,
      taxaRetida,
      tipoReembolso: taxaRetida > 0 ? 'parcial' : 'total',
      timeline,
      historicoAprovacoes: histo
    };

    persistRefunds(list);
    return { success: true, data: list[index] };
  },

  async rejectRefund(refundId, rejectionData = {}) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredRefunds();
    const index = list.findIndex((r) => r.id === refundId);
    if (index === -1) throw new Error('Solicitação de reembolso não encontrada.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const req = list[index];

    const motivo = rejectionData.motivo || 'Solicitação indeferida por descumprimento de regras';

    const timeline = req.timeline.map((item) => {
      if (item.passo === req.etapaAtual) return { ...item, status: 'negado', data: timeStr, obs: motivo };
      return item;
    });

    const histo = req.historicoAprovacoes || [];
    histo.push({
      data: timeStr,
      papel: rejectionData.papel || 'Financeiro',
      acao: `Solicitação Rejeitada: ${motivo}`,
      usuario: rejectionData.usuario || 'Operador Financeiro'
    });

    list[index] = {
      ...req,
      status: 'negado',
      timeline,
      historicoAprovacoes: histo
    };

    persistRefunds(list);
    return { success: true, data: list[index] };
  },

  async processRefundGateway(refundId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let list = getStoredRefunds();
    const index = list.findIndex((r) => r.id === refundId);
    if (index === -1) throw new Error('Solicitação de reembolso não encontrada.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const req = list[index];

    const comprobId = `EST-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;

    const timeline = req.timeline.map((item) => ({ ...item, status: 'concluido', data: item.data || timeStr }));

    const histo = req.historicoAprovacoes || [];
    histo.push({
      data: timeStr,
      papel: `${req.gateway} Gateway`,
      acao: `Estorno de R$ ${req.valorReembolsado.toFixed(2)} processado com sucesso (Comprovante: ${comprobId})`,
      usuario: 'Gateway Integration Engine'
    });

    list[index] = {
      ...req,
      status: 'concluido',
      etapaAtual: 6,
      comprovanteEstornoId: comprobId,
      dataConclusao: timeStr,
      timeline,
      historicoAprovacoes: histo
    };

    persistRefunds(list);
    return { success: true, data: list[index] };
  },

  async getPolicies() {
    return { success: true, data: getStoredPolicies() };
  },

  async updateRefundPolicies(newPolicies) {
    persistPolicies(newPolicies);
    return { success: true, data: newPolicies };
  }
};
