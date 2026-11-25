import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useRoadmap } from "../hooks/useRoadmap";
import { TrendingUp, AlertTriangle } from "lucide-react";

export default function ScenariosPage() {
  const { scenarios, loading } = useRoadmap();

  const mockScenarios = [
    {
      id: "scen-01",
      name: "Cenário Conservador",
      description: "Foco absoluto na consolidação local de Curitiba com baixo investimento em mídia.",
      projectedRevenue: 6000000,
      projectedInvestment: 1500000,
      projectedUsers: 60000,
      projectedPartners: 150,
      projectedCities: 1,
      riskLevel: "low"
    },
    {
      id: "scen-02",
      name: "Cenário Base (Referência)",
      description: "Expansão regional planejada com implantação gradual do White Label.",
      projectedRevenue: 12400000,
      projectedInvestment: 4800000,
      projectedUsers: 150000,
      projectedPartners: 450,
      projectedCities: 4,
      riskLevel: "medium"
    },
    {
      id: "scen-03",
      name: "Cenário Acelerado",
      description: "Nacionalização agressiva acelerada com captação B2B de naming rights.",
      projectedRevenue: 32000000,
      projectedInvestment: 12000000,
      projectedUsers: 500000,
      projectedPartners: 1200,
      projectedCities: 15,
      riskLevel: "high"
    }
  ];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando cenários estratégicos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Cenários Estratégicos & Projeções</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Compare o impacto de investimento versus retorno projetado nos cenários Conservador, Base e Acelerado.
          </p>
        </div>

        {/* Projections Matrix */}
        <section className="grid gap-6 md:grid-cols-3">
          {mockScenarios.map(sc => (
            <div key={sc.id} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 my-0">{sc.name}</h3>
                <p className="text-xs text-slate-450 mt-1 my-0 leading-relaxed">{sc.description}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Receita Projetada</span>
                  <strong className="text-slate-800">{formatCurrency(sc.projectedRevenue)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Investimento Estimado</span>
                  <strong className="text-slate-800">{formatCurrency(sc.projectedInvestment)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Usuários Ativos (MAU)</span>
                  <strong className="text-slate-800">{sc.projectedUsers.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cidades Abrangidas</span>
                  <strong className="text-slate-800">{sc.projectedCities}</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-50">
                  <span className="text-slate-400">Risco Estratégico</span>
                  <span className={`font-bold uppercase ${sc.riskLevel === "high" ? "text-red-650" : sc.riskLevel === "medium" ? "text-amber-600" : "text-emerald-600"}`}>
                    {sc.riskLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
