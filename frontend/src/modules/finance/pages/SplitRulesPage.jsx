import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useFinanceDashboard } from "../hooks/useFinanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Percent, Plus } from "lucide-react";

export default function SplitRulesPage() {
  const { splitRules, saveSplitRule, loading } = useFinanceDashboard();
  const [name, setName] = useState("");
  const [referenceType, setReferenceType] = useState("product");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveSplitRule({
      name,
      referenceType,
      validFrom: new Date().toISOString().split("T")[0]
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando regras de split...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Split de Pagamentos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Defina divisões percentuais e tarifas operacionais automáticas por produto, evento ou categoria comercial.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Percent size={14} className="text-purple-750" /> Criar Regra de Split
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome da Regra</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Split Bilheteria Teatro"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Vincular por</label>
              <select value={referenceType} onChange={(e) => setReferenceType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="product">ID do Produto / Ingresso</option>
                <option value="event">Evento Completo</option>
                <option value="partner">Parceiro / Fornecedor</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Regra de Divisão
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Split criado!</span>}
          </form>

          {/* List of rules */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Regras de Split Ativas</h3>
            <div className="divide-y divide-slate-100">
              {splitRules.map(rule => (
                <div key={rule.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{rule.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Associação: {rule.referenceType} | Válido desde: {rule.validFrom}</span>
                  </div>

                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase shrink-0">
                    {rule.status}
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
