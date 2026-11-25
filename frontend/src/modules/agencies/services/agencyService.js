import { INITIAL_AGENCIES } from '../data/agencyMockData';

const STORAGE_KEY = 'curitiba360_agencies_v1';

function getStoredAgencies() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_AGENCIES));
      return INITIAL_AGENCIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler agências do localStorage:', error);
    return INITIAL_AGENCIES;
  }
}

function persistAgencies(agencies) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agencies));
  } catch (error) {
    console.error('Erro ao persistir agências:', error);
  }
}

export const agencyService = {
  async getAgencies(filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let list = getStoredAgencies();

    if (filters.search) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter((ag) =>
        (ag.nomeFantasia && ag.nomeFantasia.toLowerCase().includes(term)) ||
        (ag.razaoSocial && ag.razaoSocial.toLowerCase().includes(term)) ||
        (ag.cnpj && ag.cnpj.includes(term)) ||
        (ag.email && ag.email.toLowerCase().includes(term)) ||
        (ag.cidade && ag.cidade.toLowerCase().includes(term)) ||
        (ag.id && ag.id.toLowerCase().includes(term))
      );
    }

    if (filters.status && filters.status !== 'todas') {
      list = list.filter((ag) => ag.status === filters.status);
    }

    if (filters.cidade && filters.cidade !== 'todas') {
      list = list.filter((ag) => ag.cidade === filters.cidade);
    }

    const stored = getStoredAgencies();

    return {
      success: true,
      data: list,
      total: list.length,
      counts: {
        todas: stored.length,
        ativo: stored.filter((a) => a.status === 'ativo' || a.status === 'active').length,
        pending_approval: stored.filter((a) => a.status === 'pending_approval').length,
        pendente: stored.filter((a) => a.status === 'pendente' || a.status === 'pending_approval').length,
        suspenso: stored.filter((a) => a.status === 'suspenso').length,
        inativo: stored.filter((a) => a.status === 'inativo').length
      }
    };
  },

  async getAgencyById(id) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const list = getStoredAgencies();
    const agency = list.find((a) => a.id === id);
    if (!agency) throw new Error('Agência não encontrada.');
    return { success: true, data: agency };
  },

  async createAgency(agencyData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = getStoredAgencies();

    const newId = `AG-${1000 + list.length + 1}`;
    const now = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newAgency = {
      id: newId,
      status: 'pending_approval',
      etapaAtivacao: 1, // 1: Cadastro, 2: Aprovado, 3: Contrato Gerado, 4: Enviado DocuSign, 5: Ativo
      qtdAgentes: 0,
      limiteCredito: agencyData.limiteCredito ? Number(agencyData.limiteCredito) : 30000.0,
      comissaoPadrao: agencyData.comissaoPadrao ? Number(agencyData.comissaoPadrao) : 10.0,
      dataCadastro: now,
      ultimoAcesso: timeStr,
      responsavel: agencyData.responsavelComercial?.nome || agencyData.responsavel || 'Não informado',
      cidade: agencyData.endereco?.cidade || agencyData.cidade || 'Curitiba',
      uf: agencyData.endereco?.uf || agencyData.uf || 'PR',
      historicoAprovacao: [
        {
          data: timeStr,
          evento: 'Cadastro submetido para análise (status: pending_approval)',
          usuario: agencyData.responsavelComercial?.nome || 'Operador B2B'
        }
      ],
      ...agencyData
    };

    list.unshift(newAgency);
    persistAgencies(list);
    return { success: true, data: newAgency };
  },

  async updateAgency(id, agencyData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = getStoredAgencies();

    const index = list.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Agência não encontrada para atualização.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    list[index] = {
      ...list[index],
      ...agencyData,
      id,
      ultimoAcesso: timeStr
    };

    persistAgencies(list);
    return { success: true, data: list[index] };
  },

  // --- MÉTODOS DA ETAPA 03: FLUXO DE ATIVAÇÃO & DOCUSIGN ---

  async getAgencyActivation(agencyId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const list = getStoredAgencies();
    const agency = list.find((a) => a.id === agencyId);
    if (!agency) throw new Error('Agência não encontrada.');

    // Inicializa estrutura de contrato caso não exista
    const contrato = agency.contrato || {
      numeroContrato: `CTR-${agency.id.replace('AG-', '')}/2026`,
      dataCriacao: agency.dataCadastro,
      statusContrato: agency.status === 'ativo' ? 'assinado' : 'rascunho',
      docusignEnvelopeId: agency.docusignEnvelopeId || null,
      docusignStatus: agency.status === 'ativo' ? 'completed' : 'pending',
      comissaoAcordada: agency.comissaoPadrao || 12.0,
      limiteCreditoAprovado: agency.limiteCredito || 30000.0,
      cicloRepasse: 'Semanal (Segundas-feiras)'
    };

    return {
      success: true,
      data: {
        agency,
        contrato,
        etapaAtual: agency.etapaAtivacao || (agency.status === 'ativo' ? 5 : agency.status === 'pending_approval' ? 1 : 2),
        historico: agency.historicoAprovacao || []
      }
    };
  },

  async approveAgency(agencyId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const list = getStoredAgencies();
    const index = list.findIndex((a) => a.id === agencyId);
    if (index === -1) throw new Error('Agência não encontrada.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const histo = list[index].historicoAprovacao || [];
    histo.push({
      data: timeStr,
      evento: 'Cadastro aprovado pelo Administrador Curitiba360',
      usuario: 'Admin Operacional'
    });

    list[index] = {
      ...list[index],
      status: 'pendente', // Aguardando assinatura de contrato
      etapaAtivacao: 2,
      historicoAprovacao: histo
    };

    persistAgencies(list);
    return { success: true, data: list[index] };
  },

  async createAgencyContract(agencyId, contractOptions = {}) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const list = getStoredAgencies();
    const index = list.findIndex((a) => a.id === agencyId);
    if (index === -1) throw new Error('Agência não encontrada.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const numContrato = `CTR-${agencyId.replace('AG-', '')}/2026`;

    const contrato = {
      numeroContrato: numContrato,
      dataCriacao: timeStr,
      statusContrato: 'gerado',
      comissaoAcordada: contractOptions.comissao || list[index].comissaoPadrao || 12.0,
      limiteCreditoAprovado: contractOptions.limite || list[index].limiteCredito || 30000.0,
      cicloRepasse: contractOptions.ciclo || 'Semanal (Segundas-feiras)',
      objeto: 'Convenção de Credenciamento B2B para Distribuição de Ingressos Curitiba 360'
    };

    const histo = list[index].historicoAprovacao || [];
    histo.push({
      data: timeStr,
      evento: `Minuta contratual ${numContrato} gerada com sucesso`,
      usuario: 'Gerente Comercial'
    });

    list[index] = {
      ...list[index],
      contrato,
      etapaAtivacao: 3,
      historicoAprovacao: histo
    };

    persistAgencies(list);
    return { success: true, contrato, data: list[index] };
  },

  async sendContractToDocusign(agencyId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = getStoredAgencies();
    const index = list.findIndex((a) => a.id === agencyId);
    if (index === -1) throw new Error('Agência não encontrada.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const envelopeId = `DOCUSIGN-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`;

    const contratoAtual = list[index].contrato || {};
    const contratoAtualizado = {
      ...contratoAtual,
      docusignEnvelopeId: envelopeId,
      docusignStatus: 'sent',
      dataEnvioDocusign: timeStr
    };

    const histo = list[index].historicoAprovacao || [];
    histo.push({
      data: timeStr,
      evento: `Contrato enviado via API DocuSign (Envelope: ${envelopeId})`,
      usuario: 'DocuSign Integration Engine'
    });

    list[index] = {
      ...list[index],
      contrato: contratoAtualizado,
      docusignEnvelopeId: envelopeId,
      etapaAtivacao: 4,
      historicoAprovacao: histo
    };

    persistAgencies(list);
    return { success: true, envelopeId, data: list[index] };
  },

  async simulateDocusignWebhook(agencyId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const list = getStoredAgencies();
    const index = list.findIndex((a) => a.id === agencyId);
    if (index === -1) throw new Error('Agência não encontrada.');

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const contratoAtual = list[index].contrato || {};
    const contratoAssinado = {
      ...contratoAtual,
      statusContrato: 'assinado',
      docusignStatus: 'completed',
      dataAssinatura: timeStr
    };

    const histo = list[index].historicoAprovacao || [];
    histo.push({
      data: timeStr,
      evento: 'Webhook DocuSign recebido: Assinatura digital confirmada pelo responsável',
      usuario: 'DocuSign Webhook Listener'
    });
    histo.push({
      data: timeStr,
      evento: 'Agência ativada e liberada para emissão de ingressos B2B (Status: ativo)',
      usuario: 'Sistema Curitiba360'
    });

    list[index] = {
      ...list[index],
      status: 'ativo', // Altera automaticamente para 'ativo' / 'active'
      contrato: contratoAssinado,
      etapaAtivacao: 5,
      historicoAprovacao: histo
    };

    persistAgencies(list);
    return { success: true, data: list[index] };
  },

  async bulkUpdateStatus(ids, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredAgencies();
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    list = list.map((ag) => {
      if (ids.includes(ag.id)) {
        const histo = ag.historicoAprovacao || [];
        histo.push({
          data: timeStr,
          evento: `Status alterado para ${newStatus}`,
          usuario: 'Administrador Curitiba360'
        });
        return { ...ag, status: newStatus, historicoAprovacao: histo };
      }
      return ag;
    });
    persistAgencies(list);
    return { success: true, updatedCount: ids.length };
  },

  async deleteAgencies(ids) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let list = getStoredAgencies();
    list = list.filter((ag) => !ids.includes(ag.id));
    persistAgencies(list);
    return { success: true, deletedCount: ids.length };
  },

  async resetToMock() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_AGENCIES));
    return { success: true };
  }
};
