import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";

export default function CommunitiesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Comunidade & Dicas de Roteiros</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Modere as publicações, roteiros compartilhados e dicas postadas na comunidade do aplicativo Curitiba 360.
          </p>
        </div>

        {/* Communities posts */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <MessageSquare size={18} className="text-purple-755" /> Mural de Publicações
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">"Meu roteiro de 2 dias em Curitiba usando a Linha Turismo!"</strong>
                <span className="text-[10px] text-slate-505 block">Roteiros Compartilhados • Autor: Vinicius Casagrande • Curtidas: 142</span>
              </div>
              <button className="bg-red-50 text-red-700 hover:bg-red-100 font-bold px-2 py-1 rounded border border-red-100 cursor-pointer text-[9px] font-sans">
                Remover Post
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
