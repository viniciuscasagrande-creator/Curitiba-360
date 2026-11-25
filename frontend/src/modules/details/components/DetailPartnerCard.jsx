import React from "react";
import {
  BadgeCheck,
  Building2,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DetailPartnerCard({
  partner,
}) {
  if (!partner) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-blue-100 bg-blue-50/60 p-6 text-left select-none">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
          <Building2 size={23} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Parceiro oficial
            <BadgeCheck size={15} />
          </div>

          <h2 className="mt-2 text-lg font-bold text-slate-950 my-0">
            {partner.name}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 my-0">
            {partner.description}
          </p>

          <Link
            to={`/parceiro/${partner.id}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 text-decoration-none"
          >
            Ver perfil do parceiro

            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
