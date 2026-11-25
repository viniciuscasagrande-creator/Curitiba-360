import React from 'react';

export function StatusTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200/80">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              isActive
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.2 text-[10px] ${
                isActive ? 'bg-slate-100 text-slate-900 font-extrabold' : 'bg-slate-200/60 text-slate-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default StatusTabs;
