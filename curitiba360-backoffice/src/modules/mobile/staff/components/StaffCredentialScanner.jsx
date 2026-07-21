import React from 'react';
import { QrCode, ShieldCheck } from 'lucide-react';

export default function StaffCredentialScanner({ credenciais = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <QrCode className="w-3.5 h-3.5 text-purple-600" /> Credenciamento em Campo
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{credenciais.length} registradas</span>
      </div>

      <div className="space-y-2">
        {credenciais.map((crd) => (
          <div key={crd.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{crd.titular}</div>
              <div className="text-[10px] text-purple-800 font-bold">{crd.cargo}</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
              ✓ Válido
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
