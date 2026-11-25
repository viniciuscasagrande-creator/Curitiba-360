import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { Shield, Eye, Cpu, Zap, Droplet, Trash2, Route, Lightbulb, Sun, Settings, Compass, HelpCircle } from "lucide-react";

export default function SmartCityDashboardPage() {
  const { summary, loading } = useSmartCityDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portal smart city e gêmeo digital...
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
            Painel consolidado de dados urbanos, gêmeos digitais 3D de atrações, monitoramento de sensores IoT e telemetria de utilidades.
          </p>
        </div>

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Qualidade do Ar</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.airQualityIndex} AQI</span>
            <span className="text-[10px] text-emerald-655 font-bold">Classificação: Excelente</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Economia de Energia</span>
            <span className="text-2xl font-extrabold text-slate-900 block">-{summary.energySavingsPct}%</span>
            <span className="text-[10px] text-slate-455 block">Via Dimerização LED Inteligente</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Sensores Online</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeSensors} ativos</span>
            <span className="text-[10px] text-slate-455 block">Eficiência de Rede: {summary.onlineSensorsPct}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Mobilidade & Tráfego</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.trafficCongestionPct}%</span>
            <span className="text-[10px] text-emerald-655 font-bold">Fluxo: Fluido e Sem Alertas</span>
          </div>
        </section>

        {/* Action Panel Shortcuts */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Plataformas Urbanas</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/smartcity/twin" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Eye className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Gêmeo Digital 3D (Digital Twin)</h4>
                <p className="text-xs text-slate-505 mt-1">Modelo virtual interativo 3D com dados IoT projetados sobre o mapa urbano.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/sensors" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Cpu className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Monitoramento de Sensores</h4>
                <p className="text-xs text-slate-505 mt-1">Fila de sensores urbanos de ruído, qualidade do ar e lixeiras eletrônicas.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/energy" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Zap className="text-yellow-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Rede Elétrica & Energia</h4>
                <p className="text-xs text-slate-505 mt-1">Consumo total acumulado de subestações de iluminação e painéis solares.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/water" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Droplet className="text-sky-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Rede Hidráulica & Perdas</h4>
                <p className="text-xs text-slate-505 mt-1">Nível de reservatórios da Sanepar e controle de vazamentos detectados.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/waste" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Trash2 className="text-emerald-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Gestão de Resíduos</h4>
                <p className="text-xs text-slate-505 mt-1">Rotas de caminhões coletores e nível de lixeiras inteligentes nas ruas.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/mobility" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Route className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Mobilidade Urbana & Trânsito</h4>
                <p className="text-xs text-slate-505 mt-1">Fluxo de veículos, tempo de semáforo e estacionamento EstaR digital.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/situation-room" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Shield className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Sala de Situação da Cidade</h4>
                <p className="text-xs text-slate-505 mt-1">Integração mestre com o centro de controle integrado da prefeitura municipal.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/simulations" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Sliders className="text-slate-700" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Simulador de Impacto</h4>
                <p className="text-xs text-slate-505 mt-1">Simulações de cenários de grande fluxo em eventos ou desastres climáticos.</p>
              </div>
            </Link>

            <Link to="/admin/smartcity/settings" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Settings className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Configurações & GIS</h4>
                <p className="text-xs text-slate-505 mt-1">Integrações de dados de satélite e mapas cartográficos externos.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function Sliders({ className, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="2" y1="14" x2="6" y2="14" />
      <line x1="10" y1="8" x2="14" y2="8" />
      <line x1="18" y1="16" x2="22" y2="16" />
    </svg>
  );
}
