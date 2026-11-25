import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAIChat } from "../hooks/useAIChat";
import { Sparkles, DollarSign, Megaphone } from "lucide-react";

export default function RecommendationsPage() {
  const { recommendations } = useAIChat();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Sugestões de Preço e Campanhas</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Recomendações geradas por IA para precificação dinâmica e otimização de campanhas de remarketing de carrinho.</p>
        </div>

        {/* Pricing Suggestions */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 text-emerald-700">
            <DollarSign size={18} />
            Precificação Dinâmica
          </h3>
          <div className="mt-4 space-y-4">
            {recommendations?.prices.map((p) => (
              <div key={p.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 my-0">{p.product}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-1">Preço Atual: R$ {p.currentPrice} • Sugerido: R$ {p.suggestedPrice} • Impacto: {p.impact}</p>
                  <p className="text-xs text-slate-606 my-0 mt-1">{p.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campaign Recommendations */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 text-purple-700">
            <Megaphone size={18} />
            Campanhas Recomendadas
          </h3>
          <div className="mt-4 space-y-4">
            {recommendations?.campaigns.map((c) => (
              <div key={c.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 my-0">{c.name}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-1">Canal: {c.channel} • Público: {c.audience} • Benefício: {c.discount}</p>
                  <p className="text-xs text-slate-606 my-0 mt-1">{c.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
