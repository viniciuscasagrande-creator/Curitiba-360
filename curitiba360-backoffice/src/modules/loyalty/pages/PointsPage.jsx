import React from "react";
import { ArrowLeft, Coins, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";
import { useLoyalty } from "../hooks/useLoyalty";

export default function PointsPage() {
  const { account, loading } = useLoyalty();

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
              <Coins size={18} />
              <span className="text-xs uppercase tracking-wider">Pontos Acumulados</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Meus Pontos
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Consulte seu saldo detalhado e regras de pontuação do Clube.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        ) : (
          <section className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 my-0">Saldo Atual</p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-955 my-0">
                  {account?.points?.available.toLocaleString("pt-BR")} pts
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-xs font-semibold text-slate-600">
                <p className="my-0">Pontos vitalícios acumulados: <strong className="text-slate-900">{account?.points?.lifetime.toLocaleString("pt-BR")} pts</strong></p>
                <p className="my-0 mt-1">Pontos expirando em breve: <strong className="text-slate-900">{account?.points?.expiring} pts</strong></p>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-950 my-0 flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-700" />
                Como funciona o acúmulo?
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed my-0">
                Cada compra de ingresso gera pontos na proporção de <strong>R$ 1 = 1 Ponto</strong>. Além disso, seu nível de fidelidade acrescenta um bônus:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 text-sm pt-2">
                <div className="border border-slate-200 rounded-2xl p-4 bg-white text-center">
                  <span className="font-bold text-amber-700 block">Bronze</span>
                  <span className="text-xs text-slate-500 mt-1 block">Sem bônus</span>
                </div>
                <div className="border border-slate-200 rounded-2xl p-4 bg-white text-center">
                  <span className="font-bold text-slate-700 block">Prata</span>
                  <span className="text-xs text-slate-500 mt-1 block">+5% bônus</span>
                </div>
                <div className="border border-slate-200 rounded-2xl p-4 bg-white text-center">
                  <span className="font-bold text-yellow-750 block">Ouro</span>
                  <span className="text-xs text-slate-500 mt-1 block">+10% bônus</span>
                </div>
                <div className="border border-slate-200 rounded-2xl p-4 bg-white text-center">
                  <span className="font-bold text-cyan-700 block">Diamante</span>
                  <span className="text-xs text-slate-500 mt-1 block">+20% bônus</span>
                </div>
              </div>
            </article>
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
