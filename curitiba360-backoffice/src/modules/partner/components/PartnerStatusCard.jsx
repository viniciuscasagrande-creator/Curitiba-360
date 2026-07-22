import React from "react";
import {
  PARTNER_STATUS,
} from "../constants/partnerStatus";

export default function PartnerStatusCard({
  partner,
}) {
  const config =
    PARTNER_STATUS[partner.status] ||
    PARTNER_STATUS.draft;

  const Icon = config.icon;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm select-none text-left">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-505 my-0">
            Status da conta
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div
              className={[
                "flex h-12 w-12 items-center justify-center rounded-2xl border",
                config.className,
              ].join(" ")}
            >
              <Icon size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950 my-0">
                {config.label}
              </h2>

              <p className="mt-1 text-sm text-slate-500 my-0">
                Última atualização em{" "}
                {new Date(
                  partner.updatedAt
                ).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
            </div>
          </div>
        </div>

        <span
          className={[
            "rounded-full border px-3 py-1 text-xs font-bold",
            config.className,
          ].join(" ")}
        >
          {config.label}
        </span>
      </div>
    </section>
  );
}
