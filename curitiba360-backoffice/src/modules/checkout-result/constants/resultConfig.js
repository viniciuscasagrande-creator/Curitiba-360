import {
  CheckCircle2,
  Clock3,
  CreditCard,
  TriangleAlert,
  XCircle,
} from "lucide-react";

export const CHECKOUT_RESULT_CONFIG = {
  approved: {
    title: "Compra confirmada!",
    description:
      "Seu pagamento foi aprovado e o pedido está confirmado.",
    icon: CheckCircle2,
    iconClassName:
      "bg-emerald-100 text-emerald-700",
    badgeClassName:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    badgeLabel: "Pagamento aprovado",
  },

  pending: {
    title: "Pedido criado",
    description:
      "Estamos aguardando a confirmação do pagamento.",
    icon: Clock3,
    iconClassName:
      "bg-amber-100 text-amber-700",
    badgeClassName:
      "border-amber-200 bg-amber-50 text-amber-700",
    badgeLabel: "Pagamento pendente",
  },

  declined: {
    title: "Pagamento não aprovado",
    description:
      "A operadora não autorizou a transação.",
    icon: XCircle,
    iconClassName:
      "bg-red-100 text-red-700",
    badgeClassName:
      "border-red-200 bg-red-50 text-red-700",
    badgeLabel: "Pagamento recusado",
  },

  failed: {
    title: "Não foi possível concluir",
    description:
      "Ocorreu uma falha durante o processamento do pagamento.",
    icon: TriangleAlert,
    iconClassName:
      "bg-orange-100 text-orange-700",
    badgeClassName:
      "border-orange-200 bg-orange-50 text-orange-700",
    badgeLabel: "Falha no pagamento",
  },

  expired: {
    title: "Pagamento expirado",
    description:
      "O prazo para pagamento do PIX foi encerrado.",
    icon: CreditCard,
    iconClassName:
      "bg-slate-100 text-slate-700",
    badgeClassName:
      "border-slate-200 bg-slate-50 text-slate-700",
    badgeLabel: "Pagamento expirado",
  },
};
