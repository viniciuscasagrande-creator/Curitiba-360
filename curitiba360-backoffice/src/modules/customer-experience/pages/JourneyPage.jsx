import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

export default function JourneyPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Jornada Turística do Visitante</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o funil de relacionamento dos visitantes desde o interesse inicial até as etapas de recompra e fidelização.
          </p>
        </div>

        {/* Funnel visualization */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Compass size={18} className="text-purple-755" /> Funil da Experiência
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-24 text-right font-bold text-slate-500">Descoberta:</span>
              <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden flex items-center px-4 font-bold text-slate-700 text-[10px]">
                <div className="bg-purple-200 h-full rounded-full flex items-center px-3" style={{ width: "100%" }}>
                  100% (68.4K leads)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-right font-bold text-slate-500">Compra:</span>
              <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden flex items-center px-4 font-bold text-slate-700 text-[10px]">
                <div className="bg-purple-300 h-full rounded-full flex items-center px-3" style={{ width: "58%" }}>
                  58% (39.6K compradores)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-right font-bold text-slate-500">Fidelização:</span>
              <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden flex items-center px-4 font-bold text-slate-700 text-[10px]">
                <div className="bg-purple-400 h-full rounded-full flex items-center px-3" style={{ width: "42%" }}>
                  42% (28.4K membros fiéis)
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
