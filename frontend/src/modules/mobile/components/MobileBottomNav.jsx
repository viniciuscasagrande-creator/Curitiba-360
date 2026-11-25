import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Activity, DollarSign, Settings } from 'lucide-react';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/mobile/produtor' },
    { label: 'Eventos', icon: Calendar, path: '/mobile/eventos' },
    { label: 'Operação', icon: Activity, path: '/mobile/operacao' },
    { label: 'Financeiro', icon: DollarSign, path: '/mobile/financeiro' },
    { label: 'Ajustes', icon: Settings, path: '/mobile/configuracoes' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 py-2 px-4 flex items-center justify-around text-[10px] font-bold text-slate-400 max-w-md mx-auto rounded-t-2xl shadow-2xl">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path === '/mobile/produtor' && location.pathname === '/mobile');

        return (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-purple-400 scale-105' : 'hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
