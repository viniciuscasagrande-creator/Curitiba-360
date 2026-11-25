import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Plus } from "lucide-react";

export default function RoutesPage() {
  const { routes, saveRoute, loading } = useMobilityDashboard();
  const [name, setName] = useState("");
  const [transportType, setTransportType] = useState("airport_transfer");
  const [estimatedDistanceKm, setEstimatedDistanceKm] = useState(15);
  const [estimatedDurationMinutes, setEstimatedDurationMinutes] = useState(30);
  const [basePrice, setBasePrice] = useState(10);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveRoute({
      name,
      transportType,
      estimatedDistanceKm: Number(estimatedDistanceKm),
      estimatedDurationMinutes: Number(estimatedDurationMinutes),
      basePrice: Number(basePrice)
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando rotas...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Rotas & Itinerários</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre rotas municipais de ônibus, transfers de aeroporto e shuttles circulares para eventos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <MapPin size={14} className="text-purple-750" /> Criar Novo Trajeto
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome da Rota</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Hotel Bourbon → Opera de Arame"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Tipo de Transporte</label>
              <select value={transportType} onChange={(e) => setTransportType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="airport_transfer">Aeroporto Transfer</option>
                <option value="hotel_transfer">Hotel Transfer</option>
                <option value="event_shuttle">Shuttle de Evento</option>
                <option value="tour_bus">Ônibus Turístico DD</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Distância (KM)</label>
                <input
                  type="number"
                  required
                  value={estimatedDistanceKm}
                  onChange={(e) => setEstimatedDistanceKm(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Duração (Min)</label>
                <input
                  type="number"
                  required
                  value={estimatedDurationMinutes}
                  onChange={(e) => setEstimatedDurationMinutes(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Tarifa Base (BRL)</label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Publicar Novo Itinerário
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Itinerário cadastrado!</span>}
          </form>

          {/* List of routes */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Linhas Habilitadas</h3>
            <div className="divide-y divide-slate-100">
              {routes.map(rt => (
                <div key={rt.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{rt.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Tipo: {rt.transportType} | Distância: {rt.estimatedDistanceKm} km | Preço: R$ {rt.basePrice}</span>
                  </div>

                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase shrink-0">
                    {rt.status}
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
