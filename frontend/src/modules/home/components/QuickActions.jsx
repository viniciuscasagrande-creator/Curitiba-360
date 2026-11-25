import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Gift,
  Heart,
  Map,
  Ticket,
  Trees,
  UtensilsCrossed,
  Wallet
} from 'lucide-react';

import { ROUTES } from '../../../routes/routePaths';

const actions = [
  {
    id: 'events',
    label: 'Eventos',
    description: 'Shows e cultura',
    icon: CalendarDays,
    path: ROUTES.public.events,
    iconClass: 'bg-amber-50 text-amber-700'
  },
  {
    id: 'tourism',
    label: 'Turismo',
    description: 'Conheça Curitiba',
    icon: Trees,
    path: ROUTES.public.tourism,
    iconClass: 'bg-emerald-50 text-emerald-700'
  },
  {
    id: 'food',
    label: 'Gastronomia',
    description: 'Sabores da cidade',
    icon: UtensilsCrossed,
    path: `${ROUTES.public.explore}?cat=gastronomia`,
    iconClass: 'bg-rose-50 text-rose-700'
  },
  {
    id: 'map',
    label: 'Mapa',
    description: 'Explore por perto',
    icon: Map,
    path: ROUTES.public.tourismMap,
    iconClass: 'bg-sky-50 text-sky-700'
  },
  {
    id: 'tickets',
    label: 'Ingressos',
    description: 'Seus acessos',
    icon: Ticket,
    path: ROUTES.app.tickets,
    iconClass: 'bg-violet-50 text-violet-700'
  },
  {
    id: 'wallet',
    label: 'Carteira',
    description: 'Saldo e pagamentos',
    icon: Wallet,
    path: ROUTES.app.wallet,
    iconClass: 'bg-indigo-50 text-indigo-700'
  },
  {
    id: 'benefits',
    label: 'Benefícios',
    description: 'Ofertas exclusivas',
    icon: Gift,
    path: ROUTES.app.walletBenefits,
    iconClass: 'bg-orange-50 text-orange-700'
  },
  {
    id: 'favorites',
    label: 'Favoritos',
    description: 'Itens salvos',
    icon: Heart,
    path: ROUTES.app.favorites,
    iconClass: 'bg-pink-50 text-pink-700'
  }
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="quick-actions-title">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Curitiba na sua mão
          </p>

          <h2
            id="quick-actions-title"
            className="mt-1 text-xl font-black tracking-tight text-slate-950 sm:text-2xl"
          >
            O que você procura?
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-5 sm:grid-cols-8 sm:gap-4">
        {actions.map(
          ({
            id,
            label,
            description,
            icon: Icon,
            path,
            iconClass
          }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(path)}
              className="group flex min-w-0 flex-col items-center text-center"
            >
              <span
                className={[
                  'flex h-14 w-14 items-center justify-center rounded-full transition duration-200 sm:h-16 sm:w-16',
                  'shadow-sm ring-1 ring-inset ring-slate-900/5',
                  'group-hover:-translate-y-1 group-hover:shadow-md',
                  iconClass
                ].join(' ')}
              >
                <Icon size={25} strokeWidth={2} />
              </span>

              <span className="mt-2 w-full truncate text-xs font-bold text-slate-800">
                {label}
              </span>

              <span className="mt-0.5 hidden text-[10px] text-slate-400 lg:block">
                {description}
              </span>
            </button>
          )
        )}
      </div>
    </section>
  );
}

export default QuickActions;
