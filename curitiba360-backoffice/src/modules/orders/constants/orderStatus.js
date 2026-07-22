import {
  CheckCircle2,
  Clock3,
  RotateCcw,
  XCircle,
  CircleDollarSign,
} from "lucide-react";

export const ORDER_STATUS_CONFIG = {
  pending: {
    label: "Aguardando pagamento",
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  confirmed: {
    label: "Confirmado",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  completed: {
    label: "Concluído",
    icon: CheckCircle2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  cancelled: {
    label: "Cancelado",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  refunded: {
    label: "Reembolsado",
    icon: RotateCcw,
    className:
      "border-slate-200 bg-slate-50 text-slate-700",
  },

  partially_refunded: {
    label: "Reembolso parcial",
    icon: CircleDollarSign,
    className:
      "border-purple-200 bg-purple-50 text-purple-700",
  },
};
