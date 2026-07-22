import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Clock3,
  FileWarning,
  PauseCircle,
} from "lucide-react";

export const PARTNER_STATUS = {
  draft: {
    label: "Cadastro incompleto",
    icon: FileWarning,
    className:
      "border-slate-200 bg-slate-50 text-slate-700",
  },

  pending_documents: {
    label: "Documentos pendentes",
    icon: AlertTriangle,
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  under_review: {
    label: "Em análise",
    icon: Clock3,
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  revision_required: {
    label: "Correção necessária",
    icon: AlertTriangle,
    className:
      "border-orange-200 bg-orange-50 text-orange-700",
  },

  approved: {
    label: "Parceiro aprovado",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  suspended: {
    label: "Conta suspensa",
    icon: PauseCircle,
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  rejected: {
    label: "Cadastro não aprovado",
    icon: Ban,
    className:
      "border-red-200 bg-red-50 text-red-700",
  },
};
