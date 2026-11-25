import React, { useState } from 'react';
import { Search, CheckCircle2, UserCheck } from 'lucide-react';

export default function TicketValidationSearch({ ingressos = [], onValidateTicket }) {
  const [search, setSearch] = useState('');

  const filtered = ingressos.filter((t) =>
    t.comprador.toLowerCase().includes(search.toLowerCase()) ||
    t.cpf.includes(search)
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-purple-600" /> Validação Manual por Nome ou CPF
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          Busca de Emergência
        </span>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar por nome do comprador ou CPF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((tkt) => (
          <div key={tkt.ticketId} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{tkt.comprador}</div>
              <div className="text-[10px] text-slate-400">CPF: {tkt.cpf} • Assento: {tkt.assento}</div>
            </div>

            {tkt.dataCheckin ? (
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">
                ✓ Check-in Feito ({tkt.dataCheckin})
              </span>
            ) : (
              <button
                onClick={() => onValidateTicket && onValidateTicket(tkt.qrCode)}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px] shadow-xs"
              >
                Fazer Check-in Manual
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
