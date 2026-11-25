import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useEsgDashboard } from "../hooks/useEsgDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, ShieldAlert, Check, X } from "lucide-react";

export default function EsgSocialPage() {
  const { socialDetails, loading } = useEsgDashboard();

  if (loading || !socialDetails) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores sociais...
        </div>
      </AdminLayout>
    );
  }

  const { accessibilityCriteria, diversity } = socialDetails;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/esg" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Dimensão Social (S)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a diversidade no quadro de colaboradores e a adequação de acessibilidade para visitantes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Diversity card */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 my-0 flex items-center gap-1">
              <Users size={16} className="text-purple-650" /> Equidade & Diversidade
            </h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span>Gênero Feminino:</span>
                <span className="font-bold text-slate-700">{diversity.genderFemalePercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Gênero Masculino:</span>
                <span className="font-bold text-slate-707">{diversity.genderMalePercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Pardo ou Preto (Autodeclaração):</span>
                <span className="font-bold text-slate-707">{diversity.racePardoPretoPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Colaboradores PCD:</span>
                <span className="font-bold text-slate-707">{diversity.pcdStaffPercent}%</span>
              </div>
              <div className="border-t border-slate-50 pt-2 flex justify-between font-sans">
                <span>Liderança Feminina/Minoria:</span>
                <span className="font-bold text-purple-700">{diversity.leadershipDiversityPercent}%</span>
              </div>
            </div>
          </div>

          {/* Accessibility card */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 my-0 flex items-center gap-1">
              <ShieldAlert size={16} className="text-blue-500" /> Acessibilidade Física & Digital
            </h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between items-center">
                <span>Rampas de Acesso:</span>
                {accessibilityCriteria.ramps ? <Check className="text-emerald-650" size={14} /> : <X className="text-red-650" size={14} />}
              </div>
              <div className="flex justify-between items-center">
                <span>Elevadores:</span>
                {accessibilityCriteria.lifts ? <Check className="text-emerald-650" size={14} /> : <X className="text-red-650" size={14} />}
              </div>
              <div className="flex justify-between items-center">
                <span>Sanitários Acessíveis:</span>
                {accessibilityCriteria.accessibleToilets ? <Check className="text-emerald-650" size={14} /> : <X className="text-red-650" size={14} />}
              </div>
              <div className="flex justify-between items-center">
                <span>Intérprete de Libras:</span>
                {accessibilityCriteria.librasInterpreter ? <Check className="text-emerald-650" size={14} /> : <X className="text-red-650" size={14} />}
              </div>
              <div className="flex justify-between items-center">
                <span>Sinalização em Braille:</span>
                {accessibilityCriteria.brailleSignage ? <Check className="text-emerald-650" size={14} /> : <X className="text-red-650" size={14} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
