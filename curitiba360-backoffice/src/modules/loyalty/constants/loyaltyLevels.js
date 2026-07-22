import {
  Award,
  Crown,
  Gem,
  Medal,
} from "lucide-react";

export const LOYALTY_LEVELS = {
  bronze: {
    id: "bronze",
    label: "Bronze",
    minimumPoints: 0,
    nextLevel: "silver",
    icon: Medal,
    badgeClassName:
      "border-amber-300 bg-amber-50 text-amber-800",
    benefits: [
      "Acesso ao programa de pontos",
      "Cupons sazonais",
      "Ofertas de parceiros",
    ],
  },

  silver: {
    id: "silver",
    label: "Prata",
    minimumPoints: 1000,
    nextLevel: "gold",
    icon: Award,
    badgeClassName:
      "border-slate-300 bg-slate-100 text-slate-700",
    benefits: [
      "Bônus de 5% em pontos",
      "Ofertas antecipadas",
      "Cupons exclusivos",
    ],
  },

  gold: {
    id: "gold",
    label: "Ouro",
    minimumPoints: 3000,
    nextLevel: "diamond",
    icon: Crown,
    badgeClassName:
      "border-yellow-300 bg-yellow-50 text-yellow-800",
    benefits: [
      "Bônus de 10% em pontos",
      "Cashback ampliado",
      "Atendimento prioritário",
      "Pré-venda de experiências",
    ],
  },

  diamond: {
    id: "diamond",
    label: "Diamante",
    minimumPoints: 7000,
    nextLevel: null,
    icon: Gem,
    badgeClassName:
      "border-cyan-300 bg-cyan-50 text-cyan-800",
    benefits: [
      "Bônus de 20% em pontos",
      "Benefícios premium",
      "Convites exclusivos",
      "Experiências VIP",
      "Prioridade máxima",
    ],
  },
};

export const LOYALTY_LEVEL_ORDER = [
  "bronze",
  "silver",
  "gold",
  "diamond",
];
