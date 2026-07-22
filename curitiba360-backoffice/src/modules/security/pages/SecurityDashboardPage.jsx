import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSecurityDashboard } from "../hooks/useSecurityDashboard";
import { Shield, Key, AlertTriangle, Fingerprint, Eye, FileLock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function SecurityDashboardPage() {
  const { summary, loading } = useSecurityDashboard();

  if (loading || !summary) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white flex flex-col justify-center items-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Central de Segurança...</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Central de Segurança & Compliance</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore riscos, configure MFA, valide incidentes, audite acessos e esteja em conformidade com as normas LGPD e PCI-DSS.</p>
        </div>

        {/* Security Score & Quick Telemetry */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-6 border border-slate-200 rounded-3xl bg-slate-900 text-white shadow-md space-y-2 col-span-2 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] text-purple-300 font-bold block uppercase tracking-wider">Segurança Global</span>
              <h2 className="text-4xl font-extrabold my-0">{summary.securityScore}%</h2>
              <span className="text-xs text-slate-400 block mt-1">Conformidade geral com PCI-DSS e boas práticas OWASP.</span>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-purple-500 border-r-transparent flex items-center justify-center font-bold text-sm text-purple-300">
              Grade A
            </div>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">MFA Habilitado</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeMfaUsers}</span>
            <span className="text-[10px] text-emerald-600 font-medium block">Políticas de senha ativas</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">Ameaças Bloqueadas</span>
            <span className="text-2xl font-extrabold text-red-600 block">{summary.fraudAttemptsBlocked}</span>
            <span className="text-[10px] text-slate-400 block">Últimos 30 dias (Bots e fraudes)</span>
          </div>
        </section>

        {/* Modules navigation grid */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Gestão e Controles de Segurança</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/security/risks" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <AlertTriangle className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Gestão de Riscos & Vulnerabilidades</h4>
                <p className="text-xs text-slate-500 mt-1">Monitore dependências de software e configurações de portas/CORS.</p>
              </div>
            </Link>

            <Link to="/security/mfa" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Fingerprint className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Autenticação MFA & Sessões</h4>
                <p className="text-xs text-slate-500 mt-1">Force autenticação por múltiplos fatores e gerencie sessões e dispositivos ativos.</p>
              </div>
            </Link>

            <Link to="/security/fraud" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Shield className="text-red-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Prevenção a Fraude & Bots</h4>
                <p className="text-xs text-slate-500 mt-1">Monitore scores de risco transacionais, análises de dispositivos e bots nos checkouts.</p>
              </div>
            </Link>

            <Link to="/security/lgpd" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <FileLock className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">LGPD & Consentimentos</h4>
                <p className="text-xs text-slate-500 mt-1">Exporte dados, controle consentimentos e audite exclusões e requisições do titular.</p>
              </div>
            </Link>

            <Link to="/security/incidents" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Users className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Resposta a Incidentes</h4>
                <p className="text-xs text-slate-500 mt-1">Defina planos de emergência, isole vazamento de chaves e responda a ataques.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
