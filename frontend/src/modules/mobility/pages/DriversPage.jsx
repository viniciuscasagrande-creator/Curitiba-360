import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Plus } from "lucide-react";

export default function DriversPage() {
  const { drivers, saveDriver, loading } = useMobilityDashboard();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseCategory, setLicenseCategory] = useState("D");
  const [licenseExpiresAt, setLicenseExpiresAt] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !licenseNumber) return;
    saveDriver({
      name,
      document: "000.000.000-00",
      phone,
      licenseNumber,
      licenseCategory,
      licenseExpiresAt
    });
    setName("");
    setPhone("");
    setLicenseNumber("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando motoristas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/mobility" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Cadastro de Condutores (Motoristas)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie o contingente de motoristas vinculados, escala de plantões ativos e conformidade de habilitação CNH (C/D/E).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Users size={14} className="text-purple-755" /> Credenciar Condutor
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João da Silva"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Telefone de Contato</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: (41) 99999-8888"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Nº CNH</label>
                <input
                  type="text"
                  required
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Categoria CNH</label>
                <select value={licenseCategory} onChange={(e) => setLicenseCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="C">C</option>
                  <option value="D">D (Recomendado)</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Vencimento da CNH</label>
              <input
                type="date"
                required
                value={licenseExpiresAt}
                onChange={(e) => setLicenseExpiresAt(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl bg-slate-50"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Habilitar Motorista
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Motorista cadastrado!</span>}
          </form>

          {/* List of drivers */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Motoristas Registrados</h3>
            <div className="divide-y divide-slate-100">
              {drivers.map(drv => (
                <div key={drv.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{drv.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">CNH: {drv.licenseNumber} ({drv.licenseCategory}) | Telefone: {drv.phone} | Avaliação: {drv.averageRating}★</span>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${drv.status === "driving" ? "bg-purple-50 text-purple-700 border-purple-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                    {drv.status}
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
