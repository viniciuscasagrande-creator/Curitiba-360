import React from "react";
import {
  CheckCircle2,
  Gift,
  Target,
} from "lucide-react";

export default function MissionCard({
  mission,
  onClaim,
}) {
  const percentage = Math.min(
    100,
    Math.round(
      (mission.progress /
        mission.target) *
        100
    )
  );

  const completed =
    mission.status ===
      "completed" ||
    mission.status ===
      "claimed";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm select-none text-left flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
            {completed ? (
              <CheckCircle2
                size={21}
              />
            ) : (
              <Target size={21} />
            )}
          </div>

          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
            {mission.reward.type ===
            "points"
              ? `+${mission.reward.amount} pontos`
              : `R$ ${mission.reward.amount}`}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-950 my-0">
          {mission.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600 my-0">
          {mission.description}
        </p>

        <div className="mt-5">
          <div className="flex justify-between text-xs font-semibold text-slate-505">
            <span>Progresso</span>

            <span>
              {mission.progress}/
              {mission.target}
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-purple-600"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div>
        {mission.status ===
          "completed" && (
          <button
            type="button"
            onClick={() =>
              onClaim(mission.id)
            }
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple-700 hover:bg-purple-800 border-none cursor-pointer text-white px-4 text-sm font-semibold transition"
          >
            <Gift size={17} />
            Resgatar recompensa
          </button>
        )}

        {mission.status ===
          "claimed" && (
          <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">
            Recompensa resgatada
          </div>
        )}
      </div>
    </article>
  );
}
