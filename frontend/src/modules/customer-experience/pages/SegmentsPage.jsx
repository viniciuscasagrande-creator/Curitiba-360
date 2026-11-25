import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export default function SegmentsPage() {
  const { segments, loading } = useExperienceDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando segmentos de público...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Segmentação de Visitantes</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Filtre a base de usuários com regras de recência, frequência e valor monetário (RFM) para campanhas cirúrgicas.
          </p>
        </div>

        {/* Segments list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Users size={18} className="text-purple-755" /> Grupos de Comportamento
          </h3>

          <div className="divide-y divide-slate-100">
            {segments.map(seg => (
              <div key={seg.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 font-sans">
                  <strong className="text-slate-900 text-xs block">{seg.name}</strong>
                  <span className="text-[10px] text-slate-400 block font-mono">Tipo: {seg.type} | Regra: Base comportamental dinâmica</span>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans font-bold font-mono">
                  <span className="text-slate-705 text-sm">{seg.estimatedCustomers.toLocaleString()} paxs</span>
                  <span className="text-[8px] px-2 py-0.5 rounded border border-emerald-100 bg-emerald-50 text-emerald-700 uppercase">
                    {seg.status}
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
