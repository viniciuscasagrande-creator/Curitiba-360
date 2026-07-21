export const INITIAL_GOV_DATA = {
  complianceChecklist: [
    { id: 'LGPD', norma: 'LGPD (Lei Geral de Proteção de Dados)', status: 'Conforme', dataVerificacao: '20/07/2026', conformidade: 100 },
    { id: 'ISO-27001', norma: 'ISO 27001 (Segurança da Informação)', status: 'Conforme', dataVerificacao: '18/07/2026', conformidade: 95 },
    { id: 'PCI-DSS', norma: 'PCI DSS v4.0 (Transações com Cartão)', status: 'Conforme', dataVerificacao: '15/07/2026', conformidade: 100 },
    { id: 'SOC-2', norma: 'SOC 2 Type II (Controles Organizacionais)', status: 'Pendente Auditoria', dataVerificacao: 'Pendente', conformidade: 82 }
  ],

  riscosIdentificados: [
    { id: 'RSK-01', categoria: 'Segurança', probabilidade: 'Média', impacto: 'Alto', criticidade: 'Crítica', mitigacao: 'Implementar MFA + RAG Firewall Cloud Armor', status: 'Mitigado' },
    { id: 'RSK-02', categoria: 'Operacional', probabilidade: 'Baixa', impacto: 'Médio', criticidade: 'Moderada', mitigacao: 'Rede redundante 4G/5G com SQLite offline', status: 'Ativo' },
    { id: 'RSK-03', categoria: 'Financeira', probabilidade: 'Média', impacto: 'Alto', criticidade: 'Alta', mitigacao: 'Workflow de aprovação múltipla para repasses > R$ 50k', status: 'Mitigado' }
  ],

  auditLogs: [
    { id: 'AUD-9001', usuario: 'lucas.financeiro@curitiba360.com.br', acao: 'Aprovação de Repasse', valorNovo: 'R$ 72.000,00', ip: '187.32.11.45', data: '21/07/2026 14:20' },
    { id: 'AUD-9002', usuario: 'ana.biometria@curitiba360.com.br', acao: 'Habilitação 2FA/SSO', valorNovo: 'SSO Ativo (Okta)', ip: '187.32.11.49', data: '21/07/2026 14:15' },
    { id: 'AUD-9003', usuario: 'system.automacao', acao: 'Alteração Lote Ingressos', valorNovo: 'Lote 2 Ativado (80% vendidos)', ip: '127.0.0.1', data: '21/07/2026 14:05' }
  ]
};
