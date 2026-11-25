import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { RefreshCw, CheckCircle, ShieldCheck } from "lucide-react";

export default function RestoreTestsPage() {
  const [tests, setTests] = useState(INITIAL_GOVERNANCE_DASHBOARD_MOCK.restoreTests);
  const [running, setRunning] = useState(false);

  const startRestoreTest = async () => {
    setRunning(true);
    await new Promise(r => setTimeout(r, 1200));
    const newTest = {
      id: `rt-${Date.now()}`,
      backupExecutionId: "be-02",
      assetId: "ast-02",
      environment: "staging",
      finishedAt: new Date().toISOString(),
      expectedRtoMinutes: 30,
      actualRtoMinutes: 14,
      expectedRpoMinutes: 15,
      actualRpoMinutes: 8,
      integrityValidated: true,
      applicationValidated: true,
      status: "succeeded",
      notes: "Teste automatizado executado com sucesso no staging de homologação."
    };
    setTests([newTest, ...tests]);
    setRunning(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Testes de Restauração de Dados</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Realize testes periódicos e automáticos de recuperação para certificar que seus backups estão 100% íntegros e funcionais.</p>
        </div>

        {/* Trigger check */}
        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900 my-0">Simular Restauração Isolada</h3>
              <p className="text-xs text-slate-500 mt-1">Isola um snapshot de produção em um ambiente de sandbox isolado para aferir integridade estrutural.</p>
            </div>
            <button
              onClick={startRestoreTest}
              disabled={running}
              className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 disabled:bg-slate-300 rounded-xl cursor-pointer border-none transition"
            >
              {running ? "Verificando..." : "Simular Teste de Restauração"}
            </button>
          </div>

          {/* Test lists */}
          <div className="divide-y divide-slate-100">
            {tests.map(test => (
              <div key={test.id} className="py-4 first:pt-0 last:pb-0 text-xs space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm">Teste ID: {test.id}</strong>
                    <p className="text-slate-400 text-[10px] mt-0.5">Executado no ambiente: <strong className="text-slate-700 capitalize">{test.environment}</strong></p>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Aprovado (RTO: {test.actualRtoMinutes}m / {test.expectedRtoMinutes}m)
                  </span>
                </div>
                <p className="text-slate-550 my-0 leading-relaxed font-sans">{test.notes}</p>
                <div className="flex gap-4 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><ShieldCheck className="text-emerald-600" size={12} /> Integridade Validada</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="text-emerald-600" size={12} /> Aplicação Validada</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
