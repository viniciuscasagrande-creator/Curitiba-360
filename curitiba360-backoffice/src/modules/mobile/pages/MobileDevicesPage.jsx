import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobileSimulator } from "../hooks/useMobileSimulator";
import { Trash2, Smartphone, ShieldCheck, ShieldAlert } from "lucide-react";

export default function MobileDevicesPage() {
  const { devices, revokeDevice, registerDevice, loading } = useMobileSimulator();
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("android");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await registerDevice(name, platform, "2.4.2");
    setName("");
    alert("Dispositivo operacional autorizado com sucesso!");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Dispositivos Operacionais</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Autorize, monitore e revogue permissões de coletores de ingressos e dispositivos de check-in offline.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          {/* List of active devices */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Coletores e Terminais Ativos</h3>
            <div className="space-y-3">
              {devices.map(dev => (
                <div key={dev.id} className="p-4 border border-slate-200 rounded-2xl bg-white flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-slate-500" size={24} />
                    <div>
                      <h4 className="font-bold text-slate-900 my-0">{dev.name}</h4>
                      <p className="text-xs text-slate-505 my-0 mt-1">Plataforma: {dev.platform.toUpperCase()} • App V: {dev.appVersion} • ID: {dev.deviceIdentifier}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      <ShieldCheck size={12} />
                      Autorizado
                    </span>
                    <button
                      onClick={() => revokeDevice(dev.id)}
                      className="text-red-600 hover:text-red-800 transition p-1 bg-transparent border-none cursor-pointer"
                      title="Revogar Acesso"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Register Form */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-slate-900 my-0">Autorizar Dispositivo</h3>
            <form onSubmit={handleRegister} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nome do Terminal</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Coletor Portaria Principal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Plataforma</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm bg-white"
                >
                  <option value="android">Android (Coletor Robusto)</option>
                  <option value="ios">iOS (iPhone/iPad)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800 transition border-none cursor-pointer"
              >
                Autorizar Terminal
              </button>
            </form>
          </section>
        </section>
      </div>
    </AdminLayout>
  );
}
