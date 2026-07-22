import React from "react";
import { Link } from "react-router-dom";
import {
  BadgeDollarSign,
  BadgePercent,
  MousePointerClick,
  ShoppingCart,
  Target,
  TrendingUp,
  UsersRound,
  WalletCards,
  ArrowRight,
  Plus
} from "lucide-react";

import PartnerLayout from "../../partner/layouts/PartnerLayout";

import {
  useMarketingDashboard,
} from "../hooks/useMarketingDashboard";

function formatCurrency(value) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(Number(value || 0));
}

export default function MarketingDashboardPage() {
  const {
    summary,
    campaigns,
    loading,
    error,
  } = useMarketingDashboard();

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  if (error || !summary) {
    return (
      <PartnerLayout>
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error ||
            "Dados de marketing não encontrados."}
        </section>
      </PartnerLayout>
    );
  }

  const metrics = [
    {
      label:
        "Campanhas ativas",
      value:
        summary.activeCampaigns,
      icon: Target,
    },

    {
      label: "Investimento",
      value: formatCurrency(
        summary.totalInvestment
      ),
      icon: WalletCards,
    },

    {
      label:
        "Receita atribuída",
      value: formatCurrency(
        summary.revenueAttributed
      ),
      icon: TrendingUp,
    },

    {
      label: "ROAS",
      value: `${summary.roas}x`,
      icon: BadgeDollarSign,
    },

    {
      label: "Conversões",
      value:
        summary.conversions,
      icon: UsersRound,
    },

    {
      label: "CPA médio",
      value: formatCurrency(
        summary.averageCPA
      ),
      icon: BadgePercent,
    },

    {
      label: "CTR médio",
      value: `${summary.averageCTR}%`,
      icon: MousePointerClick,
    },

    {
      label:
        "Carrinhos recuperados",
      value:
        summary.recoveredCarts,
      icon: ShoppingCart,
    },
  ];

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-7xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Marketing
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
              Campanhas e conversão
            </h1>

            <p className="mt-2 text-sm text-slate-600 my-0">
              Acompanhe campanhas, públicos e retorno sobre investimento.
            </p>
          </div>

          <Link
            to="/parceiro/marketing/campanhas/nova"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 transition text-decoration-none border-none cursor-pointer"
          >
            <Plus size={17} />
            Nova Campanha
          </Link>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(
            ({
              label,
              value,
              icon: Icon,
            }) => (
              <article
                key={label}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon size={21} />
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-500 my-0">
                  {label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-955 my-0">
                  {value}
                </p>
              </article>
            )
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-955 my-0">
              Campanhas recentes
            </h2>
            <Link
              to="/parceiro/marketing/campanhas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 text-decoration-none hover:underline"
            >
              Ver todas
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {campaigns.map(
              (campaign) => (
                <article
                  key={campaign.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-955 my-0">
                      {campaign.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 my-0">
                      {campaign.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <p className="text-xs text-slate-505 my-0">
                        Receita
                      </p>

                      <p className="mt-1 font-bold text-slate-955 my-0">
                        {formatCurrency(
                          campaign.metrics
                            .revenue
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-505 my-0">
                        ROAS
                      </p>

                      <p className="mt-1 font-bold text-emerald-700 my-0">
                        {
                          campaign.metrics
                            .roas
                        }
                        x
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-505 my-0">
                        Conversões
                      </p>

                      <p className="mt-1 font-bold text-slate-955 my-0">
                        {
                          campaign.metrics
                            .conversions
                        }
                      </p>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
