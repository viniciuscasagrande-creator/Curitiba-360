import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { Link } from "react-router-dom";
import { Map, AlertTriangle, Play, Users, Cpu, FileText, Activity, ShieldAlert, Wifi, TrendingUp } from "lucide-react";

export default function OperationsDashboardPage() {
  const { summary, alerts, loading } = useOperationsDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando central de operações...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Centro de Operações Inteligente (IOC)</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Monitoramento operacional de vendas ao vivo, check-ins, lotação dos parques, dispositivos offline e tratativa de incidentes críticos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-450 block font-bold uppercase">Status Operação:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              Normal
            </span>
          </div>
        </div>

        {/* Live Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map(al => (
              <div key={al.id} className={`p-4 rounded-2xl flex items-start gap-2.5 text-xs border ${al.severity === "critical" ? "bg-red-50 border-red-150 text-red-800" : "bg-amber-50 border-amber-150 text-amber-800"}`}>
                <AlertTriangle className={`shrink-0 mt-0.5 ${al.severity === "critical" ? "text-red-650" : "text-amber-600"}`} size={16} />
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
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Lotação Geral</span>
            <span className="text-2xl font-extrabold text-slate-900 block">
              {summary.currentOccupancy.toLocaleString()} / {summary.maximumCapacity.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-455 block">Vagas livres: {(summary.maximumCapacity - summary.currentOccupancy).toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Acessos Últimos 15 min</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.checkinsLast15Minutes.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-650 font-bold flex items-center gap-0.5">
              <TrendingUp size={12} /> {summary.salesLast15Minutes} vendas recentes
            </span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Leitores e Dispositivos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.onlineDevices} Online</span>
            <span className="text-[10px] text-red-600 font-bold block">{summary.offlineDevices} offline ou desconectados</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Incidentes Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeIncidents} Ocorrências</span>
            <span className="text-[10px] text-red-650 font-semibold block">{summary.criticalIncidents} crítico (P1/P2)</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 my-0">Comandos Operacionais</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/operations/map" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Map className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Mapa Operacional 3D</h4>
                <p className="text-xs text-slate-505 mt-1">Visualize portões ativos, incidentes geolocalizados e rotas de suporte.</p>
              </div>
            </Link>

            <Link to="/admin/operations/live" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Activity className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Vendas & Acessos ao Vivo</h4>
                <p className="text-xs text-slate-505 mt-1">Monitore fluxo de check-ins por minuto nas catracas do circuito.</p>
              </div>
            </Link>

            <Link to="/admin/operations/devices" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Cpu className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Dispositivos & Catracas</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie heartbeats de leitores QR, impressoras e POS móveis.</p>
              </div>
            </Link>

            <Link to="/admin/operations/incidents" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShieldAlert className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Incidentes (SLA)</h4>
                <p className="text-xs text-slate-505 mt-1">Abra e gerencie ocorrências de infraestrutura, segurança ou checkout.</p>
              </div>
            </Link>

            <Link to="/admin/operations/contingency" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Wifi className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Planos de Contingência</h4>
                <p className="text-xs text-slate-505 mt-1">Instruções de validação offline, falha de energia e salas de crise.</p>
              </div>
            </Link>

            <Link to="/admin/operations/reports" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <FileText className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Relatórios Pós-Operação</h4>
                <p className="text-xs text-slate-505 mt-1">Consolide dados de faturamento, acessos totais e conformidade de SLAs.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
