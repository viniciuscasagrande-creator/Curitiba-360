import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Trees,
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Ticket,
  Wallet,
  Gift,
  Heart
} from 'lucide-react';

const actions = [
  { id: 'events', label: 'Eventos', icon: Calendar, path: '/eventos', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'tourism', label: 'Turismo', icon: Trees, path: '/turismo', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'food', label: 'Gastronomia', icon: UtensilsCrossed, path: '/explorar?cat=gastronomia', color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { id: 'map', label: 'Mapa', icon: MapPin, path: '/turismo/mapa', color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { id: 'tickets', label: 'Ingressos', icon: Ticket, path: '/ingressos', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'wallet', label: 'Carteira', icon: Wallet, path: '/carteira', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { id: 'benefits', label: 'Benefícios', icon: Gift, path: '/carteira/beneficios', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'favorites', label: 'Favoritos', icon: Heart, path: '/favoritos', color: 'bg-rose-100 text-rose-700 border-rose-200' }
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-slate-900 tracking-wide">Acesso Rápido</h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => navigate(act.path)}
              className="group flex flex-col items-center gap-2 text-center transition-transform hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl ${act.color} border flex items-center justify-center shadow-xs transition-all group-hover:scale-105 group-hover:shadow-md`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-slate-950 truncate w-full">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default QuickActions;
