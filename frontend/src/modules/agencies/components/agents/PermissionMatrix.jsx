import React from 'react';
import { ALL_PERMISSIONS } from '../../services/permissionService';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function PermissionMatrix({ permissions = {}, onChangePermission, readOnly = false }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Matriz de Permissões & Autorização (Diagrama BO-01)
          </h3>
          <p className="text-[11px] text-slate-500">Controle granular de privilégios de venda e operações financeiras.</p>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700 text-[11px]">
          {Object.values(permissions).filter(Boolean).length} / {ALL_PERMISSIONS.length} ativas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ALL_PERMISSIONS.map((item) => {
          const isGranted = Boolean(permissions[item.key]);

          return (
            <div
              key={item.key}
              onClick={() => {
                if (!readOnly && onChangePermission) {
                  onChangePermission(item.key, !isGranted);
                }
              }}
              className={`
                p-3 rounded-xl border transition-all flex items-start gap-3 select-none
                ${readOnly ? 'cursor-default' : 'cursor-pointer hover:border-blue-400'}
                ${isGranted 
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-900' 
                  : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-75'}
              `}
            >
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  disabled={readOnly}
                  checked={isGranted}
                  onChange={(e) => {
                    if (!readOnly && onChangePermission) {
                      onChangePermission(item.key, e.target.checked);
                    }
                  }}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${isGranted ? 'text-slate-900' : 'text-slate-500'}`}>
                    {item.label}
                  </span>
                  {isGranted ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Ativo
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-200 px-1.5 py-0.2 rounded">
                      Bloqueado
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
