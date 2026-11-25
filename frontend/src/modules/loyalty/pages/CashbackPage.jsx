import React from "react";
import { ArrowLeft, CircleDollarSign, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";
import { useLoyalty } from "../hooks/useLoyalty";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(value || 0));
}

export default function CashbackPage() {
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
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <CircleDollarSign size={18} />
              <span className="text-xs uppercase tracking-wider">Cashback Acumulado</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Meu Cashback
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Acompanhe seu saldo em carteira e histórico de resgates de saldo real.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        ) : (
          <section className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 my-0">Saldo Disponível</p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-955 my-0">
                  {formatCurrency(account?.cashback?.available)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-xs font-semibold text-slate-650">
                <p className="my-0">Pendente de liberação: <strong className="text-slate-900">{formatCurrency(account?.cashback?.pending)}</strong></p>
                <p className="my-0 mt-1">Cashback total resgatado: <strong className="text-slate-900">{formatCurrency(account?.cashback?.lifetime)}</strong></p>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-950 my-0 flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-700" />
                Segurança e Regras de Liberação
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed my-0">
                Para sua segurança contra chargebacks e fraudes, o saldo de cashback fica temporariamente no estado <strong>pendente</strong> até a conclusão do evento ou decurso do prazo de segurança de 7 dias após a confirmação da compra.
              </p>
            </article>
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
