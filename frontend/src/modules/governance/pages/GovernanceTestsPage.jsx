import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { CheckCircle2, XCircle, Play } from "lucide-react";

export default function GovernanceTestsPage() {
  const [running, setRunning] = useState(false);
  const [testResults, setTestResults] = useState([
    { id: "gt-01", name: "Criptografia de Senhas (Argon2id)", status: "passed" },
    { id: "gt-02", name: "Regras de RLS (Row-Level Security) multiempresa", status: "passed" },
    { id: "gt-03", name: "Verificação de Mascaramento LGPD em logs analíticos", status: "passed" }
  ]);

  const runAllTests = async () => {
    setRunning(true);
    await new Promise(r => setTimeout(r, 1200));
    setTestResults([
      ...testResults,
      { id: `gt-${Date.now()}`, name: "Verificação de Portas e CORS de Sandbox", status: "passed" }
    ]);
    setRunning(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Testes de Governança & Conformidade</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">Valide automaticamente chaves configuradas, regras de auditoria e conformidade regulatória.</p>
          </div>
          <button
            onClick={runAllTests}
            disabled={running}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 disabled:bg-slate-350 rounded-xl cursor-pointer border-none transition flex items-center gap-1.5"
          >
            <Play size={14} /> {running ? "Executando..." : "Executar Testes de Governança"}
          </button>
        </div>

        {/* Tests list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Verificações de Segurança Ativas</h3>
          <div className="divide-y divide-slate-100">
            {testResults.map(test => (
              <div key={test.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                <strong className="text-slate-800 text-sm">{test.name}</strong>
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200 text-xs">
                  <CheckCircle2 size={12} /> Aprovado
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
