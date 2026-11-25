import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSafetyDashboard } from "../hooks/useSafetyDashboard";
import { Link } from "react-router-dom";
import { Shield, AlertOctagon, Activity, Radio, Users, Heart, Phone, Settings, Sliders } from "lucide-react";

export default function SafetyDashboardPage() {
  const { summary, alerts, loading } = useSafetyDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portal de segurança e emergências...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0 flex items-center gap-2">
            <Shield size={28} className="text-purple-755" /> Segurança & Resposta a Emergências
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitoramento de incidentes ativos, gerenciamento de rotas de fuga, postos médicos e ativação de sala de crise.
          </p>
        </div>

        {/* Alerts Warnings */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map(al => (
              <div key={al.id} className={`p-4 rounded-2xl flex items-start gap-2.5 border ${al.severity === "high" ? "bg-red-50 border-red-150 text-red-800" : "bg-amber-50 border-amber-150 text-amber-800"}`}>
                <AlertOctagon className={`shrink-0 mt-0.5 ${al.severity === "high" ? "text-red-650" : "text-amber-600"}`} size={16} />
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
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Score Risco Operacional</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.operationalRiskScore} / 100</span>
            <span className="text-[10px] text-emerald-655 font-bold">Classificação: Saudável</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Incidentes Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeIncidents} Ocorrências</span>
            <span className="text-[10px] text-red-650 font-bold">Críticos: {summary.criticalIncidents}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Pessoas & Lotação</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.currentOccupancy.toLocaleString()} paxs</span>
            <span className="text-[10px] text-slate-455 block">Capacidade total: {summary.occupancyPercentage}% ocupado</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Saúde Ocupacional</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.medicalOccurrencesToday} Atendimentos</span>
            <span className="text-[10px] text-slate-455 block">Ambulâncias livres: {summary.availableAmbulances}</span>
          </div>
        </section>

        {/* Action Panel Shortcuts */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painel Operacional</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/safety/live" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Radio className="text-purple-650 animate-pulse" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Operação ao Vivo (CFTV)</h4>
                <p className="text-xs text-slate-505 mt-1">Câmeras, sensores de movimento e feeds de vídeo ao vivo integrados.</p>
              </div>
            </Link>

            <Link to="/admin/safety/risk-map" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Sliders className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Mapa de Riscos & Evacuação</h4>
                <p className="text-xs text-slate-505 mt-1">Gere planos de contingência, defina pontos de encontro e rotas de fuga.</p>
              </div>
            </Link>

            <Link to="/admin/safety/incidents" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <AlertOctagon className="text-red-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Fila de Ocorrências</h4>
                <p className="text-xs text-slate-505 mt-1">Despache brigadistas, acione policiais e acompanhe o tempo de resposta.</p>
              </div>
            </Link>

            <Link to="/admin/safety/medical-occurrences" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Heart className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Atendimento Médico</h4>
                <p className="text-xs text-slate-505 mt-1">Postos médicos ativos, triagem de pacientes e despacho de ambulâncias.</p>
              </div>
            </Link>

            <Link to="/admin/safety/crisis-room" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Phone className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Sala de Situação / Crise</h4>
                <p className="text-xs text-slate-505 mt-1">Ativação de War Room, log de decisões críticas e contato com autoridades.</p>
              </div>
            </Link>

            <Link to="/admin/safety/settings" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Settings className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Configurações Globais</h4>
                <p className="text-xs text-slate-505 mt-1">SLA de incidentes, credenciamento operacional e auditoria completa.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
