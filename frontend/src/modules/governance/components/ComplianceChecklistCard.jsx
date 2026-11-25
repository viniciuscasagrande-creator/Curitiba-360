import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ComplianceChecklistCard({ checklist = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Checklist de Compliance Regulatório & Auditorias
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Conformidade Ativa</span>
      </div>

      <div className="space-y-2">
        {checklist.map((item) => {
          const isFull = item.conformidade === 100;

          return (
            <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{item.norma}</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  isFull ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  Conformidade: {item.conformidade}%
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Última auditoria: {item.dataVerificacao} • Status: <b className="text-slate-800">{item.status}</b></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
