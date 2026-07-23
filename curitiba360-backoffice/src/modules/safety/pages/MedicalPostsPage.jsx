import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Crosshair } from "lucide-react";

export default function MedicalPostsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/admin/safety/medical-occurrences" className="text-purple-750 font-bold">Fila de Atendimentos</Link>
            <Link to="/admin/safety/ambulances" className="text-purple-755 font-bold">Ambulâncias</Link>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Postos Médicos Operacionais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe leitos livres, suprimentos farmacêuticos e equipes de enfermagem ativas em cada setor.
          </p>
        </div>

        {/* Medical posts list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Crosshair size={18} className="text-purple-755 font-bold" /> Postos Ativos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Posto Médico Central (Apoio Palco)</strong>
                <span className="text-[10px] text-slate-505 block">Leitos Totais: 8 | Leitos Livres: 6 | Profissionais: Dr. Marcelo (CRM-9081), Enf. Roberta</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Normal
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
