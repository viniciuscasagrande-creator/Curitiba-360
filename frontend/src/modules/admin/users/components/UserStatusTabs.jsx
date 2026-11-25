import React from 'react';

const tabs = [
  { id: 'active', label: 'Ativos' },
  { id: 'inactive', label: 'Inativos' },
  { id: 'all', label: 'Todos' }
];

export function UserStatusTabs({
  value,
  onChange,
  counts = {}
}) {
  return (
    <div className="border-b border-slate-200 text-left">
      <div className="flex min-w-max">
        {tabs.map((tab) => {
          const active = value === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={[
                'relative min-w-32 px-5 py-4 text-sm font-bold transition',
                active
                  ? 'text-emerald-700'
                  : 'text-slate-500 hover:text-slate-900'
              ].join(' ')}
            >
              {tab.label}

              <span
                className={[
                  'ml-2 rounded-full px-2 py-0.5 text-[10px]',
                  active
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-500'
                ].join(' ')}
              >
                {counts[tab.id] ?? 0}
              </span>

              {active && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default UserStatusTabs;
