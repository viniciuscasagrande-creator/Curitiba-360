import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Plus } from "lucide-react";

export default function CompliancePoliciesPage() {
  const { policies, savePolicy, loading } = useLegalDashboard();
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    savePolicy({
      title
    });
    setTitle("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando políticas de compliance...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/legal" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Políticas de Compliance</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre os códigos de conduta dos parceiros, termos de uso ético da plataforma e controle de treinamentos internos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <ShieldCheck size={14} className="text-purple-750" /> Criar Diretriz
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Título do Regulamento</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Política de Brindes e Presentes"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Publicar Diretriz
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Políticas publicadas!</span>}
          </form>

          {/* List of policies */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Diretrizes Publicadas</h3>
            <div className="divide-y divide-slate-100">
              {policies.map(pol => (
                <div key={pol.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{pol.title}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Taxa de Adesão / Treinamentos: {pol.complianceRate}%</span>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${pol.status === "published" ? "bg-emerald-50 text-emerald-700 border-emerald-150" : "bg-blue-50 text-blue-700 border-blue-150"}`}>
                    {pol.status}
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
