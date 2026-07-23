import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { Eye, Cpu, Zap, Droplet, Trash2, Route, Shield, Sun, Settings, Compass, Sliders, BarChart } from "lucide-react";

export default function DigitalTwinDashboardPage() {
  const { summary, loading } = useDigitalTwin();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portal gêmeo digital...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0 flex items-center gap-2">
            <Compass size={28} className="text-purple-755" /> Smart City & Digital Twin
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Representação virtual 3D e telemetria urbana integrada de Curitiba em tempo real.
          </p>
        </div>

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Visitantes em Tempo Real</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.liveVisitors.toLocaleString()} paxs</span>
            <span className="text-[10px] text-emerald-655 font-bold">Ocupação Média: {summary.occupancyRatePct}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Deslocamento Médio</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.avgTransitTimeMinutes} min</span>
            <span className="text-[10px] text-slate-455 block">Vias Urbanas e Canaletas</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Índice Smart City</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.smartCityIndex} / 100</span>
            <span className="text-[10px] text-emerald-655 font-bold">Classificação: Excelente</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Consumo Energético</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.energyConsumptionMwh} MWh</span>
            <span className="text-[10px] text-slate-455 block">Rede Monitorada Copel</span>
          </div>
        </section>

        {/* Shortcuts grid */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Módulos do Digital Twin</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/digital-twin/map" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Eye className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Mapa 3D & GIS</h4>
                <p className="text-xs text-slate-505 mt-1">Navegação geoespacial por camadas cartográficas e heatmaps de fluxo.</p>
              </div>
            </Link>

            <Link to="/admin/digital-twin/city" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Compass className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Gêmeo Digital de Bairros</h4>
                <p className="text-xs text-slate-505 mt-1">Modelagem digital de praças, parques e infraestrutura urbana.</p>
              </div>
            </Link>

            <Link to="/admin/digital-twin/iot" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Cpu className="text-slate-700" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Rede de Sensores IoT</h4>
                <p className="text-xs text-slate-505 mt-1">Controle de semáforos, decibelímetros e câmeras de segurança.</p>
              </div>
            </Link>

            <Link to="/admin/digital-twin/simulations" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Sliders className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Simulações de Impacto</h4>
                <p className="text-xs text-slate-505 mt-1">Estudo de impacto de novos empreendimentos e interdições de vias.</p>
              </div>
            </Link>

            <Link to="/admin/digital-twin/forecast" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <BarChart className="text-emerald-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Predições por IA (Forecast)</h4>
                <p className="text-xs text-slate-505 mt-1">Previsão de trânsito, demanda turística e lotação de setores.</p>
              </div>
            </Link>

            <Link to="/admin/digital-twin/settings" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Settings className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Configurações & Sincronização</h4>
                <p className="text-xs text-slate-505 mt-1">Parâmetros de satélite, conexões GIS e permissões de telemetria.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
