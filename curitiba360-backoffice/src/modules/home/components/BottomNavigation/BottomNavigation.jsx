import React from "react";
import { Compass, Search, Heart, User, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { id: "home", label: "Início", icon: Compass, path: "/" },
    { id: "search", label: "Buscar", icon: Search, path: "/pesquisa" },
    { id: "favorites", label: "Favoritos", icon: Heart, path: "/favoritos" },
    { id: "profile", label: "Perfil", icon: User, path: "/perfil" },
    { id: "more", label: "Mais", icon: MoreHorizontal, path: "/wireframes" }, // wireframes visualization / developer hub
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 py-1.5 px-6 select-none md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 text-decoration-none ${
                active ? "text-emerald-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={20} className={active ? "scale-110 stroke-[2.5]" : "stroke-2"} />
              <span className="mt-1 text-[10px] font-bold tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
