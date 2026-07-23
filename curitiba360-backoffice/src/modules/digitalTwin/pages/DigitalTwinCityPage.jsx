import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark } from "lucide-react";

export default function DigitalTwinCityPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gêmeo Digital de Bairros & Espaços</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Modelagem 3D e acompanhamento de bairros, parques, praças, museus e equipamentos urbanos públicos de Curitiba.
          </p>
        </div>

        {/* Space inventory grid */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <Landmark className="text-purple-650" size={24} />
            <h4 className="font-bold text-slate-900 my-0 text-sm">Bairro Batel</h4>
            <p className="text-[10px] text-slate-505">Residencial/Comercial | Sensores ativos: 142 | Status: Normal</p>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <Landmark className="text-purple-650" size={24} />
            <h4 className="font-bold text-slate-900 my-0 text-sm">Centro Cívico</h4>
            <p className="text-[10px] text-slate-505">Governamental | Sensores ativos: 280 | Status: Fluxo Elevado</p>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <Landmark className="text-purple-650" size={24} />
            <h4 className="font-bold text-slate-900 my-0 text-sm">Jardim Botânico</h4>
            <p className="text-[10px] text-slate-505">Área Verde / Lazer | Sensores ativos: 98 | Status: Normal</p>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
