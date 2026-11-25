import {
  Bell,
  CircleHelp,
  Heart,
  LockKeyhole,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  UserRound,
} from "lucide-react";

export const profileMenuSections = [
  {
    id: "account",
    title: "Minha conta",

    items: [
      {
        id: "personal-data",
        label: "Dados pessoais",
        description:
          "Nome, telefone, CPF e endereço",
        href: "/perfil/dados-pessoais",
        icon: UserRound,
      },

      {
        id: "preferences",
        label: "Preferências",
        description:
          "Interesses e personalização",
        href: "/perfil/preferencias",
        icon: SlidersHorizontal,
      },

      {
        id: "security",
        label: "Segurança",
        description:
          "Senha e proteção da conta",
        href: "/perfil/seguranca",
        icon: ShieldCheck,
      },
    ],
  },

  {
    id: "activities",
    title: "Atividades",

    items: [
      {
        id: "orders",
        label: "Pedidos",
        description:
          "Ingressos e reservas",
        href: "/perfil/pedidos",
        icon: ShoppingBag,
      },

      {
        id: "favorites",
        label: "Favoritos",
        description:
          "Lugares e experiências salvos",
        href: "/favoritos",
        icon: Heart,
      },

      {
        id: "reviews",
        label: "Avaliações",
        description:
          "Comentários publicados",
        href: "/perfil/avaliacoes",
        icon: Star,
      },
    ],
  },

  {
    id: "admin",
    title: "Gestão & Administração",

    items: [
      {
        id: "admin-dashboard",
        label: "Painel Administrativo",
        description: "Dashboard comercial e Business OS",
        href: "/admin/dashboard",
        icon: SlidersHorizontal,
      },
    ],
  },
  {
    id: "settings",
    title: "Configurações",

    items: [
      {
        id: "notifications",
        label: "Notificações",
        description:
          "E-mail, push e WhatsApp",
        href: "/perfil/preferencias#notificacoes",
        icon: Bell,
      },

      {
        id: "privacy",
        label: "Privacidade",
        description:
          "Dados e permissões da conta",
        href: "/perfil/privacidade",
        icon: LockKeyhole,
      },

      {
        id: "support",
        label: "Ajuda e suporte",
        description:
          "Central de atendimento",
        href: "/ajuda",
        icon: CircleHelp,
      },
    ],
  },
];
