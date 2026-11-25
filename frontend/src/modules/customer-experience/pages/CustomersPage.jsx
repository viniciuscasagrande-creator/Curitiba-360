import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Plus } from "lucide-react";

export default function CustomersPage() {
  const { customers, saveCustomer, loading } = useExperienceDashboard();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredChannel, setPreferredChannel] = useState("whatsapp");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    saveCustomer({
      name,
      email,
      phone,
      preferredChannel
    });
    setName("");
    setEmail("");
    setPhone("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando perfis de visitantes...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Perfil 360º do Visitante</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre novos leads e analise o engajamento e canais preferidos dos turistas integrados à plataforma.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Users size={14} className="text-purple-750" /> Criar Lead / Visitante
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Vinicius Casagrande"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: vinicius@domain.com"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Telefone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: (41) 99999-8888"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Canal Preferencial</label>
              <select value={preferredChannel} onChange={(e) => setPreferredChannel(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="whatsapp">WhatsApp</option>
                <option value="email">E-mail</option>
                <option value="sms">SMS</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Perfil único
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Visitante cadastrado!</span>}
          </form>

          {/* List of customers */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Base de Turistas Unificados</h3>
            <div className="divide-y divide-slate-100">
              {customers.map(cust => (
                <div key={cust.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{cust.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">E-mail: {cust.email} | Canal Preferencial: {cust.preferredChannel} | Engajamento: {cust.engagementScore}/100</span>
                  </div>

                  <span className="text-[9px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-bold uppercase shrink-0">
                    {cust.status}
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
