export const homeBanners = [
  {
    id: "banner-1",
    title: "Descubra Curitiba",
    description:
      "Explore atrações, eventos e experiências em um só lugar.",
    image: "/banners/banner01.jpg",
    href: "/buscar?categoria=turismo",
    buttonLabel: "Explorar agora",
  },
  {
    id: "banner-2",
    title: "Programação para o fim de semana",
    description:
      "Encontre eventos e passeios para aproveitar a cidade.",
    image: "/banners/banner02.jpg",
    href: "/buscar?periodo=fim-de-semana",
    buttonLabel: "Ver programação",
  },
  {
    id: "banner-3",
    title: "Sabores de Curitiba",
    description:
      "Conheça restaurantes, cafés e experiências gastronômicas.",
    image: "/banners/banner03.jpg",
    href: "/buscar?categoria=gastronomia",
    buttonLabel: "Conhecer lugares",
  },
];

export const homeCategories = [
  {
    id: "gastronomia",
    label: "Gastronomia",
    href: "/buscar?categoria=gastronomia",
  },
  {
    id: "eventos",
    label: "Eventos",
    href: "/buscar?categoria=eventos",
  },
  {
    id: "turismo",
    label: "Turismo",
    href: "/buscar?categoria=turismo",
  },
  {
    id: "compras",
    label: "Compras",
    href: "/buscar?categoria=compras",
  },
  {
    id: "hoteis",
    label: "Hotéis",
    href: "/buscar?categoria=hoteis",
  },
  {
    id: "experiencias",
    label: "Experiências",
    href: "/buscar?categoria=experiencias",
  },
  {
    id: "mobilidade",
    label: "Mobilidade",
    href: "/buscar?categoria=mobilidade",
  },
  {
    id: "favoritos",
    label: "Favoritos",
    href: "/favoritos",
  },
];

export const featuredPlaces = [
  {
    id: "jardim-botanico",
    title: "Jardim Botânico",
    category: "Atração turística",
    location: "Jardim Botânico, Curitiba",
    rating: 4.9,
    reviews: 12480,
    image: "/jardim_botanico.jpg",
    badge: "Mais visitado",
    href: "/local/jardim-botanico",
  },
  {
    id: "opera-de-arame",
    title: "Ópera de Arame",
    category: "Cultura e turismo",
    location: "Abranches, Curitiba",
    rating: 4.8,
    reviews: 8910,
    image: "/opera_de_arame.jpg",
    badge: "Imperdível",
    href: "/local/opera-de-arame",
  },
  {
    id: "museu-oscar-niemeyer",
    title: "Museu Oscar Niemeyer",
    category: "Museu",
    location: "Centro Cívico, Curitiba",
    rating: 4.8,
    reviews: 10320,
    image: "/museu_niemeyer.jpg",
    badge: "Cultura",
    href: "/local/museu-oscar-niemeyer",
  },
];
