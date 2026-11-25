import React from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';

export default function DigitalLicensingWorkflow({ licencas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 text-purple-600" /> Portal de Licenciamento Digital de Eventos
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Secretaria de Urbanismo</span>
      </div>

      <div className="space-y-2">
        {licencas.map((lic) => {
          const isApproved = lic.status === 'Aprovado';

          return (
            <div key={lic.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{lic.evento} ({lic.id})</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {lic.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Requerente: {lic.solicitante}</div>
              <div className="text-[9px] text-purple-900 font-mono font-bold">Tipo da Licença: {lic.tipo}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
