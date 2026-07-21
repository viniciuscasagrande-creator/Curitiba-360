import React from 'react';
import { DollarSign, Users, Lock, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SeatingKpiGrid({ data = {} }) {
  const cap = data.capacidadeTotal || 300;
  const vend = data.vendidosTotal || 275;
  const res = data.reservadosTotal || 10;
  const bloq = data.bloqueadosTotal || 5;
  const pct = cap > 0 ? Math.round((vend / cap) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* 1. Capacidade & Vendidos */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Capacidade & Ocupação</span>
          <Users className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {vend} / {cap} ({pct}%)
        </div>
        <p className="text-[10px] text-purple-600 font-medium">{cap - vend} assentos livres no mapa</p>
      </div>

      {/* 2. Reservados & Bloqueados */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Reservas & Bloqueios</span>
          <Lock className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-2xl font-extrabold text-amber-700">
          {res} res / {bloq} bloq
        </div>
        <p className="text-[10px] text-amber-600 font-medium">Reservas cortesias e bloqueios técnicos</p>
      </div>

      {/* 3. Receita Prevista */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Receita Prevista no Mapa</span>
          <DollarSign className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          R$ {(data.receitaPrevista || 135000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Potencial máximo do mapa</p>
      </div>

      {/* 4. Conformidade do Layout */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Status do Layout</span>
          <ShieldCheck className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-blue-700">
          Aprovado 100%
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Conformidade com bombeiros e PCD</p>
      </div>
    </div>
  );
}
