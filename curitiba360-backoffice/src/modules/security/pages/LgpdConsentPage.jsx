import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSecurityDashboard } from "../hooks/useSecurityDashboard";
import { ShieldCheck, FileText, CheckCircle2, UserCheck, ShieldAlert } from "lucide-react";

export default function LgpdConsentPage() {
  const { consents, loading } = useSecurityDashboard();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">LGPD & Gestão de Consentimento</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore logs de consentimento e termos aceitos pelos turistas, e gerencie requisições de exclusão de contas.</p>
        </div>

        {/* Data minimization policies info */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-purple-700">
              <ShieldCheck size={20} />
              <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider">Pseudonimização</h3>
            </div>
            <p className="text-xs text-slate-500 my-0">Todas as consultas e relatórios do BI utilizam identificadores criptográficos em substituição de e-mails/nomes.</p>
          </div>

          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-700">
              <UserCheck size={20} />
              <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider">Portabilidade</h3>
            </div>
            <p className="text-xs text-slate-500 my-0">Turistas podem baixar na hora o espelho completo de seus dados cadastrais e ingressos comprados.</p>
          </div>

          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-red-600">
              <ShieldAlert size={20} />
              <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider">Direito ao Esquecimento</h3>
            </div>
            <p className="text-xs text-slate-505 my-0">Mapeamento de expiração de dados após desativação da conta (prazo fiscal de 5 anos).</p>
          </div>
        </section>

        {/* Consent logs table */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Logs de Consentimentos do Titular</h3>
          {loading ? (
            <div className="text-xs text-slate-400 py-4 text-center">Carregando logs...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold">
                    <th className="pb-3 text-left">Usuário</th>
                    <th className="pb-3 text-left">Tipo Consentimento</th>
                    <th className="pb-3 text-left">Ação</th>
                    <th className="pb-3 text-left">IP Origem</th>
                    <th className="pb-3 text-right">Data/Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {consents.map(consent => (
                    <tr key={consent.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 font-sans font-bold text-slate-800">
                        {consent.userName} <span className="text-slate-400 block font-normal text-[10px]">{consent.email}</span>
                      </td>
                      <td className="py-4 font-sans text-slate-600">{consent.consentType}</td>
                      <td className="py-4">
                        {consent.status === "granted" ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">CONCEDIDO</span>
                        ) : (
                          <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">REVOGADO</span>
                        )}
                      </td>
                      <td className="py-4 text-slate-500">{consent.ip}</td>
                      <td className="py-4 text-right text-slate-500">{new Date(consent.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
