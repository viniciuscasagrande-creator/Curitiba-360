import React from "react";
import { ArrowLeft, Users, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";
import { useLoyalty } from "../hooks/useLoyalty";

export default function ReferralsPage() {
  const { account, loading } = useLoyalty();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (account?.referrals?.code) {
      navigator.clipboard.writeText(account.referrals.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
              <Users size={18} />
              <span className="text-xs uppercase tracking-wider">Indicação Premiada</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Indique Amigos
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Indique Curitiba 360 para amigos e ganhe 300 pontos a cada nova primeira compra qualificada.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        ) : (
          <section className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-550 my-0">Código de Indicação</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold bg-slate-100 px-4 py-2 rounded-xl text-slate-800">
                    {account?.referrals?.code}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white hover:bg-slate-800 transition cursor-pointer border-none"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-xs font-semibold text-slate-650 min-w-[200px]">
                <p className="my-0">Indicações convertidas: <strong className="text-slate-900">{account?.referrals?.completed}</strong></p>
                <p className="my-0 mt-1">Indicações pendentes: <strong className="text-slate-900">{account?.referrals?.pending}</strong></p>
                <p className="my-0 mt-1">Pontos totais ganhos: <strong className="text-slate-900">{account?.referrals?.totalEarned} pts</strong></p>
              </div>
            </article>
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
