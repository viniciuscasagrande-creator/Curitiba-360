import React from 'react';
import { BadgeDollarSign, Landmark } from 'lucide-react';

const tabs = [
  {
    id: 'conditions',
    label: 'Condições comerciais',
    icon: BadgeDollarSign
  },
  {
    id: 'financial',
    label: 'Informações financeiras',
    icon: Landmark
  }
];

export function CommercialMainTabs({
  value,
  onChange,
  counts = {}
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-slate-200 sm:flex-row text-left">
      {tabs.map(({ id, label, icon: Icon }) => {
        const active = value === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={[
              'relative flex items-center justify-center gap-2 px-5 py-4 text-sm font-bold transition',
              active
                ? 'text-emerald-700'
                : 'text-slate-500 hover:text-slate-900'
            ].join(' ')}
          >
            <Icon size={18} />
            {label}

            <span
              className={[
                'rounded-full px-2 py-0.5 text-[10px]',
                active
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              ].join(' ')}
            >
              {counts[id] || 0}
            </span>

            {active && (
              <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-emerald-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CommercialMainTabs;
