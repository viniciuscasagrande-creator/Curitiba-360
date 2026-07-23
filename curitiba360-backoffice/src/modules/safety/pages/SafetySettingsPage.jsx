import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export default function SafetySettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações de Segurança</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Configure limites de tempo de SLA, tolerâncias de batida de sensores IoT e limites de ocupação de setores.
          </p>
        </div>

        {/* Settings options */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Settings size={18} className="text-purple-755 font-bold" /> Parâmetros de Resposta
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">SLA Crítico (Manchester Vermelho)</strong>
                <span className="text-[10px] text-slate-505 block">Tempo máximo autorizado para que a primeira ambulância seja despachada e chegue ao local.</span>
              </div>
              <strong className="text-slate-808 text-[10px]">5 minutos</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Limite de Lotação Alerta</strong>
                <span className="text-[10px] text-slate-505 block">Porcentagem de ocupação de setor que dispara um alerta automático de atenção ao controle.</span>
              </div>
              <strong className="text-slate-808 text-[10px]">80% da capacidade</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
