import React from "react";
import { Monitor, Smartphone, ShieldCheck, LogOut } from "lucide-react";

export default function ActiveSessionsCard({ sessions = [], onTerminate }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Monitor size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-955 my-0">
            Sessões Ativas
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
            Estas são as sessões e navegadores conectados na sua conta do Curitiba 360.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {sessions.map((session) => {
          const isMobile = session.platform.toLowerCase().includes("iphone") || session.platform.toLowerCase().includes("ios") || session.platform.toLowerCase().includes("android");
          
          return (
            <div
              key={session.id}
              className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  {isMobile ? <Smartphone size={18} /> : <Monitor size={18} />}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-950 my-0 text-sm flex items-center gap-1.5 flex-wrap">
                    {session.browser} em {session.platform}
                    {session.current && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100">
                        <ShieldCheck size={11} />
                        Atual
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 my-0">
                    {session.city}, {session.country} • {session.lastSeen}
                  </p>
                </div>
              </div>

              {!session.current && (
                <button
                  type="button"
                  onClick={() => onTerminate(session.id)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition cursor-pointer"
                  title="Encerrar sessão"
                  aria-label={`Encerrar sessão no ${session.browser}`}
                >
                  <LogOut size={15} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
