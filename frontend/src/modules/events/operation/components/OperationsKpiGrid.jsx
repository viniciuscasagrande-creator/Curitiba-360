import React from 'react';
import { Users, ShieldCheck, Clock, CheckCircle2, Activity } from 'lucide-react';

export default function OperationsKpiGrid({ data = {} }) {
  const presente = data.publicoPresente || 245;
  const esperado = data.publicoEsperado || 300;
  const staff = data.staffAtivoCount || 32;
  const progresso = data.cronogramaProgressoPct || 85;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* 1. Público Presente */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Público Presente</span>
          <Users className="w-4 h-4 text-emerald-600 animate-pulse" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          {presente} / {esperado} pessoas
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">81.6% de check-in realizado</p>
      </div>

      {/* 2. Staff Ativo */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Equipe em Campo</span>
          <Activity className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          {staff} profissionais
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Segurança, Atendimento e Produção</p>
      </div>

      {/* 3. Cronograma */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Execução do Cronograma</span>
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {progresso}% Concluído
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Dentro da janela de horário planejada</p>
      </div>

      {/* 4. Vistoria Bombeiros */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Vistoria & Segurança</span>
          <ShieldCheck className="w-4 h-4 text-teal-600" />
        </div>
        <div className="text-2xl font-extrabold text-teal-700">
          {data.vistoriaBombeirosStatus || 'Aprovado ✓'}
        </div>
        <p className="text-[10px] text-teal-600 font-medium">Alvará e licenças operacionais em dia</p>
      </div>
    </div>
  );
}
