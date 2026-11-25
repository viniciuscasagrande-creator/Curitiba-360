import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, History } from "lucide-react";

export default function CorpGovAuditPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Trilha de Auditoria Geral</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Histórico imutável de todas as ações de governança realizadas pelos administradores e conselheiros.
          </p>
        </div>

        {/* Audit trail */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <History size={18} className="text-purple-755 font-bold" /> Log de Transações
          </h3>

          <div className="space-y-4 font-mono text-[10px]">
            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Resolução aprovada: Aprovação do Plano Diretor de TI 2027</strong>
                <span className="text-[10px] text-slate-505 block">Conselho: CONAD | Usuário: Roberto Albuquerque</span>
              </div>
              <span className="text-[10px] text-slate-400">2026-07-23 09:12:00</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Início da auditoria: Auditoria de Controles Financeiros e CAPEX</strong>
                <span className="text-[10px] text-slate-505 block">Dono: Marcos Lima | Status: Em andamento</span>
              </div>
              <span className="text-[10px] text-slate-400">2026-07-22 14:05:00</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
