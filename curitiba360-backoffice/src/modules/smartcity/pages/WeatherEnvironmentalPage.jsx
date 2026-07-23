import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Sun } from "lucide-react";

export default function WeatherEnvironmentalPage() {
  const { weather, loading } = useSmartCityDashboard();

  if (loading || !weather) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados meteorológicos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Estação Meteorológica & Meio Ambiente</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Confira dados climatológicos de pluviosidade, índice UV e alertas de chuva severa para prevenção de inundações.
          </p>
        </div>

        {/* Weather stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Sun size={18} className="text-purple-755 font-bold" /> Clima Curitibano em Tempo Real
          </h3>

          <div className="grid gap-6 md:grid-cols-4 font-sans">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Temperatura</span>
              <strong className="text-2xl text-purple-900 block font-mono">{weather.temperature} °C</strong>
              <span className="text-[9px] text-purple-700 font-bold">Média de Hoje</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Umidade do Ar</span>
              <strong className="text-2xl text-emerald-900 block font-mono">{weather.humidity} %</strong>
              <span className="text-[9px] text-emerald-700 font-bold">Sem Condensação</span>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Chuva Estimada</span>
              <strong className="text-2xl text-blue-900 block font-mono">{weather.rainProbability} %</strong>
              <span className="text-[9px] text-blue-700 font-bold">Baixo Risco</span>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Índice UV</span>
              <strong className="text-2xl text-amber-900 block font-mono">{weather.uvIndex} UV</strong>
              <span className="text-[9px] text-amber-700 font-bold">Moderado</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
