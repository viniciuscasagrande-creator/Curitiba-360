import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Award } from "lucide-react";

export default function CertificationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce/trainings" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Treinamentos
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Certificações de Colaboradores</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie alvarás operacionais, carteiras profissionais e exames obrigatórios vencendo nos próximos dias.
          </p>
        </div>

        {/* Certifications list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Award size={18} className="text-purple-755 font-bold" /> Certificações Operacionais
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Credenciamento de Condutor Cadastur (Carlos Roberto)</strong>
                <span className="text-[10px] text-slate-505 block">Órgão Emissor: Ministério do Turismo | Registro: CAD-99381-PR | Validade: 2026-12-15</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Válido
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Treinamento de Brigada de Incêndio (CIPA)</strong>
                <span className="text-[10px] text-slate-505 block">Órgão Emissor: Corpo de Bombeiros PR | Registro: FOGO-0982 | Validade: 2026-08-10</span>
              </div>
              <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-105 uppercase">
                Vencendo
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
