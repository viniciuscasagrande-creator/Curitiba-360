export const TICKET_VALIDATION_RESULT = {
  approved: {
    title: "Entrada autorizada",
    message: "Ingresso validado com sucesso.",
    className:
      "border-emerald-300 bg-emerald-50 text-emerald-800",
  },

  duplicate: {
    title: "Ingresso já utilizado",
    message:
      "Este ingresso já possui um check-in registrado.",
    className:
      "border-red-300 bg-red-50 text-red-800",
  },

  invalid: {
    title: "Ingresso inválido",
    message:
      "Não foi possível validar o código apresentado.",
    className:
      "border-red-300 bg-red-50 text-red-800",
  },

  blocked: {
    title: "Ingresso bloqueado",
    message:
      "Este ingresso está bloqueado para utilização.",
    className:
      "border-orange-300 bg-orange-50 text-orange-800",
  },

  cancelled: {
    title: "Ingresso cancelado",
    message:
      "O pedido ou ingresso foi cancelado.",
    className:
      "border-red-300 bg-red-50 text-red-800",
  },

  refunded: {
    title: "Ingresso reembolsado",
    message:
      "Este ingresso não pode mais ser utilizado.",
    className:
      "border-slate-300 bg-slate-100 text-slate-800",
  },

  wrong_session: {
    title: "Sessão incorreta",
    message:
      "O ingresso pertence a outra data ou horário.",
    className:
      "border-amber-300 bg-amber-50 text-amber-800",
  },

  expired: {
    title: "Ingresso expirado",
    message:
      "A validade deste ingresso foi encerrada.",
    className:
      "border-slate-300 bg-slate-100 text-slate-800",
  },

  offline_pending: {
    title: "Validação salva offline",
    message:
      "O check-in será confirmado após a sincronização.",
    className:
      "border-blue-300 bg-blue-50 text-blue-800",
  },
};
export default TICKET_VALIDATION_RESULT;
