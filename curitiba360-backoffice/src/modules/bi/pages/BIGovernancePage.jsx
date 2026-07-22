import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { ShieldAlert, Users, History, FileText, CheckCircle2 } from "lucide-react";

export default function BIGovernancePage() {
  const [scdHistory, setScdHistory] = useState([
    {
      id: "scd-1",
      customerName: "Vinicius Casagrande",
      fieldChanged: "cidade",
      oldValue: "Londrina",
      newValue: "Curitiba",
      validFrom: "2026-01-10T08:00:00Z",
      validTo: "2026-07-22T15:00:00Z",
      isCurrent: false
    },
    {
      id: "scd-2",
      customerName: "Vinicius Casagrande",
      fieldChanged: "cidade",
      oldValue: "Curitiba",
      newValue: "Curitiba (VIP Segment)",
      validFrom: "2026-07-22T15:00:00Z",
      validTo: null,
      isCurrent: true
    }
  ]);

  const accessLogs = [
    { id: "log-1", user: "analista.bi@curitiba360.com.br", dataset: "fato_vendas_ingressos", action: "Query execution", time: "2026-07-22T15:30:00Z" },
    { id: "log-2", user: "marketing.director@curitiba360.com.br", dataset: "dim_turistas_segmentacao", action: "Data export (CSV)", time: "2026-07-22T14:45:00Z" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Governança de Dados, SCD & Audit</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerencie histórico de dimensões lentamente mutáveis (SCD Tipo 2), relatórios LGPD e logs de acesso a dados brutos.</p>
        </div>

        {/* Slowly Changing Dimensions SCD Type 2 */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <History className="text-purple-600" size={20} />
            <h3 className="text-lg font-bold text-slate-900 my-0">Controle Histórico SCD Tipo 2</h3>
          </div>
          <p className="text-xs text-slate-500 my-0">
            Abaixo estão os registros históricos de alteração de atributos mantendo a rastreabilidade total (sem sobrescrever dados anteriores):
          </p>

          <div className="overflow-x-auto pt-2">
            <table className="min-w-full text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="pb-3 text-left">Nome Entidade</th>
                  <th className="pb-3 text-left">Atributo</th>
                  <th className="pb-3 text-left">Valor Antigo</th>
                  <th className="pb-3 text-left">Valor Novo</th>
                  <th className="pb-3 text-left">Válido De</th>
                  <th className="pb-3 text-left">Válido Até</th>
                  <th className="pb-3 text-right">Atual?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {scdHistory.map(hist => (
                  <tr key={hist.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 font-sans font-bold text-slate-800">{hist.customerName}</td>
                    <td className="py-4 font-sans text-slate-600">{hist.fieldChanged}</td>
                    <td className="py-4 text-slate-500">{hist.oldValue}</td>
                    <td className="py-4 text-slate-900 font-bold">{hist.newValue}</td>
                    <td className="py-4 text-slate-500">{new Date(hist.validFrom).toLocaleDateString()}</td>
                    <td className="py-4 text-slate-500">
                      {hist.validTo ? new Date(hist.validTo).toLocaleDateString() : "Presente"}
                    </td>
                    <td className="py-4 text-right">
                      {hist.isCurrent ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">SIM</span>
                      ) : (
                        <span className="text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">NÃO</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* GDPR/LGPD Auditing log */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-red-600" size={20} />
              <h3 className="text-lg font-bold text-slate-900 my-0">Log de Auditoria de Acesso</h3>
            </div>
            <div className="space-y-3 font-mono text-[10px] text-slate-600">
              {accessLogs.map(log => (
                <div key={log.id} className="p-3 border border-slate-100 rounded-2xl space-y-1 bg-slate-50">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-700">{log.user}</span>
                    <span className="text-slate-400">{new Date(log.time).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ação: {log.action}</span>
                    <span className="text-purple-600">{log.dataset}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="text-purple-600" size={20} />
                <h3 className="text-lg font-bold text-slate-900 my-0">Conformidade e Minimizações</h3>
              </div>
              <p className="text-xs text-slate-500 my-0">
                O Curitiba 360 utiliza técnicas de hash criptográfico de via única (SHA-256) em colunas identificadoras e mascaramento progressivo em dados de e-mail e CPF para estar 100% em conformidade com as regras da LGPD corporativa.
              </p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="flex-shrink-0" />
              <div className="text-xs">
                <h4 className="font-bold my-0">Certificado LGPD BI</h4>
                <p className="text-[10px] text-emerald-700 mt-0.5">Todas as dimensões Gold contam com pseudo-anonimização ativada.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
