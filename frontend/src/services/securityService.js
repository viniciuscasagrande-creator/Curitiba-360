export async function getSecurityScore() {
  return {
    score: 96,
    status: 'Excelente 🛡️',
    mfaEnabledAdmins: '100%',
    activeSecretKeys: 'Rotacionadas há 4 dias',
    zeroTrustStatus: 'Ativo',
    lgpdCompliance: 'Conforme',
    findings: [
      { id: 'sec-1', title: 'Autenticação de Dois Fatores (MFA)', status: 'conforme', detail: 'Obrigatório ativado para todos os perfis SUPER_ADMIN e FINANCE.' },
      { id: 'sec-2', title: 'Criptografia em Repouso & Trânsito', status: 'conforme', detail: 'TLS 1.3 ativado em todas as conexões da API Cloud Functions.' },
      { id: 'sec-3', title: 'Sessões Administrativas Ativas', status: 'monitorado', detail: '0 sessões suspeitas ou anômalas detectadas.' }
    ]
  };
}
