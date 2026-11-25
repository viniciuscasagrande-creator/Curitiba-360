import React from 'react';
import { Hash, MessageSquare } from 'lucide-react';

export default function ChannelsListPanel({ canais = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-purple-600" /> Canais Operacionais por Setor
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{canais.length} canais</span>
      </div>

      <div className="space-y-2">
        {canais.map((c) => (
          <div key={c.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-purple-50 transition-all">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{c.nome}</div>
              <div className="text-[10px] text-slate-400 font-medium">{c.descricao}</div>
            </div>

            {c.unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[9px]">
                {c.unreadCount} novas
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
