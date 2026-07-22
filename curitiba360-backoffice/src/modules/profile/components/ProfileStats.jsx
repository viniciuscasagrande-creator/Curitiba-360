import React from "react";
import {
  Gift,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileStats({
  stats = {},
}) {
  const items = [
    {
      id: "orders",
      label: "Pedidos",
      value: stats.orders || 0,
      href: "/perfil/pedidos",
      icon: ShoppingBag,
    },

    {
      id: "favorites",
      label: "Favoritos",
      value: stats.favorites || 0,
      href: "/favoritos",
      icon: Heart,
    },

    {
      id: "reviews",
      label: "Avaliações",
      value: stats.reviews || 0,
      href: "/perfil/avaliacoes",
      icon: Star,
    },

    {
      id: "benefits",
      label: "Benefícios",
      value: stats.benefits || 0,
      href: "/beneficios",
      icon: Gift,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 select-none text-left">
      {items.map((item) => {
        const Icon = item.icon;
        const isExternal = item.href === "/beneficios" || item.href === "/perfil/avaliacoes";

        const content = (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
              <Icon size={19} />
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-950 my-0">
              {item.value}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500 my-0">
              {item.label}
            </p>
          </>
        );

        if (isExternal) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => alert(`A funcionalidade de ${item.label.toLowerCase()} estará disponível em breve!`)}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md cursor-pointer block text-left w-full"
            >
              {content}
            </button>
          );
        }

        return (
          <Link
            key={item.id}
            to={item.href}
            className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md text-decoration-none block"
          >
            {content}
          </Link>
        );
      })}
    </section>
  );
}
