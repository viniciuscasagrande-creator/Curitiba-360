import React from 'react';
import { Server, Cpu, HardDrive, Plus, Minus } from 'lucide-react';

export default function MicroservicesTopologyCard({ microservices = [], onScale }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-purple-600" /> Microsserviços Enterprise (Cloud Run Auto-Scaling)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{microservices.length} microsserviços ativos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {microservices.map((ms) => (
          <div key={ms.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{ms.nome}</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                  :{ms.porta}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                <span>CPU: <b>{ms.cpuUsage}</b></span>
                <span>MEM: <b>{ms.memUsage}</b></span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between font-mono text-[10px]">
              <span className="font-bold text-purple-900">{ms.instancias} Instâncias</span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onScale && onScale(ms.id, Math.max(1, ms.instancias - 1))}
                  className="p-1 bg-slate-200 hover:bg-slate-300 rounded text-slate-700 font-bold"
                  title="Reduzir Instância"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onScale && onScale(ms.id, ms.instancias + 1)}
                  className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold"
                  title="Escalar Instância"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
