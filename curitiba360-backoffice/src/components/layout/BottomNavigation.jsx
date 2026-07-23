import React from "react";
import { Compass, House, Ticket, UserRound, WalletCards } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routePaths";

const items = [
  {
    label: "Início",
    icon: House,
    to: ROUTES.app.home,
  },
  {
    label: "Explorar",
    icon: Compass,
    to: ROUTES.public.explore,
  },
  {
    label: "Ingressos",
    icon: Ticket,
    to: ROUTES.app.tickets,
  },
  {
    label: "Carteira",
    icon: WalletCards,
    to: ROUTES.app.wallet,
  },
  {
    label: "Perfil",
    icon: UserRound,
    to: ROUTES.app.profile,
  },
];

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-800 bg-[#0d0f14]/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-5">
        {items.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "flex min-h-16 flex-col items-center justify-center gap-1",
                "text-[10px] transition-colors",
                isActive
                  ? "text-red-500 font-medium"
                  : "text-gray-400 hover:text-white",
              ].join(" ")
            }
          >
            <Icon aria-hidden="true" className="size-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
