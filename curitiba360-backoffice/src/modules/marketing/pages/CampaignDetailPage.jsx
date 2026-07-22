import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useMarketingDashboard } from "../hooks/useMarketingDashboard";

export default function CampaignDetailPage() {
  const { campaignId } = useParams();
  const { campaigns } = useMarketingDashboard();
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  if (!campaign) {
    return (
      <PartnerLayout>
        <p className="p-6 text-slate-500 font-semibold">Campanha não encontrada.</p>
      </PartnerLayout>
    );
  }

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
              {campaign.name}
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0">Filtro e Métricas da Campanha</h3>
          <p className="text-sm text-slate-655 my-0">{campaign.description}</p>
        </section>
      </div>
    </PartnerLayout>
  );
}
