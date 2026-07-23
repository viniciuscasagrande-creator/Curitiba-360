import React from 'react';

const tabs = [
  { id: 'active', label: 'Ativos' },
  { id: 'inactive', label: 'Inativos' },
  { id: 'all', label: 'Todos' }
];

export function CommercialStatusTabs({
  value,
  onChange,
  counts = {}
}) {
  return (
    <div className="flex min-w-max gap-1 rounded-2xl bg-slate-100 p-1 text-left">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            'rounded-xl px-4 py-2 text-xs font-bold transition',
            value === tab.id
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-900'
          ].join(' ')}
        >
          {tab.label}

          <span className="ml-2 text-[10px]">
            {counts[tab.id] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}

export default CommercialStatusTabs;
