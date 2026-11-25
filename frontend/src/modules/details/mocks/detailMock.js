export const detailMock = [
  {
    id: "jardim-botanico",
    slug: "jardim-botanico",
    type: "place",

    title: "Jardim Botânico de Curitiba",
    subtitle:
      "Um dos principais cartões-postais da cidade",

    description:
      "O Jardim Botânico de Curitiba é um dos locais mais visitados da capital paranaense. Sua estufa de estrutura metálica, inspirada em palácios de cristal europeus, tornou-se um dos símbolos da cidade. O espaço também oferece jardins geométricos, trilhas, áreas verdes, exposições e locais para descanso e contemplação.",

    category: "turismo",
    categoryLabel: "Turismo",

    images: [
      "/jardim_botanico.jpg",
      "/opera_de_arame.jpg",
      "/museu_niemeyer.jpg",
    ],

    rating: 4.9,
    reviewsCount: 12480,
    visits: 58200,
    distance: 4.2,

    featured: true,
    free: true,
    accessible: true,
    petFriendly: false,
    parking: true,
    wifi: false,
    familyFriendly: true,

    address: {
      street: "Rua Engenheiro Ostoja Roguski",
      number: "690",
      neighborhood: "Jardim Botânico",
      city: "Curitiba",
      state: "PR",
      zipCode: "80210-390",
    },

    location: {
      latitude: -25.4429,
      longitude: -49.2362,
    },

    schedule: [
      {
        day: 0,
        label: "Domingo",
        openingTime: "06:00",
        closingTime: "19:30",
        closed: false,
      },
      {
        day: 1,
        label: "Segunda-feira",
        openingTime: "06:00",
        closingTime: "19:30",
        closed: false,
      },
      {
        day: 2,
        label: "Terça-feira",
        openingTime: "06:00",
        closingTime: "19:30",
        closed: false,
      },
      {
        day: 3,
        label: "Quarta-feira",
        openingTime: "06:00",
        closingTime: "19:30",
        closed: false,
      },
      {
        day: 4,
        label: "Quinta-feira",
        openingTime: "06:00",
        closingTime: "19:30",
        closed: false,
      },
      {
        day: 5,
        label: "Sexta-feira",
        openingTime: "06:00",
        closingTime: "19:30",
        closed: false,
      },
      {
        day: 6,
        label: "Sábado",
        openingTime: "06:00",
        closingTime: "19:30",
        closed: false,
      },
    ],

    amenities: [
      "wheelchair",
      "accessible-bathroom",
      "parking",
      "family",
      "guided-tour",
      "store",
    ],

    partner: {
      id: "instituto-curitiba",
      name: "Instituto Municipal de Turismo",
      verified: true,
      description:
        "Parceiro oficial responsável por informações turísticas e atendimento aos visitantes.",
    },

    booking: {
      enabled: false,
      type: "free",
      priceFrom: null,
      label: "Entrada gratuita",
      description:
        "Não é necessário realizar reserva antecipada.",
      url: null,
    },

    tags: [
      "natureza",
      "jardim",
      "estufa",
      "família",
      "turismo",
    ],

    reviews: [
      {
        id: "review-1",
        author: "Mariana S.",
        rating: 5,
        date: "10 de julho de 2026",
        comment:
          "Lugar muito bonito, organizado e ótimo para passear em família.",
      },
      {
        id: "review-2",
        author: "Carlos R.",
        rating: 4,
        date: "2 de julho de 2026",
        comment:
          "Um dos principais pontos turísticos de Curitiba. Vale muito a visita.",
      },
    ],
  },

  {
    id: "opera-de-arame",
    slug: "opera-de-arame",
    type: "place",

    title: "Ópera de Arame",
    subtitle:
      "Arquitetura, cultura e natureza em um só lugar",

    description:
      "A Ópera de Arame é um dos espaços culturais mais conhecidos de Curitiba. Construída com estruturas metálicas e paredes transparentes, está localizada em uma antiga pedreira cercada por vegetação e lagos.",

    category: "turismo",
    categoryLabel: "Turismo e cultura",

    images: [
      "/opera_de_arame.jpg",
      "/jardim_botanico.jpg",
      "/museu_niemeyer.jpg",
    ],

    rating: 4.8,
    reviewsCount: 8910,
    visits: 41300,
    distance: 7.8,

    featured: true,
    free: false,
    accessible: true,
    petFriendly: false,
    parking: true,
    wifi: true,
    familyFriendly: true,

    address: {
      street: "Rua João Gava",
      number: "920",
      neighborhood: "Abranches",
      city: "Curitiba",
      state: "PR",
      zipCode: "82130-010",
    },

    location: {
      latitude: -25.3856,
      longitude: -49.2765,
    },

    schedule: [
      {
        day: 0,
        label: "Domingo",
        openingTime: "10:00",
        closingTime: "18:00",
        closed: false,
      },
      {
        day: 1,
        label: "Segunda-feira",
        openingTime: "",
        closingTime: "",
        closed: true,
      },
      {
        day: 2,
        label: "Terça-feira",
        openingTime: "10:00",
        closingTime: "18:00",
        closed: false,
      },
      {
        day: 3,
        label: "Quarta-feira",
        openingTime: "10:00",
        closingTime: "18:00",
        closed: false,
      },
      {
        day: 4,
        label: "Quinta-feira",
        openingTime: "10:00",
        closingTime: "18:00",
        closed: false,
      },
      {
        day: 5,
        label: "Sexta-feira",
        openingTime: "10:00",
        closingTime: "18:00",
        closed: false,
      },
      {
        day: 6,
        label: "Sábado",
        openingTime: "10:00",
        closingTime: "18:00",
        closed: false,
      },
    ],

    amenities: [
      "wheelchair",
      "parking",
      "wifi",
      "restaurant",
      "family",
    ],

    partner: null,

    booking: {
      enabled: true,
      type: "ticket",
      priceFrom: 20,
      label: "Ingressos disponíveis",
      description:
        "Consulte datas, horários e disponibilidade.",
      url: "/checkout/opera-de-arame",
    },

    tags: [
      "cultura",
      "arquitetura",
      "música",
      "turismo",
    ],

    reviews: [
      {
        id: "review-3",
        author: "Fernanda M.",
        rating: 5,
        date: "15 de julho de 2026",
        comment:
          "Arquitetura incrível e ambiente muito agradável.",
      },
    ],
  },

  {
    id: "festival-gastronomico",
    slug: "festival-gastronomico",
    type: "event",

    title: "Festival Gastronômico de Curitiba",
    subtitle:
      "Sabores, cultura e experiências gastronômicas",

    description:
      "O Festival Gastronômico de Curitiba reúne restaurantes, chefs convidados, produtores locais e atrações culturais em uma programação especial.",

    category: "eventos",
    categoryLabel: "Evento gastronômico",

    images: [
      "/centro_historico.jpg",
      "/jardim_botanico.jpg",
    ],

    rating: 4.7,
    reviewsCount: 2840,
    visits: 19200,
    distance: 2.1,

    featured: true,
    free: false,
    accessible: true,
    petFriendly: false,
    parking: true,
    wifi: true,
    familyFriendly: true,

    address: {
      street: "Rua dos Eventos",
      number: "400",
      neighborhood: "Centro",
      city: "Curitiba",
      state: "PR",
      zipCode: "80010-000",
    },

    location: {
      latitude: -25.4295,
      longitude: -49.2713,
    },

    schedule: [
      {
        day: 5,
        label: "Sexta-feira",
        openingTime: "18:00",
        closingTime: "23:00",
        closed: false,
      },
      {
        day: 6,
        label: "Sábado",
        openingTime: "11:00",
        closingTime: "23:00",
        closed: false,
      },
      {
        day: 0,
        label: "Domingo",
        openingTime: "11:00",
        closingTime: "20:00",
        closed: false,
      },
    ],

    amenities: [
      "wheelchair",
      "accessible-bathroom",
      "parking",
      "wifi",
      "restaurant",
      "family",
    ],

    partner: {
      id: "festival-curitiba",
      name: "Festival Curitiba",
      verified: true,
      description:
        "Organizador oficial do Festival Gastronômico de Curitiba.",
    },

    booking: {
      enabled: true,
      type: "ticket",
      priceFrom: 39.9,
      label: "Ingressos disponíveis",
      description:
        "Escolha a data e garanta seu ingresso.",
      url: "/checkout/festival-gastronomico",
    },

    tags: [
      "festival",
      "comida",
      "evento",
      "gastronomia",
    ],

    reviews: [
      {
        id: "review-4",
        author: "Paulo C.",
        rating: 5,
        date: "8 de julho de 2026",
        comment:
          "Ótima variedade de comidas e organização excelente.",
      },
    ],
  },
];
