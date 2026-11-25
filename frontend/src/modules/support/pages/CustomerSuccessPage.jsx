import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSupportDashboard } from "../hooks/useSupportDashboard";
import { Heart, AlertTriangle } from "lucide-react";

export default function CustomerSuccessPage() {
  const { healthScores, loading } = useSupportDashboard();

  const onboardingSteps = [
    { label: "1. Cadastro", done: true },
    { label: "2. Integração", done: true },
    { label: "3. Treinamento", done: true },
    { label: "4. Primeiro Produto", done: true },
    { label: "5. Primeira Venda", done: false },
    { label: "6. Operação", done: false }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de Customer Success...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Customer Success (Saúde do Parceiro)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore o nível de engajamento, risco de cancelamento (churn) e etapas do onboarding de novos atrativos turísticos.
          </p>
        </div>

        {/* Health Scores */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-2">
            <Heart size={18} className="text-rose-500" /> Health Score do Portfólio
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {healthScores.map(cs => (
              <div key={cs.customerId} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 first:pt-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-sm">{cs.name}</strong>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${cs.risk === "high" ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                      Risco {cs.risk}
                    </span>
                  </div>
                  <p className="text-slate-550 my-0"><strong>Ação recomendada:</strong> {cs.nextAction}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Health Score</span>
                  <span className={`text-xl font-extrabold block mt-0.5 ${cs.score < 50 ? "text-red-650" : "text-emerald-600"}`}>
                    {cs.score} / 100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Onboarding tracker */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Etapas do Onboarding Padrão</h3>
          <div className="grid gap-4 md:grid-cols-6">
            {onboardingSteps.map((step, idx) => (
              <div key={idx} className={`p-4 border rounded-2xl text-xs space-y-2 font-medium ${step.done ? "bg-emerald-50 border-emerald-150 text-emerald-800" : "bg-slate-50 border-slate-150 text-slate-450"}`}>
                <span className="block">{step.label}</span>
                <span className="text-[9px] font-bold block uppercase">{step.done ? "CONCLUÍDO" : "PENDENTE"}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
