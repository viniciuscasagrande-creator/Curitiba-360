import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";

export default function MarketingReportPage() {
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
              Canais & Marketing
            </h1>
          </div>
        </header>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Consulte origens de tráfego, cliques UTM de campanhas (Google, Instagram, TikTok, WhatsApp) e conversão.</p>
        </section>
      </div>
    </PartnerLayout>
  );
}
