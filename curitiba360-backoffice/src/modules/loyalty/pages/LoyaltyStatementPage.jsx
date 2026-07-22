import React from "react";
import { ArrowLeft, History, Coins, CircleDollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";
import { useLoyalty } from "../hooks/useLoyalty";

export default function LoyaltyStatementPage() {
  const { account, loading } = useLoyalty();

  const transactionsList = account?.transactions || [];

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
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <History size={18} />
              <span className="text-xs uppercase tracking-wider">Histórico de Transações</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Extrato do Clube
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Veja seu extrato detalhado de créditos e débitos de pontos e cashback.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        ) : transactionsList.length === 0 ? (
          <div className="text-center py-12 rounded-3xl border border-slate-200 bg-white">
            <p className="text-slate-505 font-semibold my-0">Você não possui transações em seu extrato.</p>
          </div>
        ) : (
          <section className="space-y-4">
            {transactionsList.map((tx) => {
              const isCredit = tx.direction === "credit";
              const isPoints = tx.currency === "points";

              return (
                <div key={tx.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isPoints ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                      {isPoints ? <Coins size={20} /> : <CircleDollarSign size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-955 my-0">{tx.description}</h4>
                      <p className="mt-1 text-xs text-slate-450 my-0">
                        {new Date(tx.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${isCredit ? "text-emerald-700" : "text-red-650"}`}>
                    {isCredit ? "+" : "-"}
                    {isPoints ? `${tx.amount} pts` : `R$ ${tx.amount}`}
                  </span>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
