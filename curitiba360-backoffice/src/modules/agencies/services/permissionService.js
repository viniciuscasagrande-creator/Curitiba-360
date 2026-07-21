import { agentService } from './agentService';

export const ALL_PERMISSIONS = [
  { key: 'podeVender', label: 'Pode Vender', description: 'Autorização para emitir ingressos e pacotes no PDV' },
  { key: 'podeCancelar', label: 'Pode Cancelar', description: 'Permite efetuar cancelamentos e estornos de vendas' },
  { key: 'podeSolicitarRepasse', label: 'Pode Solicitar Repasse', description: 'Permite solicitar transferências de comissões via PIX' },
  { key: 'podeVisualizarFinanceiro', label: 'Pode Visualizar Financeiro', description: 'Acesso a relatórios de receita, DRE e comissionamento' },
  { key: 'podeEmitirVoucher', label: 'Pode Emitir Voucher', description: 'Emissão de cortesia e vouchers operacionais' },
  { key: 'podeValidarIngresso', label: 'Pode Validar Ingresso', description: 'Uso do scanner QR Code no controle de acesso' },
  { key: 'podeEditarCliente', label: 'Pode Editar Cliente', description: 'Edição de cadastros de clientes no CRM' },
  { key: 'podeGerarCupons', label: 'Pode Gerar Cupons', description: 'Criação de cupons promocionais para clientes' }
];

export const permissionService = {
  async getAgentPermissions(agentId) {
    const res = await agentService.getAgentById(agentId);
    return {
      success: true,
      permissions: res.data.permissoes || {}
    };
  },

  async updateAgentPermissions(agentId, newPermissions) {
    const res = await agentService.getAgentById(agentId);
    const agent = res.data;
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const histo = agent.historicoAuditoria || [];
    histo.push({
      data: timeStr,
      acao: 'Matriz de permissões (bo-01) atualizada pela supervisão',
      categoria: 'Segurança'
    });

    const updated = await agentService.updateAgent(agentId, {
      permissoes: newPermissions,
      historicoAuditoria: histo
    });

    return { success: true, permissions: updated.data.permissoes };
  }
};
