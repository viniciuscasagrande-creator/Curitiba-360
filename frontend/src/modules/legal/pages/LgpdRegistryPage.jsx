import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, ShieldAlert, Check } from "lucide-react";

export default function LgpdRegistryPage() {
  const { consents, saveConsent, loading } = useLegalDashboard();
  const [customerId, setCustomerId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || !purpose) return;
    saveConsent({
      customerId,
      purpose
    });
    setCustomerId("");
    setPurpose("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando consentimentos LGPD...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Privacidade & LGPD</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o registro oficial de opt-in/opt-out de usuários e requisições de exclusão de dados pessoais da base de dados.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Users size={14} className="text-purple-700" /> Registrar Opt-in
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">ID do Titular (Cliente)</label>
              <input
                type="text"
                required
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Ex: cust-412"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Finalidade do Consentimento</label>
              <input
                type="text"
                required
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Ex: Enviar cupons por WhatsApp"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Consentimento
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Consentimento gravado!</span>}
          </form>

          {/* List of consents */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Histórico de Opt-ins/Outs</h3>
            <div className="divide-y divide-slate-100">
              {consents.map(cns => (
                <div key={cns.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-xs block font-sans">Titular: {cns.customerId}</strong>
                    <span className="text-slate-500 font-sans block text-[10px]">{cns.purpose}</span>
                    <span className="text-[8px] text-slate-400 block">Autorizado em: {cns.grantedAt} {cns.revokedAt && `| Revogado em: ${cns.revokedAt}`}</span>
                  </div>

                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${cns.status === "granted" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-750 border-red-200"}`}>
                    {cns.status}
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
