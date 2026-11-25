import React from "react";
import {
  CalendarClock,
  CircleDollarSign,
  LockKeyhole,
  WalletCards,
} from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(
    Number(value || 0)
  );
}

export default function FinancialSummaryCards({
  account,
}) {
  const items = [
    {
      label: "Saldo disponível",
      value:
        account.balance.available,
      icon: WalletCards,
      description:
        "Disponível para solicitar repasse.",
    },

    {
      label: "Saldo pendente",
      value:
        account.balance.pending,
      icon: CalendarClock,
      description:
        "Aguardando prazo de liquidação.",
    },

    {
      label: "Saldo futuro",
      value:
        account.balance.future,
      icon: CircleDollarSign,
      description:
        "Recebíveis programados.",
    },

    {
      label: "Saldo bloqueado",
      value:
        account.balance.blocked,
      icon: LockKeyhole,
      description:
        "Valores em análise ou reserva.",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 select-none text-left">
      {items.map(
        ({
          label,
          value,
          icon: Icon,
          description,
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

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 my-0">
              {formatCurrency(
                value
              )}
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-550 my-0">
              {description}
            </p>
          </article>
        )
      )}
    </section>
  );
}
