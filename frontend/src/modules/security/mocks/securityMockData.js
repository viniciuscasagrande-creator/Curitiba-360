export const INITIAL_SECURITY_DATA = {
  summary: {
    securityScore: 94, // Score de 0 a 100
    activeMfaUsers: "88%",
    pendingVulnerabilities: 2,
    fraudAttemptsBlocked: 142,
    activeSessions: 412
  },

  vulnerabilities: [
    { id: "vuln-001", title: "Dependência com vulnerabilidade de protótipo (npm lodash)", severity: "medium", status: "open", detectedAt: "2026-07-20T10:00:00Z" },
    { id: "vuln-002", title: "Configuração CORS permissiva em endpoint de sandbox", severity: "low", status: "open", detectedAt: "2026-07-21T14:30:00Z" }
  ],

  fraudAlerts: [
    { id: "frd-001", orderId: "ord-8832", customerName: "Roberto Lima", riskScore: 88, reason: "Transação de alta volumetria em IP estrangeiro suspeito", status: "under_review", amount: 1850.00 },
    { id: "frd-002", orderId: "ord-8910", customerName: "Maria Souza", riskScore: 95, reason: "Múltiplas tentativas de cartão com dados divergentes (Velocity Attack)", status: "blocked", amount: 420.00 }
  ],

  sessions: [
    { id: "sess-1", userId: "usr-admin", userName: "Admin Curitiba 360", ipAddress: "187.12.34.56", location: "Curitiba, PR", device: "Chrome / Windows", activeSince: "2026-07-22T14:00:00Z" },
    { id: "sess-2", userId: "usr-partner-88", userName: "Restaurante Madalosso", ipAddress: "200.45.12.98", location: "Curitiba, PR", device: "Firefox / macOS", activeSince: "2026-07-22T15:20:00Z" }
  ],

  consentLog: [
    { id: "cns-001", userName: "Vinicius Casagrande", email: "vinicius@email.com", consentType: "Termos de Uso e Política de Privacidade", status: "granted", ip: "187.12.34.56", timestamp: "2026-07-22T12:00:00Z" },
    { id: "cns-002", userName: "Ana Clara", email: "ana@email.com", consentType: "Compartilhamento de Localização (Mapa)", status: "revoked", ip: "189.44.11.22", timestamp: "2026-07-22T13:45:00Z" }
  ]
};
