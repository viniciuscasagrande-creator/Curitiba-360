import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export default function CorpGovSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações de Governança</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ajuste de permissões de acesso, templates de atas e configurações do PMO corporativo.
          </p>
        </div>

        {/* Settings options */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Settings size={18} className="text-purple-755 font-bold" /> Parâmetros de Configuração
          </h3>

          <div className="space-y-4 font-sans text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Assinatura Eletrônica Obrigatória</strong>
                <span className="text-[10px] text-slate-505 block">Exigir MFA para aprovação de resoluções de conselhos</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Quorum de Votação Mínimo</strong>
                <span className="text-[10px] text-slate-505 block">Definir quorum padrão de 2/3 para decisões administrativas</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
