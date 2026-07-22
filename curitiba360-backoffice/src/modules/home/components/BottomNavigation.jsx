import React from "react";
import {
  Compass,
  Heart,
  Home,
  Search,
  UserRound,
} from "lucide-react";
import {
  NavLink,
} from "react-router-dom";

const navigationItems = [
  {
    label: "Início",
    to: "/",
    icon: Home,
    end: true,
  },
  {
    label: "Explorar",
    to: "/explorar",
    icon: Compass,
  },
  {
    label: "Buscar",
    to: "/buscar",
    icon: Search,
  },
  {
    label: "Favoritos",
    to: "/favoritos",
    icon: Heart,
  },
  {
    label: "Perfil",
    to: "/perfil",
    icon: UserRound,
  },
];

export default function BottomNavigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden select-none"
      aria-label="Navegação principal"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={`${item.label}-${item.to}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition text-decoration-none",
                  isActive
                    ? "text-emerald-700 font-bold"
                    : "text-slate-500 hover:text-slate-800",
                ].join(" ")
              }
            >
              <Icon
                size={20}
                aria-hidden="true"
              />

              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
