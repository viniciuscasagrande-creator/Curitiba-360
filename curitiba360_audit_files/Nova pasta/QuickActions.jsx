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
  { id: 'events', label: 'Eventos', icon: Calendar, path: '/eventos', color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30' },
  { id: 'tourism', label: 'Turismo', icon: Trees, path: '/turismo', color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30' },
  { id: 'food', label: 'Gastronomia', icon: UtensilsCrossed, path: '/explorar?cat=gastronomia', color: 'from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30' },
  { id: 'map', label: 'Mapa', icon: MapPin, path: '/turismo/mapa', color: 'from-sky-500/20 to-sky-600/10 text-sky-400 border-sky-500/30' },
  { id: 'tickets', label: 'Ingressos', icon: Ticket, path: '/ingressos', color: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30' },
  { id: 'wallet', label: 'Carteira', icon: Wallet, path: '/carteira', color: 'from-indigo-500/20 to-indigo-600/10 text-indigo-400 border-indigo-500/30' },
  { id: 'benefits', label: 'Benefícios', icon: Gift, path: '/carteira/beneficios', color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30' },
  { id: 'favorites', label: 'Favoritos', icon: Heart, path: '/favoritos', color: 'from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30' }
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white tracking-wide">Acesso Rápido</h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => navigate(act.path)}
              className="group flex flex-col items-center gap-2 text-center transition-transform hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${act.color} border flex items-center justify-center shadow-lg transition-all group-hover:scale-105`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white truncate w-full">
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
