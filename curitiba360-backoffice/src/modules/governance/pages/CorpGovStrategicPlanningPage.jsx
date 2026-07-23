import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";

export default function CorpGovStrategicPlanningPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planejamento Estratégico</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Missão, visão, valores e direcionadores estratégicos do Curitiba 360 de longo prazo.
          </p>
        </div>

        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Target size={18} className="text-purple-755 font-bold" /> Direcionamento Estratégico
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <strong className="text-slate-900 block text-xs">Missão</strong>
              <p className="text-[10px] text-slate-655 my-0 leading-relaxed">
                Transformar a experiência urbana e turística de Curitiba por meio de inteligência de dados, sustentabilidade e tecnologia de ponta.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <strong className="text-slate-900 block text-xs">Visão</strong>
              <p className="text-[10px] text-slate-655 my-0 leading-relaxed">
                Ser reconhecido como o principal modelo global de governo digital e inovação em ecossistemas de cidades inteligentes até 2029.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <strong className="text-slate-900 block text-xs">Valores</strong>
              <p className="text-[10px] text-slate-655 my-0 leading-relaxed">
                Transparência total, equidade, inovação contínua, responsabilidade fiscal, sustentabilidade ecológica e segurança do cidadão.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
