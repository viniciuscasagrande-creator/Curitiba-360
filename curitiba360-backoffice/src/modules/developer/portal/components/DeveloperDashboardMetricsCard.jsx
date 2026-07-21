import React from 'react';
import { Activity, ShieldCheck, Zap, AlertTriangle, Clock, ArrowUpRight } from 'lucide-react';

export default function DeveloperDashboardMetricsCard() {
  const metrics = [
    { label: 'Aplicações Ativas', value: '4 Apps', status: 'Normal', icon: Activity },
    { label: 'API Keys Emissão', value: '12 Keys', status: 'Ativas', icon: ShieldCheck },
    { label: 'Requisições / min', value: '340 RPM', status: 'Pico 820', icon: Zap },
    { label: 'Tempo Resposta Médio', value: '18 ms', status: 'Excelente', icon: Clock },
    { label: 'Taxa de Erros 4xx/5xx', value: '0.02%', status: 'Saudável', icon: AlertTriangle },
    { label: 'Sucesso dos Webhooks', value: '99.8%', status: 'SLA 99.9%', icon: ArrowUpRight }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Telemetria & Observabilidade da API em Tempo Real
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          Sistemas Operacionais (100% Uptime)
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                <span>{m.label}</span>
                <Icon className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <div className="text-base font-extrabold text-slate-900">{m.value}</div>
              <div className="text-[9px] text-emerald-700 font-bold">{m.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
