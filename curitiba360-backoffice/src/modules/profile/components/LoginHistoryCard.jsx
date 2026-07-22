import React from "react";
import { History, ShieldAlert } from "lucide-react";

export default function LoginHistoryCard({ history = [] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
          <History size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-955 my-0">
            Histórico de Atividades
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
            Histórico das últimas ações críticas de segurança da sua conta.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {history.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/10 hover:bg-slate-50/30 transition"
          >
            <div className="min-w-0">
              <h3 className="font-bold text-slate-950 my-0 text-sm">
                {log.action}
              </h3>
              <p className="mt-1 text-xs text-slate-500 my-0">
                {log.city} • IP: {log.ip}
              </p>
            </div>
            <div className="text-xs text-slate-400 font-semibold whitespace-nowrap">
              {log.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
