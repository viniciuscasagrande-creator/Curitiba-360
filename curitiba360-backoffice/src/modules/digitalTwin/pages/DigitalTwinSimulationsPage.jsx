import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";

export default function DigitalTwinSimulationsPage() {
  const { runSimulation, loading } = useDigitalTwin();
  const [type, setType] = useState("rain");
  const [success, setSuccess] = useState(false);

  const handleSimulate = (e) => {
    e.preventDefault();
    runSimulation(type, {});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando simulador...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Simulador de Cenários & Obras Públicas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Simule impactos urbanos de novos desvios viários, obras estruturais ou eventos climáticos extremos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Simulation Form */}
          <form onSubmit={handleSimulate} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Play size={14} className="text-purple-755" /> Iniciar Cenário
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Cenário de Teste</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="rain">Alagamento de Canaletas Centrais</option>
                <option value="construction">Bloqueio da Linha Verde (Obras)</option>
                <option value="crowd">Festival de Natal Curitibano (200k paxs)</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Simular Impacto
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center font-sans">Simulação processada com sucesso!</span>}
          </form>

          {/* Simulation details */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Histórico de Modelagens</h3>
            <div className="p-4 bg-purple-50 rounded-2xl flex justify-between items-center text-sans font-sans border border-purple-100">
              <div>
                <strong className="text-slate-900 text-xs block">Simulação de Fluxo Logístico</strong>
                <span className="text-[10px] text-slate-505 block">Processamento de redirecionamento de ônibus biarticulados devido à interdição da Visconde de Guarapuava.</span>
              </div>
              <strong className="text-purple-700 text-xs font-mono">Concluído</strong>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
