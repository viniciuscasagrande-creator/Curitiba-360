import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, CreditCard, ClipboardList, User } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { label: "Início", path: "/app/home", icon: Home },
    { label: "Explorar", path: "/app/explore", icon: Compass },
    { label: "Carteira", path: "/app/wallet", icon: CreditCard },
    { label: "Serviços", path: "/app/services", icon: ClipboardList },
    { label: "Perfil", path: "/app/profile", icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg flex items-center justify-around font-sans">
      {navItems.map((item) => {
        const Icon = item.icon;
        // Check if the current route starts with item.path
        const isActive = location.pathname.startsWith(item.path) || 
          (item.path === "/app/home" && location.pathname === "/app");

        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center py-1 w-16 hover:no-underline transition ${
              isActive ? "text-emerald-600 scale-105" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Icon size={18} className={isActive ? "stroke-[2.5]" : "stroke-[1.8]"} />
            <span className="text-[9px] font-bold mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
