import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { Shield, ShieldAlert, Award, FileCheck, Layers, Users, ShieldX, Bell, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function GovernanceDashboardPage() {
  const { kpis, alerts } = INITIAL_GOVERNANCE_DASHBOARD_MOCK;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Painel de Controle de Governança</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">Acompanhe métricas de conformidade com políticas corporativas, incidentes de disponibilidade e auditorias ativas.</p>
        </div>

        {/* Dashboard Grid KPIs */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Serviços Críticos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{kpis.criticalServices}</span>
            <span className="text-[10px] text-emerald-600 block">Monitoramento de SLOs ativo</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Riscos Críticos</span>
            <span className="text-2xl font-extrabold text-rose-600 block">{kpis.criticalRisks}</span>
            <span className="text-[10px] text-slate-400 block">Ações mitigadoras atribuídas</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Backups Executados</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{kpis.backupsExecuted}</span>
            <span className="text-[10px] text-red-500 font-semibold block">{kpis.backupsFailed} Falhas</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">RTO / RPO Médio</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{kpis.avgRtoMinutes}m / {kpis.avgRpoMinutes}m</span>
            <span className="text-[10px] text-slate-400 block">Meta: 15m / 5m</span>
          </div>
        </section>

        {/* Governance Alerts Feed */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="text-slate-500" size={18} />
            <h3 className="text-lg font-bold text-slate-900 my-0">Alertas Ativos de Governança</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {alerts.map(alert => (
              <div key={alert.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 text-xs">
                <AlertTriangle size={16} className={alert.severity === 'critical' ? 'text-red-500 mt-0.5' : 'text-amber-500 mt-0.5'} />
                <div className="space-y-0.5">
                  <p className="text-slate-800 font-medium my-0">{alert.message}</p>
                  <span className="text-[10px] text-slate-400">{new Date(alert.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shortcuts Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Gestão e Controles de Governança</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/governance/policies" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Award className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Gestão de Políticas</h4>
                <p className="text-xs text-slate-500 mt-1">Desenvolvimento seguro, controle de acesso e políticas corporativas.</p>
              </div>
            </Link>

            <Link to="/governance/assets" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Layers className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Inventário de Ativos</h4>
                <p className="text-xs text-slate-505 mt-1">Classifique bases de dados, cloud functions e APIs por nível de criticidade.</p>
              </div>
            </Link>

            <Link to="/governance/risks" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShieldAlert className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Matriz de Riscos</h4>
                <p className="text-xs text-slate-505 mt-1">Avaliação de impacto de fornecedores e controle de mitigação de falhas.</p>
              </div>
            </Link>

            <Link to="/governance/suppliers" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Users className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Gestão de Fornecedores</h4>
                <p className="text-xs text-slate-505 mt-1">Controle de criticidade de parceiros de infraestrutura e gateway.</p>
              </div>
            </Link>

            <Link to="/governance/audits" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <FileCheck className="text-indigo-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Auditorias & Conformidade</h4>
                <p className="text-xs text-slate-505 mt-1">Logs de auditoria e revisão contínua de controles regulatórios ISO/PCI.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
