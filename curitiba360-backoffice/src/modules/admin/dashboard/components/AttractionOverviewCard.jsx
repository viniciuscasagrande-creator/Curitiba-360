import React from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowUpRight,
  BarChart3,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AttractionOverviewCard({ attraction }) {
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md text-left">
      {/* Header & Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute left-3.5 top-3.5">
          {attraction.status === 'active' ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              <CheckCircle2 size={12} />
              Operacional
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-700 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              <Clock size={12} />
              Inativo / Manutenção
            </span>
          )}
        </div>

        {/* Location & Title */}
        <div className="absolute bottom-3 left-3.5 right-3.5">
          <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-300">
            <MapPin size={11} />
            {attraction.location}
          </p>
          <h3 className="truncate text-base font-bold text-white mt-0.5">
            {attraction.name}
          </h3>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">Ingressos</span>
            <span className="text-xs font-black text-slate-900">{attraction.ticketsSold.toLocaleString()}</span>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">Cortesias</span>
            <span className="text-xs font-black text-amber-700">{attraction.courtesies}</span>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">Ticket Médio</span>
            <span className="text-xs font-black text-slate-900">R$ {attraction.averageTicket.toFixed(2)}</span>
          </div>
        </div>

        {/* Financial Row */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">Receita Bruta</span>
            <span className="text-sm font-black text-slate-950">R$ {attraction.revenue.toLocaleString('pt-BR')}</span>
          </div>

          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase text-slate-400">A Repassar</span>
            <span className="text-sm font-black text-emerald-700">R$ {attraction.payoutValue.toLocaleString('pt-BR')}</span>
          </div>
        </div>

        {/* Mini Sparkline Visualization */}
        <div className="flex items-center justify-between rounded-xl bg-emerald-50/50 p-2 border border-emerald-100/60">
          <span className="text-[10px] font-bold uppercase text-emerald-800">Tendência de Vendas</span>
          <div className="flex items-end gap-1 h-5">
            {attraction.sparkline.map((val, idx) => (
              <div
                key={idx}
                style={{ height: `${Math.max(15, (val / 170) * 100)}%` }}
                className="w-1.5 rounded-t bg-emerald-500"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Buttons Footer */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate('/admin/relatorios-financeiros')}
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          <BarChart3 size={14} />
          Relatório
        </button>

        <button
          type="button"
          onClick={() => navigate(`/admin/atracoes/${attraction.id}`)}
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-600 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
        >
          Gerenciar
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default AttractionOverviewCard;
