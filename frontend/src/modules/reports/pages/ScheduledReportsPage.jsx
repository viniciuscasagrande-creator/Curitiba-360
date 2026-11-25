import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarRange } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";

export default function ScheduledReportsPage() {
  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/relatorios"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Relatórios
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Relatórios Agendados
            </h1>
          </div>
        </header>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
          <CalendarRange size={24} className="text-slate-400" />
          <div>
            <h3 className="text-lg font-bold text-slate-955 my-0">Envio Automático</h3>
            <p className="text-sm text-slate-505 my-0 mt-1">Configure o recebimento de faturamentos semanais ou mensais diretamente em seu e-mail.</p>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
