import React from "react";
import { ArrowLeft, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";
import { useLoyalty } from "../hooks/useLoyalty";
import { LOYALTY_LEVELS } from "../constants/loyaltyLevels";

export default function BenefitsPage() {
  const { account, loading } = useLoyalty();

  const benefitsList = [
    { id: "b1", title: "Ingresso VIP Festival de Cinema", level: "diamond", desc: "Acesso antecipado à área vip do festival." },
    { id: "b2", title: "Double Drink no Largo da Ordem", level: "gold", desc: "Compre um chopp e ganhe outro nos bares credenciados." },
    { id: "b3", title: "10% Desconto na Linha Turismo", level: "silver", desc: "Desconto aplicável em até 2 passagens semanais." },
    { id: "b4", title: "Cupom Evento Cultural", level: "bronze", desc: "Desconto de R$ 5 em eventos parceiros da prefeitura." }
  ];

  return (
    <HomeLayout header={<HomeHeader />} bottomNavigation={<BottomNavigation />}>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        <header className="flex items-start gap-4">
          <Link
            to="/clube"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Gift size={18} />
              <span className="text-xs uppercase tracking-wider">Benefícios Exclusivos</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Clube de Vantagens
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Desbloqueie vantagens de acordo com a sua categoria de fidelidade.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        ) : (
          <section className="grid gap-4 sm:grid-cols-2">
            {benefitsList.map((b) => {
              const levelCfg = LOYALTY_LEVELS[b.level];
              const isUnlocked = account ? LOYALTY_LEVELS[account.level].minimumPoints >= levelCfg.minimumPoints : false;

              return (
                <div
                  key={b.id}
                  className={`rounded-3xl border p-6 bg-white shadow-sm flex flex-col justify-between ${
                    isUnlocked ? "border-slate-200" : "border-slate-100 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${levelCfg.badgeClassName}`}>
                        Nível {levelCfg.label}
                      </span>
                      {isUnlocked ? (
                        <span className="text-xs font-bold text-emerald-700">Liberado</span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">Bloqueado</span>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-950 my-0">{b.title}</h3>
                    <p className="mt-2 text-sm text-slate-650 my-0">{b.desc}</p>
                  </div>
                  <button
                    disabled={!isUnlocked}
                    className="mt-6 h-11 w-full rounded-xl bg-slate-950 text-white disabled:bg-slate-200 disabled:text-slate-450 hover:bg-slate-800 transition font-semibold text-sm border-none cursor-pointer"
                  >
                    {isUnlocked ? "Resgatar Benefício" : "Bloqueado"}
                  </button>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
