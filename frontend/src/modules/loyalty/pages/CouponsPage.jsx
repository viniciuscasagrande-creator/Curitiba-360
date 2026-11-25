import React from "react";
import { ArrowLeft, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";
import { useLoyalty } from "../hooks/useLoyalty";

export default function CouponsPage() {
  const { account, loading } = useLoyalty();

  const couponsList = account?.coupons || [];

  return (
    <HomeLayout header={<HomeHeader />} bottomNavigation={<BottomNavigation />}>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        <header className="flex items-start gap-4">
          <Link
            to="/clube"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-705 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Ticket size={18} />
              <span className="text-xs uppercase tracking-wider">Cupons e Descontos</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Meus Cupons
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Gerencie cupons ativos obtidos através de resgates e recompensas.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        ) : couponsList.length === 0 ? (
          <div className="text-center py-12 rounded-3xl border border-slate-200 bg-white">
            <p className="text-slate-500 font-semibold my-0">Você não possui cupons ativos no momento.</p>
          </div>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2">
            {couponsList.map((c) => (
              <div key={c.id} className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {c.code}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-950 my-0">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-650 my-0">{c.description}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(c.code);
                    window.alert("Código do cupom copiado!");
                  }}
                  className="mt-6 h-11 w-full rounded-xl bg-slate-950 hover:bg-slate-800 transition text-white font-semibold text-sm border-none cursor-pointer"
                >
                  Copiar Código
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
