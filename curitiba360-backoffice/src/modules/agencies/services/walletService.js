import { agentService } from './agentService';

export const walletService = {
  async getAgentWallet(agentId) {
    const res = await agentService.getAgentById(agentId);
    const agent = res.data;
    return {
      success: true,
      wallet: {
        saldoDisponivel: agent.saldoDisponivel || 0.0,
        saldoAguardando: agent.saldoAguardando || 0.0,
        totalSacado: agent.totalSacado || 0.0,
        pix: agent.pix || { tipo: 'CPF', chave: agent.cpf },
        extrato: (agent.historicoAuditoria || []).filter((h) => h.categoria === 'Repasse' || h.categoria === 'Venda')
      }
    };
  },

  async requestPayout(agentId, amount) {
    const res = await agentService.getAgentById(agentId);
    const agent = res.data;

    if (amount > agent.saldoDisponivel) {
      throw new Error('Saldo disponível insuficiente para transferência PIX.');
    }

    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const novoSaldo = agent.saldoDisponivel - amount;
    const novoTotalSacado = (agent.totalSacado || 0) + amount;

    const histo = agent.historicoAuditoria || [];
    histo.push({
      data: timeStr,
      acao: `Solicitação de repasse via PIX R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} efetuada`,
      valor: amount,
      categoria: 'Repasse'
    });

    const updated = await agentService.updateAgent(agentId, {
      saldoDisponivel: novoSaldo,
      totalSacado: novoTotalSacado,
      historicoAuditoria: histo
    });

    return { success: true, novoSaldo, data: updated.data };
  }
};
