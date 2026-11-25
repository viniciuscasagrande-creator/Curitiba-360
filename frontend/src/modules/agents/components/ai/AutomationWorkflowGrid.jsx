import React from 'react';
import { Zap, Play, Pause, CheckCircle2, Clock } from 'lucide-react';

export default function AutomationWorkflowGrid({ automations = [], onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" /> Central de Automações & Workflows de Vendas
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Disparos automáticos de WhatsApp e E-mail baseados em gatilhos comportamentais.</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {automations.filter((a) => a.status === 'ativa').length} ativas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {automations.map((aut) => {
          const isActive = aut.status === 'ativa';

          return (
            <div key={aut.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{aut.nome}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isActive ? '● ATIVA' : 'PAUSADA'}
                  </span>
                </div>

                <p className="text-[10px] text-slate-500"><b>Gatilho:</b> {aut.gatilho}</p>
                <p className="text-[10px] text-slate-700 font-medium"><b>Ação:</b> {aut.acao}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <div className="text-[9px] text-purple-700 font-bold">
                  {aut.execucoesTotal} execuções ({aut.taxaSucesso})
                </div>

                <button
                  onClick={() => onToggle && onToggle(aut.id)}
                  className={`px-3 py-1 rounded-lg font-bold text-[10px] transition-all flex items-center gap-1 ${
                    isActive ? 'bg-amber-100 hover:bg-amber-200 text-amber-800' : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isActive ? 'Pausar' : 'Ativar'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
