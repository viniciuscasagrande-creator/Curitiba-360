import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";
import { Link } from "react-router-dom";
import { Search, CheckCircle2 } from "lucide-react";

export default function MarketplaceCatalogPage() {
  const { data, loading } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { key: "all", label: "Todas" },
    { key: "payments", label: "Pagamentos / PMS" },
    { key: "widgets", label: "Widgets" },
    { key: "ai", label: "Inteligência Artificial" },
    { key: "reports", label: "Relatórios" },
    { key: "erp", label: "ERP" },
    { key: "communication", label: "Comunicação" }
  ];

  if (loading || !data || !data.featuredExtensions) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando catálogo de extensões...
        </div>
      </AdminLayout>
    );
  }

  const filtered = data.featuredExtensions.filter(ext => {
    const matchesSearch = ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ext.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || ext.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Catálogo de Extensões</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Encontre plugins e integrações oficiais de terceiros homologados pelo comitê técnico do Curitiba 360.
          </p>
        </div>

        {/* Filter bar */}
        <section className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-xs">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`h-8 px-3 font-bold rounded-xl cursor-pointer transition border ${selectedCategory === cat.key ? "bg-purple-700 text-white border-purple-700" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Buscar extensões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 pl-8 pr-3 border border-slate-200 rounded-xl text-xs"
            />
            <Search className="absolute left-2.5 top-2 text-slate-400" size={14} />
          </div>
        </section>

        {/* Extensions grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {filtered.map(ext => (
            <Link
              key={ext.id}
              to={`/admin/marketplace/extensoes/${ext.id}`}
              className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-350 transition flex flex-col justify-between space-y-4 text-slate-800 hover:no-underline"
            >
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
                    {ext.type}
                  </span>
                  {ext.verified && (
                    <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 size={10} /> Homologado
                    </span>
                  )}
                </div>
                <strong className="text-slate-900 text-base block">{ext.name}</strong>
                <p className="text-slate-600 my-0 leading-relaxed">{ext.shortDescription}</p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-50 pt-3 text-xs">
                <span className="text-slate-400 font-semibold">{ext.installations || 0} Instalações</span>
                <span className="text-purple-700 font-extrabold">
                  {ext.price === 0 || ext.price === null ? "Gratuito" : `R$ ${ext.price.toFixed(2)}/mês`}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
