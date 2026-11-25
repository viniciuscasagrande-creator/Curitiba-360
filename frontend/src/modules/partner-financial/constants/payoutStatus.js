import {
  Ban,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  LoaderCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";

export const PAYOUT_STATUS = {
  requested: {
    label: "Solicitado",
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  under_review: {
    label: "Em análise",
    icon: Clock3,
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  approved: {
    label: "Aprovado",
    icon: CheckCircle2,
    className:
      "border-cyan-200 bg-cyan-50 text-cyan-700",
  },

  processing: {
    label: "Processando",
    icon: LoaderCircle,
    className:
      "border-purple-200 bg-purple-50 text-purple-700",
  },

  paid: {
    label: "Pago",
    icon: CircleDollarSign,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  failed: {
    label: "Falhou",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  cancelled: {
    label: "Cancelado",
    icon: Ban,
    className:
      "border-slate-200 bg-slate-100 text-slate-700",
  },

  reversed: {
    label: "Estornado",
    icon: RotateCcw,
    className:
      "border-orange-200 bg-orange-50 text-orange-700",
  },
};
