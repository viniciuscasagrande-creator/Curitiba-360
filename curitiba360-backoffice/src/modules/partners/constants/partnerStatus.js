export const PARTNER_STATUS = {
  PENDING_REVIEW: "pending-review",
  UNDER_REVIEW: "under-review",
  DOCUMENTS_REQUIRED: "documents-required",
  APPROVED: "approved",
  REJECTED: "rejected",
  SUSPENDED: "suspended",
};

export const PARTNER_STATUS_LABELS = {
  [PARTNER_STATUS.PENDING_REVIEW]:
    "Aguardando análise",

  [PARTNER_STATUS.UNDER_REVIEW]:
    "Em análise",

  [PARTNER_STATUS.DOCUMENTS_REQUIRED]:
    "Documentos pendentes",

  [PARTNER_STATUS.APPROVED]:
    "Aprovado",

  [PARTNER_STATUS.REJECTED]:
    "Não aprovado",

  [PARTNER_STATUS.SUSPENDED]:
    "Suspenso",
};
