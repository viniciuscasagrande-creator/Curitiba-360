import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

export default function MusterPointsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/risk-map" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Mapa de Riscos
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Pontos de Encontro Operacionais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a capacidade de suporte e recursos disponíveis em cada Ponto de Encontro (Muster Point) mapeado.
          </p>
        </div>

        {/* Muster points list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <MapPin size={18} className="text-purple-755 font-bold" /> Localizações de Refúgio
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Ponto de Encontro A (Estacionamento Principal)</strong>
                <span className="text-[10px] text-slate-505 block">Capacidade: 2.500 paxs | Setores Associados: Entrada Norte, Bilheteria | Recursos: Kit Primeiros Socorros, Rádios</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Livre
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Ponto de Encontro B (Praça Lateral)</strong>
                <span className="text-[10px] text-slate-505 block">Capacidade: 1.200 paxs | Setores Associados: Praça Gastronômica | Recursos: Iluminação Solar</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Livre
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
