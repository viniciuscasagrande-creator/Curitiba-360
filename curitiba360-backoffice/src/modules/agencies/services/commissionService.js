import { agentService } from './agentService';

export const commissionService = {
  async getCommissionRules(agentId) {
    const res = await agentService.getAgentById(agentId);
    const agent = res.data;
    return {
      success: true,
      rules: {
        tipoComissao: agent.tipoComissao || 'percentual',
        taxaComissao: agent.taxaComissao || 5.0,
        comissaoFixaPorVenda: agent.comissaoFixaPorVenda || 0.0,
        faixas: agent.faixasComissao || [
          { ate: 10000, taxa: 4.0 },
          { ate: 30000, taxa: 5.0 },
          { ate: 50000, taxa: 6.5 }
        ],
        categoriasEspeciais: agent.categoriasComissao || [
          { categoria: 'Passeios de Trem', taxa: 7.0 },
          { categoria: 'Gastronomia', taxa: 5.0 }
        ]
      }
    };
  },

  async updateCommissionRules(agentId, rules) {
    const res = await agentService.getAgentById(agentId);
    const agent = res.data;
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const histo = agent.historicoAuditoria || [];
    histo.push({
      data: timeStr,
      acao: `Regras de comissão atualizadas (${rules.tipoComissao}: ${rules.taxaComissao || rules.comissaoFixaPorVenda})`,
      categoria: 'Comissão'
    });

    const updated = await agentService.updateAgent(agentId, {
      tipoComissao: rules.tipoComissao,
      taxaComissao: Number(rules.taxaComissao || 0),
      comissaoFixaPorVenda: Number(rules.comissaoFixaPorVenda || 0),
      faixasComissao: rules.faixas,
      categoriasComissao: rules.categoriasEspeciais,
      historicoAuditoria: histo
    });

    return { success: true, data: updated.data };
  }
};
