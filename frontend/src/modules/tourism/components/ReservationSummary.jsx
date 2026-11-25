import React from 'react';
import { Calendar, Clock, MapPin, ShieldCheck, Ticket } from 'lucide-react';

export function ReservationSummary({
  attraction,
  visitDate,
  visitTime,
  participantCount = 1,
  subtotal = 0,
  fees = 0,
  total = 0,
  onSubmit,
  loading = false
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
        <Ticket size={20} className="text-amber-400" />
        Resumo da Reserva
      </h3>

      <div className="space-y-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Calendar size={15} className="text-amber-400" />
          <span>Data: <strong className="text-white">{visitDate || 'Selecione uma data'}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={15} className="text-amber-400" />
          <span>Horário: <strong className="text-white">{visitTime || 'Selecione um horário'}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-amber-400" />
          <span className="truncate">Local: {attraction?.name}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
        <div className="flex justify-between">
          <span>Ingressos ({participantCount} pessoa{participantCount > 1 ? 's' : ''})</span>
          <span>{subtotal === 0 ? 'Gratuito' : `R$ ${subtotal.toFixed(2)}`}</span>
        </div>

        {fees > 0 && (
          <div className="flex justify-between text-slate-400">
            <span>Taxa de serviço/reserva</span>
            <span>R$ {fees.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between pt-3 border-t border-slate-800 text-sm font-extrabold text-white">
          <span>Valor Total</span>
          <span className="text-amber-400 text-lg">{total === 0 ? 'Gratuito' : `R$ ${total.toFixed(2)}`}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading || !visitDate || !visitTime}
        className="w-full py-3.5 font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:bg-slate-800 disabled:text-slate-500 rounded-2xl shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <ShieldCheck size={18} />
        {loading ? 'Confirmando Reserva...' : 'Confirmar Reserva'}
      </button>
    </div>
  );
}
export default ReservationSummary;
