import React from "react";
import {
  Heart,
  Home,
  Map,
  Search,
  UserRound,
} from "lucide-react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import { useFavorites } from "../../favorites/hooks/useFavorites";

const navigationItems = [
  {
    label: "Início",
    href: "/",
    icon: Home,
  },
  {
    label: "Buscar",
    href: "/buscar",
    icon: Search,
  },
  {
    label: "Mapa",
    href: "/mapa",
    icon: Map,
  },
  {
    label: "Favoritos",
    href: "/favoritos",
    icon: Heart,
  },
  {
    label: "Perfil",
    href: "/perfil",
    icon: UserRound,
  },
];

export default function BottomNavigation() {
  const { count } = useFavorites();
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden select-none"
      aria-label="Navegação principal"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.href);

          return (
            <Link
              key={`${item.label}-${item.href}`}
              to={item.href}
              className={[
                "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition text-decoration-none relative",
                active
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 hover:text-slate-800",
              ].join(" ")}
            >
              {item.href === "/favoritos" &&
                count > 0 && (
                  <span className="absolute right-2 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {count > 99
                      ? "99+"
                      : count}
                  </span>
                )}

              <Icon
                size={20}
                aria-hidden="true"
              />

              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
