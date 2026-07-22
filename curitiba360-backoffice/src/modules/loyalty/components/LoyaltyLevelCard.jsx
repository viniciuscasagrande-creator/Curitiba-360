import React from "react";
import {
  LOYALTY_LEVELS,
} from "../constants/loyaltyLevels";

export default function LoyaltyLevelCard({
  account,
}) {
  const level =
    LOYALTY_LEVELS[
      account.level
    ];

  const Icon = level.icon;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm select-none text-left">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Icon size={27} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-505 my-0">
              Seu nível
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-950 my-0">
              {level.label}
            </h2>
          </div>
        </div>

        <span
          className={[
            "rounded-full border px-4 py-2 text-sm font-bold",
            level.badgeClassName,
          ].join(" ")}
        >
          {account.points.lifetime.toLocaleString(
            "pt-BR"
          )}{" "}
          pontos acumulados
        </span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-slate-700">
            Progresso de nível
          </span>

          <span className="text-slate-500">
            {
              account.levelProgress
                .currentValue
            }{" "}
            /{" "}
            {
              account.levelProgress
                .nextLevelValue
            }
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{
              width: `${account.levelProgress.percentage}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-500 my-0">
          {level.nextLevel
            ? `Faltam ${
                account
                  .levelProgress
                  .nextLevelValue -
                account
                  .levelProgress
                  .currentValue
              } pontos para o próximo nível.`
            : "Você alcançou o nível máximo do programa."}
        </p>
      </div>
    </section>
  );
}
