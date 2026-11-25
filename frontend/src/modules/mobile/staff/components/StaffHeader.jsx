import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, UserCheck } from 'lucide-react';

export default function StaffHeader({ member = {} }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-b-2xl shadow-lg space-y-3">
      <div className="flex items-center justify-between text-[10px] text-purple-300 font-mono border-b border-slate-800 pb-2">
        <span>Turno: {member.turno}</span>
        <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold">
          {member.prontidaoStatus}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-700 border-2 border-purple-400 overflow-hidden flex items-center justify-center font-extrabold text-sm text-white shadow-inner">
          {member.nome ? member.nome.charAt(0) : 'S'}
        </div>
        <div>
          <div className="font-extrabold text-white text-sm">{member.nome}</div>
          <div className="text-[10px] text-purple-300 font-medium">{member.funcao} • {member.setor}</div>
        </div>
      </div>
    </div>
  );
}
