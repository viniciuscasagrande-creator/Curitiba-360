import React from "react";
import {
  UtensilsCrossed,
  Ticket,
  Trees,
  ShoppingBag,
  Hotel,
  Map,
  Car,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { id: "restaurant", label: "Gastronomia", icon: UtensilsCrossed, color: "bg-orange-50 text-orange-600 hover:bg-orange-100", path: "/pesquisa?type=restaurant" },
  { id: "event", label: "Eventos", icon: Ticket, color: "bg-purple-50 text-purple-600 hover:bg-purple-100", path: "/pesquisa?type=event" },
  { id: "tour", label: "Turismo", icon: Trees, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100", path: "/pesquisa?type=tour" },
  { id: "shopping", label: "Compras", icon: ShoppingBag, color: "bg-blue-50 text-blue-600 hover:bg-blue-100", path: "/pesquisa?type=shopping" },
  { id: "hotel", label: "Hotéis", icon: Hotel, color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100", path: "/pesquisa?type=hotel" },
  { id: "experience", label: "Experiências", icon: Map, color: "bg-rose-50 text-rose-600 hover:bg-rose-100", path: "/pesquisa?type=experience" },
  { id: "mobility", label: "Mobilidade", icon: Car, color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100", path: "/pesquisa?type=mobility" },
  { id: "favorites", label: "Favoritos", icon: Heart, color: "bg-red-50 text-red-600 hover:bg-red-100", path: "/favoritos" },
];

export default function CategoryGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 select-none text-left">
      <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mb-4">
        Categorias
      </h2>
      <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              to={cat.path}
              className="flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-300 hover:scale-105 group text-decoration-none"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 ${cat.color}`}>
                <Icon size={20} className="transition-transform duration-300 group-hover:rotate-6" />
              </div>
              <span className="mt-2 text-[11px] font-bold text-slate-700 tracking-tight leading-tight group-hover:text-slate-900">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
