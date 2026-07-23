import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDeveloperDashboard } from "../hooks/useDeveloperDashboard";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function DeveloperMarketplacePage() {
  const { marketplaceItems, loading } = useDeveloperDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando marketplace de extensões...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Marketplace de Aplicações</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Adicione e gerencie conectores desenvolvidos por parceiros para expandir as capacidades de checkout e gestão do Curitiba 360.
          </p>
        </div>

        {/* Extensions grid list */}
        <section className="grid gap-6 md:grid-cols-2">
          {marketplaceItems.map(item => (
            <div key={item.id} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
                    {item.type}
                  </span>
                  {item.verified && (
                    <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 size={10} /> Verificado
                    </span>
                  )}
                </div>
                <strong className="text-slate-900 text-base block">{item.title}</strong>
                <p className="text-slate-600 my-0 leading-relaxed">{item.description}</p>
                <span className="text-[10px] text-slate-400 block">Autor: {item.author}</span>
              </div>

              <div className="flex justify-between items-center border-t border-slate-50 pt-3 text-xs">
                <span className="text-slate-450">{item.installsCount} Instalações</span>
                <button className="h-8 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Instalar Extensão
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
