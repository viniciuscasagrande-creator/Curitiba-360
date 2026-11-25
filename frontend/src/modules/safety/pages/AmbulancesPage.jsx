import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Ambulance } from "lucide-react";

export default function AmbulancesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/medical-posts" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Postos Médicos
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Frota de Ambulâncias</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a disponibilidade, posicionamento e despacho de ambulâncias do SAMU ou privadas de apoio ao evento.
          </p>
        </div>

        {/* Ambulances list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Ambulance size={18} className="text-purple-755 font-bold" /> Unidades Móveis de Saúde
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">UTI Móvel - Unidade 01</strong>
                <span className="text-[10px] text-slate-505 block">Placa: AAA-1234 | Equipe: Dr. Pedro, Enf. Marina | Hospital Referência: Hospital Cajuru</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Disponível
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Ambulância Convencional - Unidade 02</strong>
                <span className="text-[10px] text-slate-505 block">Placa: BBB-5678 | Equipe: Socorrista Felipe, Tecn. Enf. Lucas | Destino: Em Trânsito</span>
              </div>
              <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-105 uppercase">
                Em Deslocamento
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
