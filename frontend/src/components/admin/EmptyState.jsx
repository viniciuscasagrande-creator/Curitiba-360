import React from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({
  title = 'Nenhum registro encontrado',
  description = 'Não há dados que correspondam aos filtros selecionados.',
  icon: Icon = Inbox,
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center my-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
        <Icon size={24} />
      </span>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
