import React from "react";
import {
  Clock3,
} from "lucide-react";

export default function DetailSchedule({
  schedule = [],
  openingStatus,
}) {
  const currentDay =
    new Date().getDay();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left select-none">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950 my-0">
            Horários
          </h2>

          {openingStatus && (
            <p
              className={[
                "mt-2 text-sm font-semibold my-0",
                openingStatus.isOpen
                  ? "text-emerald-700"
                  : "text-slate-600",
              ].join(" ")}
            >
              {openingStatus.label}

              {openingStatus.detail
                ? ` · ${openingStatus.detail}`
                : ""}
            </p>
          )}
        </div>

        <Clock3 className="text-emerald-700" />
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {schedule.map((entry) => {
          const isToday =
            Number(entry.day) ===
            currentDay;

          return (
            <div
              key={`${entry.day}-${entry.label}`}
              className={[
                "flex items-center justify-between gap-4 py-3 text-sm",
                isToday
                  ? "font-semibold text-emerald-700"
                  : "text-slate-600",
              ].join(" ")}
            >
              <span>
                {entry.label}

                {isToday && " · Hoje"}
              </span>

              <span>
                {entry.closed
                  ? "Fechado"
                  : `${entry.openingTime} às ${entry.closingTime}`}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
