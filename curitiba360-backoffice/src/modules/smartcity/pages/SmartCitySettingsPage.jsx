import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export default function SmartCitySettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações Smart City & GIS</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ajuste limites de alerta de qualidade do ar, conexões com APIs de mapas de satélite (GIS) e sincronização de dados municipais.
          </p>
        </div>

        {/* Settings options */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Settings size={18} className="text-purple-755 font-bold" /> Integrações & Limites
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Limite Alerta do Ar (AQI)</strong>
                <span className="text-[10px] text-slate-505 block">Disparar alerta automático de saúde pública caso a qualidade do ar ultrapasse este valor.</span>
              </div>
              <strong className="text-slate-808 text-[10px]">100 AQI</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Sincronização GIS (ArcGIS / QGIS API)</strong>
                <span className="text-[10px] text-slate-505 block">Periodicidade de atualização das camadas cartográficas de Curitiba.</span>
              </div>
              <strong className="text-slate-808 text-[10px]">A cada 24 horas</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
