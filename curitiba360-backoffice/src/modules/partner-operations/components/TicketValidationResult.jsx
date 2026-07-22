import React from "react";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  UserRound,
  XCircle,
} from "lucide-react";

import {
  TICKET_VALIDATION_RESULT,
} from "../constants/validationErrors";

export default function TicketValidationResult({
  validation,
  onClose,
}) {
  if (!validation) {
    return null;
  }

  const config =
    TICKET_VALIDATION_RESULT[
      validation.result
    ] ||
    TICKET_VALIDATION_RESULT.invalid;

  const approved =
    validation.result ===
    "approved";

  const Icon = approved
    ? CheckCircle2
    : validation.result ===
        "offline_pending"
      ? Clock3
      : validation.result ===
          "duplicate"
        ? CircleAlert
        : XCircle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm select-none text-left">
      <section className="w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-2xl">
        <div
          className={[
            "mx-auto flex h-20 w-20 items-center justify-center rounded-full border",
            config.className,
          ].join(" ")}
        >
          <Icon size={38} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-955 my-0">
          {config.title}
        </h2>

        <p className="mt-2 text-sm text-slate-600 my-0">
          {config.message}
        </p>

        {validation.ticket && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left">
            <div className="flex items-start gap-3">
              <UserRound
                size={20}
                className="mt-0.5 text-slate-500"
              />

              <div>
                <p className="font-bold text-slate-955 my-0">
                  {
                    validation.ticket
                      .holder.name
                  }
                </p>

                <p className="mt-1 text-sm text-slate-505 my-0">
                  {
                    validation.ticket
                      .type
                  }
                </p>

                <p className="mt-1 text-xs text-slate-400 my-0">
                  {
                    validation.ticket
                      .code
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className={[
            "mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-bold text-white border-none cursor-pointer hover:opacity-90 transition",
            approved
              ? "bg-emerald-700"
              : "bg-slate-950",
          ].join(" ")}
        >
          Validar próximo ingresso
        </button>
      </section>
    </div>
  );
}
