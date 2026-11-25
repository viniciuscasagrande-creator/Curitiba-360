import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export default function ExperienceSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações de Experiência</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Defina limites de envio de mensagens diárias/semanais por usuário e janelas de silêncio de comunicações.
          </p>
        </div>

        {/* Settings options */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Settings size={18} className="text-purple-755" /> Limites de Comunicação
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Janela de Silêncio Noturno</strong>
                <span className="text-[10px] text-slate-505 block">Bloqueia notificações push e mensagens promocionais das 22h às 08h.</span>
              </div>
              <strong className="text-slate-800 text-[10px]">Ativa (22:00 - 08:00)</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Frequência Máxima Promocional</strong>
                <span className="text-[10px] text-slate-505 block">Número máximo de comunicações por canal na semana por visitante.</span>
              </div>
              <strong className="text-slate-800 text-[10px]">3 mensagens / semana</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
