import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventStatusBadge from './EventStatusBadge';
import { Eye, Edit, ShieldCheck, Ticket, MoreHorizontal } from 'lucide-react';

export default function EventTable({ events = [], onRefresh }) {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === events.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(events.map((e) => e.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  checked={events.length > 0 && selectedIds.length === events.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th className="p-3">Evento & Categoria</th>
              <th className="p-3">Produtor / Local</th>
              <th className="p-3">Data</th>
              <th className="p-3 text-right">Vendidos / Cap</th>
              <th className="p-3 text-right">Receita Total</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {events.map((evt) => (
              <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(evt.id)}
                    onChange={() => toggleSelect(evt.id)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                </td>

                <td className="p-3">
                  <div className="font-extrabold text-slate-900 text-xs">{evt.nome}</div>
                  <div className="text-[10px] text-purple-700 font-bold">{evt.categoria}</div>
                </td>

                <td className="p-3">
                  <div className="font-semibold text-slate-800">{evt.organizador}</div>
                  <div className="text-[10px] text-slate-400">{evt.venue}</div>
                </td>

                <td className="p-3 font-mono text-[11px] font-bold">
                  {evt.dataInicio}
                </td>

                <td className="p-3 text-right font-mono font-bold text-slate-900">
                  {evt.ingressosVendidos} / {evt.capacidadeTotal}
                </td>

                <td className="p-3 text-right font-mono font-bold text-emerald-700">
                  R$ {evt.receitaAcumulada?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>

                <td className="p-3">
                  <EventStatusBadge status={evt.status} />
                </td>

                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => navigate(`/eventos/${evt.id}`)}
                      title="Ver Detalhes 360"
                      className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/eventos/${evt.id}/editar`)}
                      title="Editar Evento"
                      className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/eventos/${evt.id}/publicacao`)}
                      title="Checklist de Publicação"
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
