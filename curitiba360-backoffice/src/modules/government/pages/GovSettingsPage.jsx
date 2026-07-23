import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Save, Shield } from "lucide-react";

export default function GovSettingsPage() {
  const [allowPublicSubmissions, setAllowPublicSubmissions] = useState(true);
  const [requiresModeration, setRequiresModeration] = useState(true);
  const [budgetAlertThreshold, setBudgetAlertThreshold] = useState("90");

  const handleSave = () => {
    alert("Configurações governamentais salvas com sucesso!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações Gerais</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Parametrização de regras de negócios, limites orçamentários e regras de moderação cidadã.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 h-9 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
          >
            <Save size={16} /> Salvar Parâmetros
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1 text-purple-700">
              <Shield size={16} /> Parâmetros de Participação Cidadã
            </h3>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl">
              <div>
                <strong className="text-slate-900 text-xs font-bold block">Permitir Submissões Públicas</strong>
                <span className="text-[10px] text-slate-500 block mt-0.5">Permite que cidadãos enviem ideias sem cadastro prévio.</span>
              </div>
              <input
                type="checkbox"
                checked={allowPublicSubmissions}
                onChange={e => setAllowPublicSubmissions(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl">
              <div>
                <strong className="text-slate-900 text-xs font-bold block">Exigir Moderação Editorial</strong>
                <span className="text-[10px] text-slate-500 block mt-0.5">Todas as ideias passam por aprovação interna antes de serem listadas.</span>
              </div>
              <input
                type="checkbox"
                checked={requiresModeration}
                onChange={e => setRequiresModeration(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 my-0">Configurações Fiscais & Alertas</h3>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase block">Gatilho de Alerta de Orçamento Estourado (%)</label>
              <input
                type="number"
                value={budgetAlertThreshold}
                onChange={e => setBudgetAlertThreshold(e.target.value)}
                className="w-40 h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
