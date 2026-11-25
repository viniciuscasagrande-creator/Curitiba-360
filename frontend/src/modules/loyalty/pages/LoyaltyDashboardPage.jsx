import React from "react";
import {
  ArrowRight,
  Award,
  Gift,
  History,
  Users,
} from "lucide-react";
import {
  Link,
} from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import LoyaltyBalanceCard from "../components/LoyaltyBalanceCard";
import LoyaltyLevelCard from "../components/LoyaltyLevelCard";
import MissionCard from "../components/MissionCard";

import {
  useLoyalty,
} from "../hooks/useLoyalty";

import {
  claimMissionReward,
} from "../services/loyaltyService";

export default function LoyaltyDashboardPage() {
  const {
    account,
    loading,
    error,
    reload,
  } = useLoyalty();

  async function handleClaim(
    missionId
  ) {
    try {
      await claimMissionReward(
        missionId
      );

      await reload();
    } catch (requestError) {
      window.alert(
        requestError.message
      );
    }
  }

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 select-none text-left">
        <section className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-9">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-350">
              <Award size={19} />

              <span className="text-sm font-semibold uppercase tracking-[0.14em]">
                Clube Curitiba 360
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl my-0">
              Explore, acumule e desbloqueie benefícios.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base my-0">
              Suas compras, avaliações e indicações geram pontos, cashback e vantagens exclusivas.
            </p>
          </div>
        </section>

        {loading && (
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded-3xl bg-slate-100" />
            <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
          </div>
        )}

        {error && (
          <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <p className="font-semibold text-red-750 my-0">
              {error}
            </p>
          </section>
        )}

        {!loading &&
          account && (
            <>
              <LoyaltyBalanceCard
                account={account}
              />

              <LoyaltyLevelCard
                account={account}
              />

              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  to="/clube/beneficios"
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-decoration-none hover:-translate-y-0.5 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <Gift
                      size={22}
                      className="text-emerald-700"
                    />

                    <h2 className="mt-4 font-bold text-slate-955 my-0">
                      Benefícios
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 my-0">
                      Ofertas e vantagens exclusivas do Clube.
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mt-5 text-slate-800"
                  />
                </Link>

                <Link
                  to="/clube/missoes"
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-decoration-none hover:-translate-y-0.5 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <Award
                      size={22}
                      className="text-purple-700"
                    />

                    <h2 className="mt-4 font-bold text-slate-955 my-0">
                      Missões
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 my-0">
                      Complete desafios e ganhe prêmios.
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mt-5 text-slate-850"
                  />
                </Link>

                <Link
                  to="/clube/indicacoes"
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-decoration-none hover:-translate-y-0.5 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <Users
                      size={22}
                      className="text-blue-700"
                    />

                    <h2 className="mt-4 font-bold text-slate-955 my-0">
                      Indicações
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 my-0">
                      Convide amigos e acumule pontos.
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mt-5 text-slate-800"
                  />
                </Link>

                <Link
                  to="/clube/extrato"
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-decoration-none hover:-translate-y-0.5 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <History
                      size={22}
                      className="text-slate-700"
                    />

                    <h2 className="mt-4 font-bold text-slate-955 my-0">
                      Extrato
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 my-0">
                      Acompanhe todas as movimentações.
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mt-5 text-slate-800"
                  />
                </Link>
              </section>

              <section className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-purple-700 my-0">
                      Engajamento
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-955 my-0">
                      Missões em andamento
                    </h2>
                  </div>

                  <Link
                    to="/clube/missoes"
                    className="text-sm font-semibold text-emerald-700 text-decoration-none hover:underline"
                  >
                    Ver todas
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {account.missions
                    .slice(0, 3)
                    .map(
                      (mission) => (
                        <MissionCard
                          key={
                            mission.id
                          }
                          mission={
                            mission
                          }
                          onClaim={
                            handleClaim
                          }
                        />
                      )
                    )}
                </div>
              </section>
            </>
          )}
      </div>
    </HomeLayout>
  );
}
