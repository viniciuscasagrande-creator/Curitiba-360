import {
  BadgePercent,
  Cake,
  Gift,
  Megaphone,
  MousePointerClick,
  RefreshCcw,
  ShoppingCart,
  Sparkles,
  TicketPercent,
  UserPlus,
  WalletCards,
} from "lucide-react";

export const CAMPAIGN_TYPES = {
  discount: {
    label: "Desconto",
    icon: BadgePercent,
  },

  coupon: {
    label: "Cupom",
    icon: TicketPercent,
  },

  cashback: {
    label: "Cashback",
    icon: WalletCards,
  },

  combo: {
    label: "Combo promocional",
    icon: Gift,
  },

  launch: {
    label: "Lançamento",
    icon: Megaphone,
  },

  last_tickets: {
    label: "Últimos ingressos",
    icon: Sparkles,
  },

  abandoned_cart: {
    label: "Recuperação de carrinho",
    icon: ShoppingCart,
  },

  reactivation: {
    label: "Reativação de clientes",
    icon: RefreshCcw,
  },

  birthday: {
    label: "Aniversário",
    icon: Cake,
  },

  referral: {
    label: "Indicação",
    icon: UserPlus,
  },

  remarketing: {
    label: "Remarketing",
    icon: MousePointerClick,
  },
};
export default CAMPAIGN_TYPES;
