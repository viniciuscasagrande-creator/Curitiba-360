import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useApiKeys } from "../hooks/useApiKeys";
import { Sparkles, Grid } from "lucide-react";

export default function MarketplacePage() {
  const { marketplaceApps } = useApiKeys();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Marketplace de Aplicativos</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Conecte o Curitiba 360 com ERPs, CRMs, ferramentas de marketing, faturamento fiscal e BI.</p>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          {marketplaceApps.map((app) => (
            <article key={app.id} className="p-6 border border-slate-200 bg-white rounded-3xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
                  {app.category}
                </span>
                <h4 className="text-lg font-bold text-slate-950 mt-3 my-0">{app.name}</h4>
                <p className="text-xs text-slate-606 mt-1 my-0">{app.description}</p>
              </div>
              <div className="mt-5 flex justify-end">
                <span className="text-xs font-bold text-slate-500 uppercase">Instalado</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
