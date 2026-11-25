export const legalMock = {
  summary: {
    activeContracts: 145,
    expiringContracts: 12,
    expiredContracts: 4,
    pendingSignatures: 8,
    completedSignatures: 98,
    activeProcesses: 14,
    pendingObligations: 22,
    activeConsents: 12450,
    activeRisks: 3,
    complianceScore: 98.4,
    averageApprovalDays: 3.2,
    publishedDocuments: 340
  },

  contracts: [
    {
      id: "con-001",
      title: "Contrato de Patrocínio Arena",
      number: "2026/CT-409",
      status: "active",
      type: "patrocínio",
      partnerId: "par-102",
      effectiveDate: "2026-01-10",
      expirationDate: "2027-01-10",
      renewalType: "automatic",
      value: 120000.0,
      currency: "BRL",
      version: 2
    },
    {
      id: "con-002",
      title: "Prestação de Serviços de Limpeza",
      number: "2026/CT-184",
      status: "waiting_signature",
      type: "prestação_serviço",
      partnerId: "par-056",
      effectiveDate: "2026-08-01",
      expirationDate: "2027-08-01",
      renewalType: "manual",
      value: 45000.0,
      currency: "BRL",
      version: 1
    }
  ],

  templates: [
    { id: "tpl-01", name: "Acordo de Confidencialidade (NDA)", type: "NDA", active: true },
    { id: "tpl-02", name: "Contrato de Prestação de Serviços Geral", type: "prestação_serviço", active: true }
  ],

  signers: [
    { id: "sig-01", contractId: "con-002", name: "Carlos Eduardo da Silva", email: "carlos.silva@cleanpr.com", role: "Fornecedor", status: "pending" },
    { id: "sig-02", contractId: "con-002", name: "Mariana Costa", email: "mariana.costa@curitiba360.com.br", role: "Gestor", status: "signed", signedAt: "2026-07-20T14:30:00Z" }
  ],

  policies: [
    { id: "pol-01", title: "Políticas de Retenção de Dados do CMS", status: "published", complianceRate: 100 },
    { id: "pol-02", title: "Código de Conduta e Integridade dos Parceiros", status: "published", complianceRate: 97.2 }
  ],

  consents: [
    { id: "cns-01", customerId: "cust-904", purpose: "Envio de newsletter e novidades por WhatsApp", status: "granted", grantedAt: "2026-07-21" },
    { id: "cns-02", customerId: "cust-412", purpose: "Compartilhamento de dados com operadoras de turismo", status: "revoked", grantedAt: "2026-05-10", revokedAt: "2026-07-22" }
  ],

  risks: [
    { id: "rsk-01", category: "LGPD", title: "Ausência de Opt-in explícito no CMS Legado", severity: "high", status: "mitigating" },
    { id: "rsk-02", category: "Contratual", title: "Vencimento de prazos em contratos de fornecedores de TI", severity: "medium", status: "resolved" }
  ],

  processes: [
    { id: "prc-01", number: "5043182-12.2026.8.16.0001", court: "Tribunal de Justiça do PR", type: "Cível", status: "active", cost: 15400 }
  ]
};
