import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useFinanceDashboard } from "../hooks/useFinanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingDown, Plus, Check } from "lucide-react";

export default function AccountsPayablePage() {
  const { payables, savePayable, loading } = useFinanceDashboard();
  const [description, setDescription] = useState("");
  const [originalAmount, setOriginalAmount] = useState(1000);
  const [categoryId, setCategoryId] = useState("tecnologia");
  const [dueDate, setDueDate] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !dueDate) return;
    savePayable({
      description,
      originalAmount: Number(originalAmount),
      categoryId,
      dueDate,
      competenceDate: new Date().toISOString().split("T")[0]
    });
    setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando contas a pagar...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Contas a Pagar</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre notas fiscais e configure fluxos de aprovação dupla para pagamentos de alto valor.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <TrendingDown size={14} className="text-purple-750" /> Lançar Despesa
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Descrição da Despesa</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Licenciamento Google Workspace"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Valor Bruto (BRL)</label>
                <input
                  type="number"
                  required
                  value={originalAmount}
                  onChange={(e) => setOriginalAmount(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Categoria</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="tecnologia">Tecnologia & Cloud</option>
                  <option value="marketing">Marketing & Growth</option>
                  <option value="operacao">Operação Local</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Data de Vencimento</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl bg-slate-50"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Solicitar Pagamento
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Despesa registrada!</span>}
          </form>

          {/* List of payables */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Compromissos Financeiros</h3>
            <div className="divide-y divide-slate-100">
              {payables.map(pay => (
                <div key={pay.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-xs font-sans">{pay.description}</strong>
                      <span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                        {pay.categoryId}
                      </span>
                    </div>
                    <div className="flex gap-4 text-slate-455 text-[9px]">
                      <span>Vencimento: {pay.dueDate}</span>
                      <span>•</span>
                      <span>Competência: {pay.competenceDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <strong className="text-sm font-bold text-red-600 font-mono">
                      R$ {pay.originalAmount.toLocaleString()}
                    </strong>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${pay.status === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}>
                      {pay.status}
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
