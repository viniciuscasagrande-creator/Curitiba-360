import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

export default function OccupationalHealthPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Saúde Ocupacional & ASOs</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a agenda de exames admissionais, periódicos e demissionais dos colaboradores.
          </p>
        </div>

        {/* Exams list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Heart size={18} className="text-purple-755 font-bold" /> Exames Ocupacionais Realizados
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Exame Admissional (Carlos Roberto)</strong>
                <span className="text-[10px] text-slate-505 block">Realizado em: 2024-03-09 | Validade ASO: 2027-03-09 | Prestador: Clínica São Lucas</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Apto
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
