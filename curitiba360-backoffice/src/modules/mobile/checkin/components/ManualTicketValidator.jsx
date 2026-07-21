import React, { useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';

export default function ManualTicketValidator({ tickets = [], onValidate }) {
  const [query, setQuery] = useState('');

  const filtered = tickets.filter((t) =>
    t.comprador.toLowerCase().includes(query.toLowerCase()) ||
    t.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-purple-600" /> Validação Manual Offline
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Busca por Nome ou Código</span>
      </div>

      <input
        type="text"
        placeholder="Digite o nome ou código..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
      />

      <div className="space-y-2">
        {filtered.map((tkt) => (
          <div key={tkt.code} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{tkt.comprador}</div>
              <div className="text-[10px] text-slate-400 font-mono">{tkt.code} • Assento: {tkt.assento}</div>
            </div>

            <button
              onClick={() => onValidate && onValidate(tkt.code)}
              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[9px]"
            >
              Validar Acesso
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
