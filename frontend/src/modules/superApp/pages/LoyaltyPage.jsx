import React from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import LoyaltyCard from "../components/LoyaltyCard";
import { useLoyalty } from "../hooks/useLoyalty";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoyaltyPage() {
  const { loyalty, loading, addPoints } = useLoyalty();

  const missions = [
    { id: 1, title: "Amigo do Clima", desc: "Faça 3 viagens de ônibus ou bike compartilhada.", rewardPoints: 200, done: true },
    { id: 2, title: "Explorador Cultural", desc: "Visite 2 museus municipais e registre check-in.", rewardPoints: 350, done: false },
    { id: 3, title: "Cidadão Participativo", desc: "Abra um protocolo de iluminação ou manutenção.", rewardPoints: 100, done: false }
  ];

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Clube Fidelidade C360</h2>
          <p className="text-[10px] text-slate-500 m-0">Complete missões, acumule pontos e avance de nível para obter recompensas.</p>
        </div>

        {loading || !loyalty ? (
          <div className="text-center py-12 text-slate-400">Carregando fidelidade...</div>
        ) : (
          <div className="space-y-4">
            <LoyaltyCard points={loyalty.points} level={loyalty.level} />

            {/* Missões e Gamificação */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0 flex items-center gap-1">
                <Sparkles size={14} className="text-amber-500" /> Missões Ativas
              </h3>

              <div className="space-y-3">
                {missions.map((m) => (
                  <div
                    key={m.id}
                    className={`bg-white border rounded-3xl p-4 flex items-center justify-between transition ${
                      m.done ? "border-emerald-200 bg-emerald-50/20" : "border-slate-200"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <strong className="text-xs text-slate-800 block">{m.title}</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">{m.desc}</span>
                      <span className="text-[9px] font-bold text-amber-700 font-mono">+{m.rewardPoints} pts</span>
                    </div>

                    {m.done ? (
                      <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                    ) : (
                      <button
                        onClick={async () => {
                          await addPoints(m.rewardPoints);
                        }}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 font-bold text-[9px] rounded-xl border border-amber-100 transition cursor-pointer"
                      >
                        Completar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
