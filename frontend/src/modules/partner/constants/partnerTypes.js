import {
  BedDouble,
  Bus,
  Building2,
  CalendarDays,
  Landmark,
  MapPinned,
  Store,
  Utensils,
} from "lucide-react";

export const PARTNER_TYPES = {
  event_producer: {
    label: "Produtor de eventos",
    description:
      "Criação, divulgação e venda de ingressos.",
    icon: CalendarDays,
  },

  attraction: {
    label: "Atrativo turístico",
    description:
      "Parques, passeios, espaços e atrações.",
    icon: MapPinned,
  },

  gastronomy: {
    label: "Gastronomia",
    description:
      "Restaurantes, bares, cafés e experiências gastronômicas.",
    icon: Utensils,
  },

  culture: {
    label: "Cultura",
    description:
      "Museus, teatros, centros culturais e galerias.",
    icon: Landmark,
  },

  hospitality: {
    label: "Hospedagem",
    description:
      "Hotéis, pousadas e acomodações.",
    icon: BedDouble,
  },

  transport: {
    label: "Transporte",
    description:
      "Transfers, turismo rodoviário e mobilidade.",
    icon: Bus,
  },

  commerce: {
    label: "Comércio",
    description:
      "Lojas, shoppings e serviços comerciais.",
    icon: Store,
  },

  agency: {
    label: "Agência ou operadora",
    description:
      "Agências de turismo e operadoras de experiências.",
    icon: Building2,
  },
};
