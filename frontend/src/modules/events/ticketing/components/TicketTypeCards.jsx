import React from 'react';
import { Ticket, Star, DollarSign, CheckCircle2 } from 'lucide-react';

export default function TicketTypeCards({ tipos = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Ticket className="w-4 h-4 text-purple-600" /> Tipos de Ingressos & Categorias
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {tipos.length} modalidades
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tipos.map((tkt) => (
          <div key={tkt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-xs">{tkt.nome}</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                  {tkt.categoria}
                </span>
              </div>
              <div className="text-xl font-extrabold text-emerald-700">R$ {tkt.preco?.toFixed(2)}</div>
              <div className="text-[10px] text-slate-400 font-medium">Taxa de Serviço: {tkt.taxaConveniencia}%</div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-600">Disponíveis: {tkt.disponiveis}</span>
              <span className={tkt.disponiveis > 0 ? 'text-emerald-700' : 'text-red-600'}>
                {tkt.disponiveis > 0 ? 'À Venda ✓' : 'Esgotado ❌'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
