import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function GovTransparencyPage() {
  const transparencyLogs = [
    { type: "receita", description: "Arrecadação de ISSQN - Setor de Serviços", value: 12450000, date: "2026-07-23" },
    { type: "despesa", description: "Repasse de subsídio de Transporte Público", value: 4500000, date: "2026-07-22" },
    { type: "despesa", description: "Pagamento de Folha de Servidores Ativos", value: 23100000, date: "2026-07-20" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Portal da Transparência</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhamento fiscal detalhado das receitas correntes, repasses constitucionais e despesas públicas de Curitiba.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] text-emerald-600 font-mono uppercase tracking-wider block font-bold">Total Receitas (Mês)</span>
            <strong className="text-2xl font-bold text-emerald-950 font-mono block">R$ 54.890.000,00</strong>
          </div>
          <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] text-rose-600 font-mono uppercase tracking-wider block font-bold">Total Despesas (Mês)</span>
            <strong className="text-2xl font-bold text-rose-950 font-mono block">R$ 41.220.000,00</strong>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 my-0">Transações Recentes</h3>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {transparencyLogs.map((log, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${
                      log.type === "receita" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                    }`}>
                      {log.type === "receita" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">{log.description}</strong>
                      <span className="text-[9px] text-slate-400 font-mono">{log.date}</span>
                    </div>
                  </div>
                  <strong className={`text-xs font-bold font-mono ${
                    log.type === "receita" ? "text-emerald-700" : "text-rose-700"
                  }`}>
                    {log.type === "receita" ? "+" : "-"} R$ {log.value.toLocaleString("pt-BR")}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
