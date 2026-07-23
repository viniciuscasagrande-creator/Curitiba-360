import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { AlertTriangle, ShieldCheck, Mail, ShieldAlert } from "lucide-react";

export default function ContinuityPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planos de Continuidade de Negócios (BCP)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Assegure a resiliência operacional da plataforma Curitiba 360 no caso de interrupções severas de infraestrutura.</p>
        </div>

        {/* BCP Status card */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} className="text-emerald-400" />
            <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider text-emerald-300">Resiliência Operacional Global</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl my-0">
            O plano BCP define contingências de trabalho, canais alternativos de comunicação e controle de incidentes para operações críticas.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
            <div>
              <span className="text-slate-400 block">Status do BCP</span>
              <strong className="text-emerald-400 mt-1 block">Homologado e Atualizado (Julho/2026)</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Incidentes de Continuidade</span>
              <strong className="text-slate-200 mt-1 block">0 Ativos</strong>
            </div>
          </div>
        </section>

        {/* Contingency guidelines */}
        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Diretrizes Principais</h3>
          <div className="grid gap-6 md:grid-cols-2 text-xs">
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50 space-y-1">
              <strong className="text-slate-800 text-sm block">Queda do Provedor de E-mail</strong>
              <p className="text-slate-500 my-0">Utilizar o pool alternativo da AWS SES caso o SendGrid exceda 10 minutos de instabilidade.</p>
            </div>
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50 space-y-1">
              <strong className="text-slate-800 text-sm block">Indisponibilidade da API do Firebase</strong>
              <p className="text-slate-505 my-0">Executar fluxo de cache de tokens JWT locais no App Mobile do credenciador para validação offline.</p>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
