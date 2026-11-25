import {
  Ban,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  RotateCcw,
  TicketCheck,
} from "lucide-react";

export const ORDER_STATUS_CONFIG = {
  pending: {
    label: "Pendente",
    description: "Aguardando pagamento ou confirmação.",
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  processing: {
    label: "Processando",
    description: "O pedido está sendo processado.",
    icon: LoaderCircle,
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  confirmed: {
    label: "Confirmado",
    description: "Compra confirmada e ingressos disponíveis.",
    icon: TicketCheck,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  completed: {
    label: "Concluído",
    description: "Evento ou experiência finalizada.",
    icon: CheckCircle2,
    className:
      "border-slate-200 bg-slate-100 text-slate-700",
  },

  cancelled: {
    label: "Cancelado",
    description: "Este pedido foi cancelado.",
    icon: Ban,
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  refunded: {
    label: "Reembolsado",
    description: "O valor foi devolvido.",
    icon: RotateCcw,
    className:
      "border-violet-200 bg-violet-50 text-violet-700",
  },
};

export const ORDER_FILTERS = [
  {
    id: "all",
    label: "Todos",
  },
  {
    id: "confirmed",
    label: "Confirmados",
  },
  {
    id: "pending",
    label: "Pendentes",
  },
  {
    id: "completed",
    label: "Concluídos",
  },
  {
    id: "cancelled",
    label: "Cancelados",
  },
  {
    id: "refunded",
    label: "Reembolsados",
  },
];
