import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

export default function CorpGovCouncilDetailsPage() {
  const { councilId } = useParams();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance/councils" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Conselhos
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Detalhes do Conselho: {councilId}</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Membros ativos, pautas e regimento interno do conselho.
          </p>
        </div>

        {/* Members list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <User size={18} className="text-purple-755 font-bold" /> Membros Titulares
          </h3>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Dr. Roberto Albuquerque</strong>
                <span className="text-[10px] text-slate-505 block">Presidente do Conselho</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Voto ativo</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Dra. Heloísa Vasconcellos</strong>
                <span className="text-[10px] text-slate-505 block">Conselheira Independente</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Voto ativo</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
