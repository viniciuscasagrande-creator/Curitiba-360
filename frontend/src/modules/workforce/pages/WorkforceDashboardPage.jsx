import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useWorkforceDashboard } from "../hooks/useWorkforceDashboard";
import { Link } from "react-router-dom";
import { Users, AlertTriangle, Briefcase, Calendar, GraduationCap, DollarSign, Activity, FileText } from "lucide-react";

export default function WorkforceDashboardPage() {
  const { summary, alerts, loading } = useWorkforceDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portal de workforce...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Pessoas & Workforce</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Escalas, turnos operacionais, controle de ponto integrado, folha de pagamento, treinamentos e saúde ocupacional.
          </p>
        </div>

        {/* Alerts warnings */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map(al => (
              <div key={al.id} className={`p-4 rounded-2xl flex items-start gap-2.5 border ${al.severity === "high" ? "bg-red-50 border-red-150 text-red-800" : "bg-amber-50 border-amber-150 text-amber-800"}`}>
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
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Colaboradores Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeEmployees.toLocaleString()}</span>
            <span className="text-[10px] text-slate-455 block">Prestadores ativos: {summary.activeContractors}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Escala & Ponto</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.scheduleCoverageRate}% Cobertura</span>
            <span className="text-[10px] text-slate-455 block">Absenteísmo: {summary.absenteeismRate}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Recrutamento</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.openVacancies} Vagas Abertas</span>
            <span className="text-[10px] text-slate-455 block">Candidatos: {summary.candidatesInProcess} em processo</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Capacitação & Clima</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.engagementScore}/100 Clima</span>
            <span className="text-[10px] text-emerald-650 font-bold block">Treinamentos: {summary.pendingTrainings} pendentes</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painel Geral de Ações</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/workforce/employees" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Users className="text-emerald-655" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Cadastro de Colaboradores</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie a ficha única 360º de colaboradores, contratos e aditivos.</p>
              </div>
            </Link>

            <Link to="/admin/workforce/schedules" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Calendar className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Escalas & Turnos</h4>
                <p className="text-xs text-slate-505 mt-1">Planeje horários operacionais de eventos e evite conflitos de jornada.</p>
              </div>
            </Link>

            <Link to="/admin/workforce/recruitment" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Briefcase className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Recrutamento & Seleção</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie vagas abertas, triagem por IA e onboarding de novos talentos.</p>
              </div>
            </Link>

            <Link to="/admin/workforce/payroll" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <DollarSign className="text-indigo-655" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Folha & Benefícios</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe folha de pagamento calculada, encargos e benefícios corporativos.</p>
              </div>
            </Link>

            <Link to="/admin/workforce/trainings" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <GraduationCap className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Desenvolvimento & Metas</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie treinamentos obrigatórios, certificações vigentes e metas de PDIs.</p>
              </div>
            </Link>

            <Link to="/admin/workforce/occupational-health" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Activity className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Saúde Ocupacional & Segurança</h4>
                <p className="text-xs text-slate-505 mt-1">Exames periódicos, atestados médicos de afastamento e controle de entrega de EPIs.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
