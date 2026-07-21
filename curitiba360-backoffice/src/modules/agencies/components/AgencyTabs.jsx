import React from 'react';
import { Building2, CheckCircle2, Clock, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';

export default function AgencyTabs({ activeTab, onSelectTab, counts = {} }) {
  const tabs = [
    { id: 'todas', label: 'Todas', count: counts.todas || 0, icon: Building2 },
    { id: 'ativo', label: 'Ativas', count: counts.ativo || 0, icon: CheckCircle2 },
    { id: 'pending_approval', label: 'Aguardando Aprovação', count: counts.pending_approval || 0, icon: Clock },
    { id: 'pendente', label: 'Aguardando Contrato', count: counts.pendente || 0, icon: ShieldAlert },
    { id: 'suspenso', label: 'Suspensas', count: counts.suspenso || 0, icon: AlertTriangle },
    { id: 'inativo', label: 'Inativas', count: counts.inativo || 0, icon: XCircle }
  ];

  return (
    <div className="flex items-center gap-2 border-b border-slate-200/80 pb-1 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`
              flex items-center gap-2 px-3.5 py-2.5 rounded-t-lg text-xs font-semibold transition-all whitespace-nowrap border-b-2
              ${isActive 
                ? 'border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20 font-bold' 
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
            `}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            <span
              className={`
                px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600'}
              `}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
