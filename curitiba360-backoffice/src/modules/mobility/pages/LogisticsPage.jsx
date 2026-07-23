import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Box } from "lucide-react";

export default function LogisticsPage() {
  const { logisticsOrders, loading } = useMobilityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando ordens logísticas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/mobility" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Logística de Materiais & Eventos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a distribuição física de palcos, cavaletes, grades de proteção e materiais promocionais do Curitiba 360.
          </p>
        </div>

        {/* Logistics list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Box size={18} className="text-purple-755" /> Ordens de Transporte de Materiais
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {logisticsOrders.map(ord => (
              <div key={ord.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 font-sans">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs">{ord.description}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px] font-mono">
                      Carga: {ord.cargoType}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[9px] font-mono">
                    <span>Quantidade: {ord.quantity} unidades</span>
                    <span>•</span>
                    <span>Peso estimado: {ord.weightKg} kg</span>
                    <span>•</span>
                    <span>Prazo Limite: {ord.deliveryDeadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans font-bold">
                  <span className={`text-[8px] px-2 py-0.5 rounded border uppercase ${ord.priority === "high" || ord.priority === "critical" ? "bg-red-50 text-red-700 border-red-100" : "bg-slate-50 text-slate-700 border-slate-100"}`}>
                    Prioridade: {ord.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase font-sans">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
