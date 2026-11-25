import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { Link } from "react-router-dom";
import { FileText, ShieldAlert, CheckCircle, Scale, FileSignature, AlertCircle, BarChart2, ShieldCheck, Users } from "lucide-react";

export default function LegalDashboardPage() {
  const { summary, loading } = useLegalDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando governança jurídica...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão Jurídica & Compliance</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Orquestração de contratos digitais, assinaturas certificadas ICP-Brasil, governança de dados (LGPD) e controle de contenciosos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-450 block font-bold uppercase">Índice Compliance:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              {summary.complianceScore}%
            </span>
          </div>
        </div>

        {/* Warning card for expiring contracts */}
        {summary.expiringContracts > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-150 rounded-2xl flex items-start gap-2.5 text-xs text-amber-850">
            <AlertCircle className="shrink-0 text-amber-600 mt-0.5" size={16} />
            <div>
              <strong className="block text-slate-900 font-bold">Vencimento de Contratos Importantes</strong>
              <span className="text-[11px] text-slate-600">{summary.expiringContracts} contratos estão a menos de 30 dias de expirar a vigência.</span>
            </div>
          </div>
        )}

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Contratos Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeContracts} Vigentes</span>
            <span className="text-[10px] text-red-600 block">{summary.expiredContracts} contratos vencidos</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Aprovação & Assinatura</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.pendingSignatures} Pendentes</span>
            <span className="text-[10px] text-slate-455 block">Tempo médio de aprovação: {summary.averageApprovalDays} dias</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Processos Cíveis/Trab.</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeProcesses} Ativos</span>
            <span className="text-[10px] text-slate-455 block">Auditoria externa e escritórios parceiros</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Consentimentos LGPD</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeConsents.toLocaleString()} Clientes</span>
            <span className="text-[10px] text-emerald-650 font-bold block">Opt-ins ativos no CMS</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painel de Controles Legais</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/legal/contracts" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <FileText className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Contratos & Aditivos</h4>
                <p className="text-xs text-slate-505 mt-1">Crie termos comerciais, associe parceiros e configure prazos de vigência.</p>
              </div>
            </Link>

            <Link to="/admin/legal/templates" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <FileSignature className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Biblioteca de Templates</h4>
                <p className="text-xs text-slate-505 mt-1">Padronize NDAs, contratos de patrocínios e termos de cancelamento.</p>
              </div>
            </Link>

            <Link to="/admin/legal/policies" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShieldCheck className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Políticas & Compliance</h4>
                <p className="text-xs text-slate-505 mt-1">Publique códigos de conduta corporativos e termos de uso do portal.</p>
              </div>
            </Link>

            <Link to="/admin/legal/lgpd" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Users className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Privacidade & LGPD</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie solicitações de titulares, bases legais de dados e logs de opt-out.</p>
              </div>
            </Link>

            <Link to="/admin/legal/processes" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Scale className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Processos Judiciais</h4>
                <p className="text-xs text-slate-505 mt-1">Monitore andamentos processuais, custos jurídicos e honorários de escritórios.</p>
              </div>
            </Link>

            <Link to="/admin/legal/risks" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShieldAlert className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Matriz de Riscos</h4>
                <p className="text-xs text-slate-505 mt-1">Preveja vulnerabilidades regulatórias e configure ações de mitigação.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
