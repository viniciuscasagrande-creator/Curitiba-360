import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, UserCheck, ShoppingCart } from "lucide-react";

export default function LiveOperationsPage() {
  const { summary, events, loading } = useOperationsDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando fluxo ao vivo...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/operations" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Centro
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fluxo de Vendas & Acessos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o volume de ingressos validados e transações financeiras por minuto nos portões de acesso do circuito.
          </p>
        </div>

        {/* Live Counters */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-3">
            <strong className="text-slate-900 text-sm flex items-center gap-1">
              <UserCheck size={16} className="text-emerald-700" /> Acessos (Catracas)
            </strong>
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-slate-900 block">{summary.checkinsLast15Minutes}</span>
              <span className="text-[10px] text-slate-455 block">Check-ins validados nos últimos 15 minutos</span>
            </div>
          </div>

          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-3">
            <strong className="text-slate-900 text-sm flex items-center gap-1">
              <ShoppingCart size={16} className="text-purple-700" /> Vendas Recentes
            </strong>
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-slate-900 block">{summary.salesLast15Minutes}</span>
              <span className="text-[10px] text-slate-455 block">Pedidos aprovados nos últimos 15 minutos</span>
            </div>
          </div>
        </section>

        {/* Live events table monitor */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Monitor de Eventos Ativos</h3>
          <div className="divide-y divide-slate-100">
            {events.map(ev => (
              <div key={ev.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-sm">{ev.name}</strong>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold uppercase px-2 py-0.5 rounded">
                      {ev.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[10px] font-mono">
                    <span>Vendidos: {ev.soldTickets.toLocaleString()}</span>
                    <span>•</span>
                    <span>Check-ins: {ev.checkedInTickets.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-right">
                  <strong className="text-slate-900 text-sm block">
                    {Math.round((ev.checkedInTickets / ev.soldTickets) * 100)}% Presença
                  </strong>
                  <span className="text-[10px] text-slate-450 block">Fila estimada: {ev.averageQueueMinutes} min</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
