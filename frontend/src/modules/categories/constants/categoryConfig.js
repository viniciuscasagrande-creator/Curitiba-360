import {
  Car,
  Heart,
  Hotel,
  Map,
  ShoppingBag,
  Ticket,
  Trees,
  UtensilsCrossed,
} from "lucide-react";

export const CATEGORY_CONFIG = {
  turismo: {
    slug: "turismo",
    title: "Turismo em Curitiba",
    shortTitle: "Turismo",
    description:
      "Descubra parques, museus, monumentos, atrações culturais e os principais cartões-postais de Curitiba.",
    eyebrow: "Explore a cidade",
    icon: Trees,
    searchCategory: "turismo",
    image: "/banners/banner01.jpg",
    popularSearches: [
      "Parques",
      "Museus",
      "Arquitetura",
      "Natureza",
      "Centro Histórico",
    ],
  },

  gastronomia: {
    slug: "gastronomia",
    title: "Gastronomia em Curitiba",
    shortTitle: "Gastronomia",
    description:
      "Encontre restaurantes, cafés, bares, confeitarias e experiências gastronômicas para todos os momentos.",
    eyebrow: "Sabores de Curitiba",
    icon: UtensilsCrossed,
    searchCategory: "gastronomia",
    image: "/banners/banner03.jpg",
    popularSearches: [
      "Restaurantes",
      "Cafés",
      "Comida italiana",
      "Pet friendly",
      "Batel",
    ],
  },

  eventos: {
    slug: "eventos",
    title: "Eventos em Curitiba",
    shortTitle: "Eventos",
    description:
      "Veja shows, festivais, exposições, apresentações culturais e eventos para aproveitar a cidade.",
    eyebrow: "Agenda Curitiba",
    icon: Ticket,
    searchCategory: "eventos",
    image: "/banners/banner02.jpg",
    popularSearches: [
      "Hoje",
      "Fim de semana",
      "Shows",
      "Festivais",
      "Gratuitos",
    ],
  },

  hoteis: {
    slug: "hoteis",
    title: "Hotéis em Curitiba",
    shortTitle: "Hotéis",
    description:
      "Encontre hotéis, pousadas e opções de hospedagem próximas às principais atrações da cidade.",
    eyebrow: "Onde ficar",
    icon: Hotel,
    searchCategory: "hoteis",
    image: "/banners/banner01.jpg",
    popularSearches: [
      "Centro",
      "Batel",
      "Pet friendly",
      "Acessível",
      "Parceiros",
    ],
  },

  experiencias: {
    slug: "experiencias",
    title: "Experiências em Curitiba",
    shortTitle: "Experiências",
    description:
      "Conheça passeios guiados, roteiros históricos, atividades culturais e experiências exclusivas.",
    eyebrow: "Viva Curitiba",
    icon: Map,
    searchCategory: "experiencias",
    image: "/banners/banner02.jpg",
    popularSearches: [
      "Passeios",
      "Tour histórico",
      "Para família",
      "Fim de semana",
      "Parceiros",
    ],
  },

  compras: {
    slug: "compras",
    title: "Compras em Curitiba",
    shortTitle: "Compras",
    description:
      "Explore shoppings, feiras, lojas locais, produtos regionais e opções de compras pela cidade.",
    eyebrow: "Compre em Curitiba",
    icon: ShoppingBag,
    searchCategory: "compras",
    image: "/banners/banner03.jpg",
    popularSearches: [
      "Shoppings",
      "Feiras",
      "Artesanato",
      "Centro",
      "Produtos locais",
    ],
  },

  mobilidade: {
    slug: "mobilidade",
    title: "Mobilidade em Curitiba",
    shortTitle: "Mobilidade",
    description:
      "Encontre opções de transporte, estacionamento, aluguel de veículos e serviços de mobilidade.",
    eyebrow: "Como se locomover",
    icon: Car,
    searchCategory: "mobilidade",
    image: "/banners/banner01.jpg",
    popularSearches: [
      "Transporte",
      "Estacionamento",
      "Aluguel de carros",
      "Transfer",
      "Centro",
    ],
  },

  favoritos: {
    slug: "favoritos",
    title: "Seus favoritos",
    shortTitle: "Favoritos",
    description:
      "Consulte os lugares, eventos e experiências que você salvou para visitar depois.",
    eyebrow: "Sua seleção",
    icon: Heart,
    searchCategory: "",
    image: "/banners/banner02.jpg",
    popularSearches: [],
  },
};

export const CATEGORY_LIST = Object.values(
  CATEGORY_CONFIG
);

export function getCategoryConfig(slug) {
  return CATEGORY_CONFIG[slug] || null;
}
