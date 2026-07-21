import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldAlert, ArrowRight, RefreshCw, Info } from 'lucide-react';

export default function FinanceAlerts({ alerts = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600" /> Alertas Operacionais & Pendências Críticas
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
          {alerts.length} alertas em aberto
        </span>
      </div>

      <div className="space-y-2">
        {alerts.map((alt) => {
          const isHigh = alt.severidade === 'alta';
          const isMedium = alt.severidade === 'media';

          return (
            <div
              key={alt.id}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                isHigh
                  ? 'bg-red-50/60 border-red-200/80 text-red-950'
                  : isMedium
                  ? 'bg-amber-50/60 border-amber-200/80 text-amber-950'
                  : 'bg-blue-50/60 border-blue-200/80 text-blue-950'
              }`}
            >
              <div className="flex items-center gap-3">
                {isHigh ? (
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                ) : isMedium ? (
                  <RefreshCw className="w-5 h-5 text-amber-600 shrink-0" />
                ) : (
                  <Info className="w-5 h-5 text-blue-600 shrink-0" />
                )}
                <div>
                  <span className="font-extrabold text-xs block">{alt.titulo}</span>
                  <span className="text-[11px] opacity-80">{alt.descricao}</span>
                </div>
              </div>

              {alt.link && (
                <Link
                  to={alt.link}
                  className="px-3 py-1.5 bg-white border font-bold text-xs rounded-lg shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-1 shrink-0"
                >
                  <span>{alt.linkText || 'Ver Pendência'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
