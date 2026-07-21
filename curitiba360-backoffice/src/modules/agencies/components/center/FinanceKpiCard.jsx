import React from 'react';

export default function FinanceKpiCard({ title, value, subtitle, trend, icon: Icon, colorTheme = 'blue' }) {
  const themes = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100'
  };

  const themeClass = themes[colorTheme] || themes.blue;

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between text-xs">
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-500 text-xs">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${themeClass}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {typeof value === 'number'
            ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            : value}
        </div>
        {subtitle && <p className="text-[11px] text-slate-400 font-medium mt-0.5">{subtitle}</p>}
      </div>

      {trend && (
        <div className="pt-2 border-t border-slate-100 text-[10px] font-bold text-emerald-700 flex items-center justify-between">
          <span>{trend} vs mês anterior</span>
          <span className="text-slate-400 font-normal">Auditado</span>
        </div>
      )}
    </div>
  );
}
