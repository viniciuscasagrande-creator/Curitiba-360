import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useMarketingDashboard } from "../hooks/useMarketingDashboard";

export default function CampaignsPage() {
  const { campaigns } = useMarketingDashboard();

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-5xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/marketing"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Marketing
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Campanhas Promocionais
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm p-6 space-y-4">
          {campaigns.map((c) => (
            <div key={c.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-955 my-0">{c.name}</h4>
                <p className="text-xs text-slate-505 my-0 mt-0.5">{c.description}</p>
              </div>
              <span className="rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 px-2.5 py-0.5 text-xs">
                {c.status.toUpperCase()}
              </span>
            </div>
          ))}
        </section>
      </div>
    </PartnerLayout>
  );
}
