import React from "react";
import {
  CircleDollarSign,
  Coins,
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

export default function LoyaltyBalanceCard({
  account,
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 select-none text-left">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 my-0">
              Pontos disponíveis
            </p>

            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950 my-0">
              {account.points.available.toLocaleString(
                "pt-BR"
              )}
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Coins size={27} />
          </div>
        </div>

        <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="text-slate-500">
            Pendentes
          </span>

          <strong className="text-slate-800">
            {account.points.pending.toLocaleString(
              "pt-BR"
            )}
          </strong>
        </div>
      </article>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-505 my-0">
              Cashback disponível
            </p>

            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950 my-0">
              {formatCurrency(
                account.cashback.available
              )}
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <CircleDollarSign
              size={27}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="text-slate-500">
            Pendente
          </span>

          <strong className="text-slate-800">
            {formatCurrency(
              account.cashback.pending
            )}
          </strong>
        </div>
      </article>
    </section>
  );
}
