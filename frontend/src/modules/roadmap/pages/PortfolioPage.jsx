import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useRoadmap } from "../hooks/useRoadmap";
import { Layers, MapPin, CheckCircle } from "lucide-react";

export default function PortfolioPage() {
  const { expansionCities, loading } = useRoadmap();

  const products = [
    { name: "Marketplace Curitiba 360", type: "Core", status: "Produção" },
    { name: "Aplicativo do Cliente", type: "Mobile", status: "Em Desenvolvimento" },
    { name: "Portal do Parceiro", type: "Web App", status: "Produção" },
    { name: "Curitiba 360 Pass", type: "Assinatura", status: "Planejado (H2)" },
    { name: "Curitiba 360 Empresas", type: "B2B", status: "Planejado (H2)" },
    { name: "Curitiba 360 Destinos", type: "White Label", status: "Pesquisa (H3)" }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portfólio de produtos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Portfólio de Produtos & Expansão</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie a linha de produtos corporativos (Pass, Destinos White Label) e a priorização de novas praças turísticas de atuação.
          </p>
        </div>

        {/* Product Catalog */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-2">
            <Layers size={18} className="text-purple-700" /> Catálogo de Produtos
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((prod, idx) => (
              <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 text-xs space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{prod.type}</span>
                <strong className="text-slate-900 text-sm block">{prod.name}</strong>
                <span className="text-[10px] text-purple-700 font-semibold block">{prod.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Expansion Cities Table */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-2">
            <MapPin size={18} className="text-emerald-600" /> Avaliação de Expansão Territorial
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {expansionCities.map(city => (
              <div key={city.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                <div>
                  <strong className="text-slate-900 text-sm">{city.name} - {city.state}</strong>
                  <span className="text-[10px] text-slate-450 block mt-0.5">Potencial: {city.tourismPotential} | Score Geral: {city.overallScore}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 uppercase">
                  {city.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
