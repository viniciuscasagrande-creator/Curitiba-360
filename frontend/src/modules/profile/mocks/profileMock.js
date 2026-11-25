export const profileMock = {
  id: "user-curitiba-360",

  name: "Visitante Curitiba 360",
  email: "visitante@curitiba360.com.br",
  phone: "(41) 99999-0000",
  birthDate: "1990-06-15",
  photoURL: null,

  cpf: "000.000.000-00",
  gender: "",

  address: {
    zipCode: "80010-000",
    street: "Rua das Flores",
    number: "100",
    complement: "",
    neighborhood: "Centro",
    city: "Curitiba",
    state: "PR",
  },

  preferences: {
    categories: [
      "turismo",
      "gastronomia",
      "eventos",
    ],

    notifications: {
      email: true,
      push: true,
      whatsapp: false,
      promotions: true,
      events: true,
    },

    accessibility: {
      reducedMotion: false,
      highContrast: false,
      largerText: false,
    },
  },

  verified: true,
  role: "user",

  stats: {
    orders: 3,
    favorites: 5,
    reviews: 2,
    benefits: 4,
  },

  createdAt: "2026-01-20T10:00:00.000Z",
  updatedAt: "2026-07-20T14:30:00.000Z",
};
