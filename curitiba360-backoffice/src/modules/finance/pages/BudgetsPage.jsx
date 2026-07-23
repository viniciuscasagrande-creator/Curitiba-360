import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useFinanceDashboard } from "../hooks/useFinanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Clipboard, Plus } from "lucide-react";

export default function BudgetsPage() {
  const { budgets, costCenters, saveBudget, loading } = useFinanceDashboard();
  const [name, setName] = useState("");
  const [budgetedAmount, setBudgetedAmount] = useState(10000);
  const [costCenterId, setCostCenterId] = useState("cc-tech");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveBudget({
      name,
      year: 2026,
      costCenterId,
      budgetedAmount: Number(budgetedAmount)
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando orçamentos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/finance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Orçamentos & Centros de Custo</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o planejado x realizado de gastos de TI, marketing e despesas administrativas da prefeitura.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Clipboard size={14} className="text-purple-750" /> Parametrizar Verba
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Identificação / Finalidade</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Campanha Publicitária de Verão"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Verba Limite (BRL)</label>
                <input
                  type="number"
                  required
                  value={budgetedAmount}
                  onChange={(e) => setBudgetedAmount(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Centro de Custo</label>
                <select value={costCenterId} onChange={(e) => setCostCenterId(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  {costCenters.map(cc => (
                    <option key={cc.id} value={cc.id}>{cc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Bloquear Orçamento
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Verba registrada!</span>}
          </form>

          {/* List of budgets */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Verbas Alocadas</h3>
            <div className="divide-y divide-slate-100">
              {budgets.map(bud => (
                <div key={bud.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-xs font-sans">{bud.name}</strong>
                      <span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                        CC: {bud.costCenterId}
                      </span>
                    </div>
                    <div className="flex gap-4 text-slate-455 text-[9px] font-mono">
                      <span>Empenhado: R$ {bud.committedAmount.toLocaleString()}</span>
                      <span>•</span>
                      <span>Realizado: R$ {bud.realizedAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <strong className="text-sm font-bold text-slate-700 font-mono">
                      R$ {bud.budgetedAmount.toLocaleString()}
                    </strong>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${bud.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-blue-50 text-blue-700 border-blue-150"}`}>
                      {bud.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
