import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

export default function TripsPage() {
  const { trips, saveTrip, loading } = useMobilityDashboard();
  const [routeName, setRouteName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [driver, setDriver] = useState("");
  const [scheduledDepartureAt, setScheduledDepartureAt] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!routeName || !scheduledDepartureAt) return;
    saveTrip({
      routeName,
      vehicle,
      driver,
      scheduledDepartureAt,
      estimatedArrivalAt: scheduledDepartureAt,
      maximumCapacity: 16
    });
    setRouteName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando viagens...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Viagens Programadas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Escalone veículos e condutores para horários programados de transfers e shuttles municipais.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Clock size={14} className="text-purple-750" /> Escalar Viagem
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Itinerário / Linha</label>
              <input
                type="text"
                required
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="Ex: Aeroporto → Centro"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Veículo</label>
              <input
                type="text"
                required
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Ex: Van 014"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Motorista</label>
              <input
                type="text"
                required
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                placeholder="Ex: Carlos Henrique"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Horário de Saída</label>
              <input
                type="text"
                required
                value={scheduledDepartureAt}
                onChange={(e) => setScheduledDepartureAt(e.target.value)}
                placeholder="Ex: 16:30"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Escalar Viagem
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Viagem programada!</span>}
          </form>

          {/* List of trips */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Quadro de Horários & Escalas</h3>
            <div className="divide-y divide-slate-100">
              {trips.map(tr => (
                <div key={tr.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-xs font-sans">{tr.routeName}</strong>
                      <span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                        {tr.vehicle}
                      </span>
                    </div>
                    <div className="flex gap-4 text-slate-455 text-[9px] font-sans">
                      <span>Saída: {tr.scheduledDepartureAt}</span>
                      <span>•</span>
                      <span>Condutor: {tr.driver}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-sans font-bold">
                    <span className="text-[10px] text-slate-500">{tr.passengers}/{tr.maximumCapacity} pax</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded border uppercase ${tr.status === "in_progress" ? "bg-purple-50 text-purple-700 border-purple-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                      {tr.status}
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
