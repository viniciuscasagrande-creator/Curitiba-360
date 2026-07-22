import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOrganizations } from "../hooks/useOrganizations";

export default function PlansPage() {
  const { activeOrg, upgradePlan, loading } = useOrganizations();

  const handleUpgrade = async (plan) => {
    if (!activeOrg) return;
    await upgradePlan(activeOrg.id, plan);
    alert(`Assinatura alterada para o plano ${plan.toUpperCase()}!`);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  const plans = [
    { id: "starter", name: "Starter", price: "R$ 99/mês", desc: "Perfeito para produtores locais iniciantes." },
    { id: "professional", name: "Professional", price: "R$ 299/mês", desc: "Para empresas em crescimento constante." },
    { id: "white_label", name: "White Label / Enterprise", price: "Personalizado", desc: "Operação completa sob sua própria marca com domínios ilimitados." }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Planos e Assinaturas</h1>
        <section className="grid gap-6 md:grid-cols-3">
          {plans.map(p => (
            <article key={p.id} className={`p-6 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col justify-between h-80 ${activeOrg?.plan === p.id ? 'border-emerald-600 ring-2 ring-emerald-500/20' : ''}`}>
              <div>
                <h4 className="text-lg font-bold text-slate-900 my-0">{p.name}</h4>
                <p className="text-sm font-semibold text-emerald-700 mt-2">{p.price}</p>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">{p.desc}</p>
              </div>
              <button
                onClick={() => handleUpgrade(p.id)}
                disabled={activeOrg?.plan === p.id}
                className={`w-full h-10 rounded-xl font-bold text-sm transition border-none cursor-pointer ${activeOrg?.plan === p.id ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}
              >
                {activeOrg?.plan === p.id ? "Plano Ativo" : "Alterar Plano"}
              </button>
            </article>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
