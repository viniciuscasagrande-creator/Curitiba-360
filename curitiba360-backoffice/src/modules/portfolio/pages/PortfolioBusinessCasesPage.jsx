import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Plus } from "lucide-react";

export default function PortfolioBusinessCasesPage() {
  const { data, addBusinessCase, loading } = usePartnerDashboard();
  const [title, setTitle] = useState("");
  const [investment, setInvestment] = useState("");
  const [benefit, setBenefit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !investment || !benefit) return;
    addBusinessCase({
      id: "bc-" + Date.now(),
      title,
      investment: parseFloat(investment),
      benefit: parseFloat(benefit),
      roi: parseFloat((benefit / investment).toFixed(1)),
      payback: 24,
      risk: "medium",
      priority: "high",
      status: "approved"
    });
    setTitle("");
    setInvestment("");
    setBenefit("");
  };

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando business cases...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Estudos de Viabilidade & Business Cases</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Analise o retorno sobre o investimento (ROI), payback e riscos antes de autorizar a execução física e orçamentária dos projetos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Business Case */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Plus size={14} className="text-purple-755 font-bold" /> Novo Business Case
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome do Estudo</label>
              <input type="text" placeholder="Ex: Projeto E-Bus Central" value={title} onChange={(e) => setTitle(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Investimento Estimado (R$)</label>
              <input type="number" placeholder="Ex: 500000" value={investment} onChange={(e) => setInvestment(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Retorno Previsto (R$)</label>
              <input type="number" placeholder="Ex: 1500000" value={benefit} onChange={(e) => setBenefit(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Estudo
            </button>
          </form>

          {/* Business cases list */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
              <Briefcase size={18} className="text-purple-755 font-bold" /> Estudos Cadastrados
            </h3>

            <div className="divide-y divide-slate-100 font-mono text-[10px]">
              {data.businessCases.map(bc => (
                <div key={bc.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                  <div>
                    <strong className="text-slate-900 text-xs block">{bc.title}</strong>
                    <span className="text-[10px] text-slate-505 block">
                      Inv: R$ {(bc.investment / 1000).toFixed(0)}k | Retorno: R$ {(bc.benefit / 1000).toFixed(0)}k | ROI: {bc.roi}x
                    </span>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                    {bc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
