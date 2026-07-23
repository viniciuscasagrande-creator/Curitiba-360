import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Map, Eye, Compass, TrendingUp, ShieldAlert, Cpu } from "lucide-react";

export default function GovObservatoryPage() {
  const [selectedObs, setSelectedObs] = useState("turistico");

  const observatories = {
    turistico: {
      name: "Observatório Turístico",
      kpis: [
        { label: "Taxa de Ocupação Hoteleira", value: "78.4%", trend: "+3.2%" },
        { label: "Gasto Médio Diário do Visitante", value: "R$ 385,00", trend: "+5.1%" },
        { label: "Permanência Média", value: "3.4 dias", trend: "+0.2 dias" }
      ]
    },
    economico: {
      name: "Observatório Econômico",
      kpis: [
        { label: "Abertura de Empresas", value: "1.450 / mês", trend: "+12.4%" },
        { label: "Arrecadação de ISSQN", value: "R$ 48.2M", trend: "+8.9%" },
        { label: "Taxa de Desemprego Local", value: "4.8%", trend: "-0.6%" }
      ]
    },
    social: {
      name: "Observatório Social",
      kpis: [
        { label: "Famílias Assistidas (Clube)", value: "12.400", trend: "+2.1%" },
        { label: "Cestas de Alimento Entregues", value: "5.800 / mês", trend: "+4.5%" },
        { label: "Atendimentos CRAS", value: "3.100 / mês", trend: "-1.2%" }
      ]
    },
    ambiental: {
      name: "Observatório Ambiental",
      kpis: [
        { label: "Índice de Qualidade do Ar", value: "Bom (42)", trend: "estável" },
        { label: "Resíduos Coletados", value: "450 t / dia", trend: "+1.2%" },
        { label: "Área Verde por Habitante", value: "64.2 m²", trend: "+0.5 m²" }
      ]
    },
    mobilidade: {
      name: "Observatório de Mobilidade",
      kpis: [
        { label: "Passageiros de Ônibus / Dia", value: "710k", trend: "+4.3%" },
        { label: "Velocidade Média no Centro", value: "22 km/h", trend: "-1.5 km/h" },
        { label: "Utilização de Ciclovias", value: "14.5k viagens / dia", trend: "+18.2%" }
      ]
    },
    seguranca: {
      name: "Observatório de Segurança",
      kpis: [
        { label: "Ocorrências Registradas COI", value: "185 / semana", trend: "-14.2%" },
        { label: "Câmeras Inteligentes Ativas", value: "1.240", trend: "+8.4%" },
        { label: "Tempo Médio de Resposta", value: "6.2 min", trend: "-1.1 min" }
      ]
    }
  };

  const activeObs = observatories[selectedObs];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Observatórios Urbanos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Painéis territoriais e setoriais baseados em sensores IoT, telemetria e cruzamento de dados públicos.
          </p>
        </div>

        {/* Observatory Selector tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(observatories).map(key => (
            <button
              key={key}
              onClick={() => setSelectedObs(key)}
              className={`px-3.5 h-8 text-xs font-bold rounded-xl cursor-pointer border transition ${
                selectedObs === key
                  ? "bg-purple-700 text-white border-purple-700"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {observatories[key].name}
            </button>
          ))}
        </div>

        {/* Selected Observatory KPIs */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-2">
              <Map size={18} className="text-purple-700" />
              {activeObs.name} - Métricas Consolidadas
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono text-purple-700 bg-purple-50">
              Live Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeObs.kpis.map((kpi, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block font-bold">
                  {kpi.label}
                </span>
                <div className="flex justify-between items-baseline">
                  <strong className="text-xl font-bold text-slate-900 font-sans block">{kpi.value}</strong>
                  <span className={`text-[10px] font-bold font-mono ${
                    kpi.trend.startsWith("-") ? "text-rose-600" : "text-emerald-600"
                  }`}>
                    {kpi.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
