import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, GitFork } from "lucide-react";

export default function AutomationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Réguas & Fluxos de Automação</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Configure gatilhos automatizados para ações de marketing: carrinho abandonado, pós-compra e aniversário.
          </p>
        </div>

        {/* Automations workflow block */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <GitFork size={18} className="text-purple-755" /> Réguas Habilitadas
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Régua de Carrinho Abandonado (WhatsApp + Email)</strong>
                <span className="text-[10px] text-slate-505 block">Disparo automático 1 hora após abandono. Oferece cupom de 5% de desconto.</span>
              </div>
              <div className="flex gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                <span>Execuções: 1.480</span>
                <span>•</span>
                <span>Conversão: 32%</span>
                <span className="text-emerald-700 font-bold">Ativa</span>
              </div>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Régua de Boas-vindas (NPS Inicial)</strong>
                <span className="text-[10px] text-slate-505 block">Disparo 24 horas após criação da conta. Envia e-mail de obrigado.</span>
              </div>
              <div className="flex gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                <span>Execuções: 8.420</span>
                <span>•</span>
                <span>Conversão: 14%</span>
                <span className="text-emerald-700 font-bold">Ativa</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
