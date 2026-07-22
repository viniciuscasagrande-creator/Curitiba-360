import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { AlertCircle, ShieldAlert, Key, Ban, Terminal, Mail, CheckCircle2 } from "lucide-react";

export default function IncidentResponsePage() {
  const [incidents, setIncidents] = useState([
    {
      id: "inc-101",
      title: "Vazamento suspeito de chave API Sandbox",
      status: "investigating",
      severity: "high",
      detectedAt: new Date().toISOString()
    },
    {
      id: "inc-102",
      title: "Injeção de script repelida no form de cadastro de agências",
      status: "resolved",
      severity: "critical",
      detectedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const handleRotateKeys = () => {
    alert("Iniciando rotação de emergência de credenciais do Firebase Admin SDK...");
  };

  const handleIsolateGateway = () => {
    alert("Portão de isolamento da API Gateway ativado. Todas as requisições não-VIP estão temporariamente sob throttle!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Central de Resposta a Incidentes (IR)</h1>
          <p className="mt-2 text-sm text-slate-650 my-0">Gerencie incidentes cibernéticos detectados pelo NOC e execute ações de contenção imediata (Kill Switch).</p>
        </div>

        {/* Crisis trigger controls (Kill Switches) */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border border-slate-200 rounded-3xl bg-slate-950 text-white space-y-4 shadow-md">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-red-500" size={24} />
              <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider text-red-300">Controles de Crise Cibernética</h3>
            </div>
            <p className="text-xs text-slate-400 my-0">Ações de mitigação de emergência. Apenas DPO e Administradores Globais têm autorização para disparar.</p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleRotateKeys}
                className="h-9 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white cursor-pointer border-none transition flex items-center gap-1.5"
              >
                <Key size={14} /> Rotacionar Chaves API
              </button>
              <button
                onClick={handleIsolateGateway}
                className="h-9 px-4 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-800 text-white cursor-pointer border-none transition flex items-center gap-1.5"
              >
                <Ban size={14} /> Isolar Gateway
              </button>
            </div>
          </div>

          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 my-0 text-sm">Contatos do Comitê de Crise</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-400 font-semibold">Encarregado de Dados (DPO)</span>
                <span className="font-bold text-slate-800">dpo@curitiba360.com.br</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-400 font-semibold">Líder SecOps</span>
                <span className="font-bold text-slate-800">secops@curitiba360.com.br</span>
              </div>
              <div className="flex justify-between text-rose-700 font-semibold">
                <span>Notificação compulsória ANPD</span>
                <span>Faltam 72h para reporte</span>
              </div>
            </div>
          </div>
        </section>

        {/* Active security incidents list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Incidentes em Tratamento</h3>
          <div className="divide-y divide-slate-100">
            {incidents.map(inc => (
              <div key={inc.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-3">
                    <strong className="text-slate-900 text-sm">{inc.title}</strong>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${inc.severity === "critical" ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                      {inc.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 my-0">Detectado em: {new Date(inc.detectedAt).toLocaleString()}</p>
                </div>

                <div>
                  {inc.status === "investigating" ? (
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200 text-xs animate-pulse">
                      <AlertCircle size={12} /> Investigando
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200 text-xs">
                      <CheckCircle2 size={12} /> Resolvido
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
