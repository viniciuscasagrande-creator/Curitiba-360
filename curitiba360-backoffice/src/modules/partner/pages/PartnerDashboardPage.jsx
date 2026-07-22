import React from "react";
import {
  CalendarDays,
  CircleDollarSign,
  ShoppingBag,
  WalletCards,
} from "lucide-react";

import PartnerLayout from "../layouts/PartnerLayout";
import PartnerStatusCard from "../components/PartnerStatusCard";
import { usePartner } from "../hooks/usePartner";

function formatCurrency(value) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(Number(value || 0));
}

export default function PartnerDashboardPage() {
  const {
    partner,
    loading,
    error,
  } = usePartner();

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  if (error || !partner) {
    return (
      <PartnerLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error ||
            "Parceiro não encontrado."}
        </div>
      </PartnerLayout>
    );
  }

  const metrics = [
    {
      label: "Produtos ativos",
      value:
        partner.metrics
          ?.activeProducts || 0,
      icon: CalendarDays,
    },
    {
      label: "Pedidos pendentes",
      value:
        partner.metrics
          ?.pendingOrders || 0,
      icon: ShoppingBag,
    },
    {
      label: "Vendas no mês",
      value: formatCurrency(
        partner.metrics
          ?.monthlySales
      ),
      icon: CircleDollarSign,
    },
    {
      label: "Saldo disponível",
      value: formatCurrency(
        partner.metrics
          ?.availableBalance
      ),
      icon: WalletCards,
    },
  ];

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-7xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Área do parceiro
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 my-0">
            Olá,{" "}
            {partner.legal.tradeName}
          </h1>

          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o desempenho e administre sua operação.
          </p>
        </header>

        <PartnerStatusCard
          partner={partner}
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(
            ({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon size={21} />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500 my-0">
                  {label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950 my-0">
                  {value}
                </p>
              </article>
            )
          )}
        </section>
      </div>
    </PartnerLayout>
  );
}
