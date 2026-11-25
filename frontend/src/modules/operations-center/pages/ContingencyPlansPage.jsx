import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, WifiOff, Plus } from "lucide-react";

export default function ContingencyPlansPage() {
  const { contingencyPlans, saveContingencyPlan, loading } = useOperationsDashboard();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return;
    saveContingencyPlan({
      name,
      description
    });
    setName("");
    setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando planos de contingência...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/operations" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Centro
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planos de Contingência</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Configure regras de fallback estruturadas para indisponibilidade de internet, queda de gateway de pagamentos ou superlotação.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <WifiOff size={14} className="text-purple-700" /> Registrar Procedimento
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome do Plano</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Operação offline de bilheteria"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Gatilhos & Condições</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Disparo automático ao registrar 5 minutos sem heartbeat..."
                className="p-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Playbook
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Plano cadastrado!</span>}
          </form>

          {/* List of plans */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Playbooks Aprovados</h3>
            <div className="divide-y divide-slate-100">
              {contingencyPlans.map(pl => (
                <div key={pl.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{pl.name}</strong>
                    <span className="text-[10px] text-slate-400 block">{pl.description}</span>
                  </div>

                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase shrink-0">
                    {pl.status}
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
