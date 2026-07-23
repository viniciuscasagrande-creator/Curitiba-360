import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, Wifi, Battery, Check } from "lucide-react";

export default function DevicesPage() {
  const { devices, saveDevice, loading } = useOperationsDashboard();
  const [name, setName] = useState("");
  const [type, setType] = useState("turnstile");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveDevice({
      name,
      type
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dispositivos...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Dispositivos & Catracas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore o nível de bateria, sinal de rede Wi-Fi/4G e heartbeats de totens de autoatendimento e catracas ativas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Cpu size={14} className="text-purple-750" /> Novo Dispositivo
            </h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome / Identificação</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Catraca Entrada Norte 04"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Tipo de Dispositivo</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="turnstile">Catraca QR Code</option>
                <option value="kiosk">Totem Autoatendimento</option>
                <option value="pos">Terminal POS Móvel</option>
                <option value="router">Roteador de Rede</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Registrar Dispositivo
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Dispositivo registrado!</span>}
          </form>

          {/* List of devices */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Lista de Dispositivos</h3>
            <div className="divide-y divide-slate-100">
              {devices.map(dev => (
                <div key={dev.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-xs font-sans">{dev.name}</strong>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                        {dev.type}
                      </span>
                    </div>
                    <div className="flex gap-4 text-slate-455">
                      <span className="flex items-center gap-1"><Battery size={12} /> Bateria: {dev.batteryLevel !== null ? dev.batteryLevel + "%" : "Rede Elétrica"}</span>
                      <span className="flex items-center gap-1"><Wifi size={12} /> Sinal: {dev.signalStrength !== null ? dev.signalStrength + "%" : "Cabo"}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${dev.status === "online" ? "bg-emerald-50 text-emerald-700 border-emerald-150" : "bg-red-50 text-red-700 border-red-150"}`}>
                    {dev.status}
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
