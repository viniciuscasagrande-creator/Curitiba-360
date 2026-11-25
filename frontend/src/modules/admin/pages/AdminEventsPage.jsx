import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { ROUTES } from "../../../routes/routePaths";

export function AdminEventsPage() {
  const events = [
    { id: "evt-1", title: "Festival de Teatro de Curitiba", date: "2026-08-15", sales: 1420, capacity: 2000, revenue: 170400 },
    { id: "evt-2", title: "Show Rock no Pedreira", date: "2026-09-02", sales: 8500, capacity: 10000, revenue: 1275000 }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestão de Eventos</h1>
          <p className="text-sm text-gray-400">Gerencie a listagem, vendas e lotes de ingressos de eventos públicos.</p>
        </div>
        <Link
          to={ROUTES.admin.createEvent}
          className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-4 py-2.5 transition flex items-center gap-1.5 shadow-md shadow-red-600/10"
        >
          <Plus size={18} />
          Novo Evento
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#131720]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/40 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <th className="p-4">Evento</th>
              <th className="p-4">Data</th>
              <th className="p-4">Vendas</th>
              <th className="p-4">Receita</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
            {events.map((evt) => (
              <tr key={evt.id} className="hover:bg-gray-900/20 transition">
                <td className="p-4 font-semibold text-white">{evt.title}</td>
                <td className="p-4">{evt.date}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{evt.sales}</span>
                    <span className="text-xs text-gray-500">/ {evt.capacity}</span>
                  </div>
                </td>
                <td className="p-4 text-emerald-500 font-bold">R$ {evt.revenue.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={ROUTES.admin.editEvent(evt.id)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
                      title="Editar evento"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-950/20 hover:text-red-500 transition"
                      title="Excluir evento"
                      onClick={() => alert("Exclusão não implementada no mock.")}
                    >
                      <Trash2 size={16} />
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
export default AdminEventsPage;
