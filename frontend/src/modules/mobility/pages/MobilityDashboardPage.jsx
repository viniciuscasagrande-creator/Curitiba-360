import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { MapPin, Navigation, Bus, Users, ShieldAlert, AlertTriangle, ArrowRight, Activity, Clock, Server } from "lucide-react";

export default function MobilityDashboardPage() {
  const { summary, alerts, loading } = useMobilityDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando central de mobilidade...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Mobilidade & Logística Urbana</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Planejamento e rastreamento de shuttles turísticos, frotas, motoristas, vagas de estacionamento e ordens de logística de materiais.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-455 block font-bold uppercase">Pontualidade Média:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              {summary.onTimeRate}%
            </span>
          </div>
        </div>

        {/* Mobility alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map(al => (
              <div key={al.id} className={`p-4 rounded-2xl flex items-start gap-2.5 text-xs border ${al.severity === "high" ? "bg-red-50 border-red-150 text-red-800" : "bg-amber-50 border-amber-150 text-amber-800"}`}>
                <AlertTriangle className={`shrink-0 mt-0.5 ${al.severity === "high" ? "text-red-650" : "text-amber-600"}`} size={16} />
                <div>
                  <strong className="block text-slate-900 font-bold">{al.title}</strong>
                  <span className="text-[11px] text-slate-600">{al.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Viagens Operadas Hoje</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.completedTripsToday + summary.activeTrips} Viagens</span>
            <span className="text-[10px] text-slate-455 block">{summary.activeTrips} veículos em trânsito no mapa</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Ocupação Média dos Shuttles</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.averageOccupancy}%</span>
            <span className="text-[10px] text-emerald-650 font-bold block">Passageiros hoje: {summary.passengersToday.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Frota & Motoristas</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeVehicles} Ativos</span>
            <span className="text-[10px] text-red-600 block">{summary.unavailableVehicles} veículos indisponíveis/manutenção</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Estacionamento Integrado</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.availableParkingSpaces} Vagas</span>
            <span className="text-[10px] text-slate-455 block">Vagas livres para reservas no portal</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 my-0">Controles Logísticos & Operações de Frota</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/mobility/live-map" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Navigation className="text-emerald-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Telemetria & Mapa ao Vivo</h4>
                <p className="text-xs text-slate-505 mt-1">Monitore barramentos GPS, velocidades médias e alertas de desvio de rotas.</p>
              </div>
            </Link>

            <Link to="/admin/mobility/routes" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <MapPin className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Rotas & Paradas</h4>
                <p className="text-xs text-slate-505 mt-1">Configure pontos de embarque cobertos com acessibilidade e coordenadas.</p>
              </div>
            </Link>

            <Link to="/admin/mobility/trips" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Clock className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Viagens Programadas</h4>
                <p className="text-xs text-slate-505 mt-1">Aloque motoristas habilitados (CNH D) e veículos com CRLV em dia.</p>
              </div>
            </Link>

            <Link to="/admin/mobility/fleet" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Bus className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Controle de Frota & Drivers</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe vencimento de seguros, odômetros e avaliações dos condutores.</p>
              </div>
            </Link>

            <Link to="/admin/mobility/logistics" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Server className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Logística de Materiais</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie distribuição de grades de proteção, credenciais e apoios para eventos.</p>
              </div>
            </Link>

            <Link to="/admin/mobility/incidents" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShieldAlert className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Incidentes & Atrasos</h4>
                <p className="text-xs text-slate-505 mt-1">Registre panes mecânicas ou bloqueios de trânsito e acione contingências.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
