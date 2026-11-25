import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import MobilityCard from "../components/MobilityCard";
import { useMobility } from "../hooks/useMobility";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Search, HelpCircle, MapPin } from "lucide-react";

export default function MobilityPage() {
  const { lines, loading, calculateRoute } = useMobility();
  const [origin, setOrigin] = useState("Centro");
  const [destination, setDestination] = useState("Jardim Botânico");
  const [routeResult, setRouteResult] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = async () => {
    setCalculating(true);
    const res = await calculateRoute(origin, destination);
    if (res.success) setRouteResult(res.data);
    setCalculating(false);
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Mobilidade & Rotas</h2>
          <p className="text-[10px] text-slate-500 m-0">Consulte ônibus, patinetes, bicicletas e trace rotas inteligentes.</p>
        </div>

        {/* Route Planner Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Simulador de Rotas</h3>
          <div className="space-y-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold font-mono">DE</span>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Origem"
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold font-mono">PARA</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destino"
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>
          <button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl border-none shadow-2xs transition cursor-pointer"
          >
            {calculating ? "Calculando..." : "Traçar Rota"}
          </button>
        </div>

        {routeResult && (
          <div className="bg-slate-900 text-white p-4 rounded-3xl border border-slate-800 space-y-3 animate-fadeIn">
            <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800 pb-2">
              <strong className="text-emerald-400">Rota Recomendada</strong>
              <span>{routeResult.durationMinutes} min • R$ {routeResult.cost.toFixed(2)}</span>
            </div>
            <div className="space-y-3">
              {routeResult.modes.map((step, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold block">{step.desc}</span>
                    <span className="text-[8px] text-slate-400 font-mono">{step.duration} min de duração</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Linhas de Ônibus</h3>
          {loading ? (
            <div className="text-center py-6 text-slate-400">Buscando horários...</div>
          ) : (
            <div className="space-y-3">
              {lines.map((l) => (
                <MobilityCard key={l.id} line={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SuperAppLayout>
  );
}
