import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useWorkforceDashboard } from "../hooks/useWorkforceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

export default function ShiftsPage() {
  const { shifts, loading } = useWorkforceDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando turnos operacionais...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce/schedules" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar às Escalas
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Turnos Operacionais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore a cobertura de cada escala horária alocada em atrações ou eventos temporários.
          </p>
        </div>

        {/* Shifts list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Clock size={18} className="text-purple-755 font-bold" /> Turnos Escalonados
          </h3>

          <div className="divide-y divide-slate-100">
            {shifts.map(sh => (
              <div key={sh.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{sh.title}</strong>
                  <span className="text-[10px] text-slate-505 block">Local: {sh.location} | Início: {sh.startAt} | Fim: {sh.endAt}</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                  <span>Alocação: {sh.allocatedEmployees}/{sh.requiredEmployees}</span>
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${sh.status === "filled" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                    {sh.status}
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
