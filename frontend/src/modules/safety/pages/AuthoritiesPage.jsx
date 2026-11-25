import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export default function AuthoritiesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/crisis-room" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à Sala de Crise
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Contatos de Autoridades Externas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ficha de acionamento rápido e telefones de plantão da Polícia Militar, Corpo de Bombeiros e Defesa Civil de Curitiba.
          </p>
        </div>

        {/* Authorities list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Users size={18} className="text-purple-755 font-bold" /> Órgãos Públicos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Polícia Militar do Paraná (PMPR - 12º Batalhão)</strong>
                <span className="text-[10px] text-slate-505 block">Contato Direct: (41) 3304-1200 | Responsável: Major Anderson | Acionamento: Emergência de Segurança</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativo
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Defesa Civil de Curitiba</strong>
                <span className="text-[10px] text-slate-505 block">Contato Direct: (41) 3221-2000 | Responsável: Coord. Sandro | Acionamento: Risco Climático/Desastre</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativo
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
