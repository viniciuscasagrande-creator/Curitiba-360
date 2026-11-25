import React from "react";
import { ArrowLeft, Award } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";
import MissionCard from "../components/MissionCard";
import { useLoyalty } from "../hooks/useLoyalty";
import { claimMissionReward } from "../services/loyaltyService";

export default function MissionsPage() {
  const { account, loading, reload } = useLoyalty();

  async function handleClaim(missionId) {
    try {
      await claimMissionReward(missionId);
      await reload();
      window.alert("Parabéns! Sua recompensa foi creditada.");
    } catch (err) {
      window.alert(err.message || "Erro ao resgatar recompensa.");
    }
  }

  const missionsList = account?.missions || [];

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
            <div className="flex items-center gap-2 text-purple-700 font-bold">
              <Award size={18} />
              <span className="text-xs uppercase tracking-wider">Desafios de Fidelidade</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Missões Disponíveis
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Complete as missões urbanas e de compra para resgatar pontos e cashback.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        ) : (
          <section className="grid gap-4 sm:grid-cols-2">
            {missionsList.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onClaim={handleClaim}
              />
            ))}
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
