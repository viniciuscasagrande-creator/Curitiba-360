export const CAMPAIGN_STATUS = {
  draft: {
    label: "Rascunho",
    className:
      "border-slate-200 bg-slate-50 text-slate-700",
  },

  scheduled: {
    label: "Agendada",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  under_review: {
    label: "Em revisão",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  active: {
    label: "Ativa",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  paused: {
    label: "Pausada",
    className:
      "border-orange-200 bg-orange-50 text-orange-700",
  },

  finished: {
    label: "Finalizada",
    className:
      "border-purple-200 bg-purple-50 text-purple-700",
  },

  cancelled: {
    label: "Cancelada",
    className:
      "border-red-200 bg-red-50 text-red-700",
  },
};
export default CAMPAIGN_STATUS;
