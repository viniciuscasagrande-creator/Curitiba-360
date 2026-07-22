import {
  Bike,
  Building2,
  CalendarDays,
  Hotel,
  Landmark,
  Leaf,
  ShoppingBag,
  Sparkles,
  TramFront,
  Utensils,
  UsersRound,
} from "lucide-react";

export const preferenceCategories = [
  {
    id: "turismo",
    label: "Turismo",
    description:
      "Pontos turísticos e atrações",
    icon: Landmark,
  },
  {
    id: "eventos",
    label: "Eventos",
    description:
      "Shows, festivais e atividades",
    icon: CalendarDays,
  },
  {
    id: "gastronomia",
    label: "Gastronomia",
    description:
      "Restaurantes, cafés e experiências",
    icon: Utensils,
  },
  {
    id: "hoteis",
    label: "Hotéis",
    description:
      "Hospedagens e acomodações",
    icon: Hotel,
  },
  {
    id: "experiencias",
    label: "Experiências",
    description:
      "Passeios e atividades especiais",
    icon: Sparkles,
  },
  {
    id: "compras",
    label: "Compras",
    description:
      "Shoppings, feiras e comércio local",
    icon: ShoppingBag,
  },
  {
    id: "mobilidade",
    label: "Mobilidade",
    description:
      "Transporte e deslocamento",
    icon: TramFront,
  },
  {
    id: "cultura",
    label: "Cultura",
    description:
      "Museus, teatros e patrimônio",
    icon: Building2,
  },
  {
    id: "natureza",
    label: "Natureza",
    description:
      "Parques, trilhas e áreas verdes",
    icon: Leaf,
  },
  {
    id: "familia",
    label: "Família",
    description:
      "Programas para todas as idades",
    icon: UsersRound,
  },
  {
    id: "ciclismo",
    label: "Ciclismo",
    description:
      "Rotas, parks e experiências de bike",
    icon: Bike,
  },
];
