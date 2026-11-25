import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, AlertCircle } from "lucide-react";

export default function ScenarioSimulatorPage() {
  const { summary, triggerSimulation, loading } = useSmartCityDashboard();
  const [type, setType] = useState("rain");
  const [success, setSuccess] = useState(false);

  const handleSimulate = (e) => {
    e.preventDefault();
    triggerSimulation(type, {});
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
        <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Simulador de Cenários Urbanos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Simule impactos de picos de público em festivais, panes elétricas ou índices elevados de pluviosidade na infraestrutura da cidade.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Simulation Form */}
          <form onSubmit={handleSimulate} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Play size={14} className="text-purple-755" /> Iniciar Simulação
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Cenário de Teste</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="rain">Chuvas Fortes (Barigui Transbordamento)</option>
                <option value="festival">Festival 50k paxs (Lotação Crítica)</option>
                <option value="blackout">Pane Elétrica Centro Cívico</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Rodar Simulação IA
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Simulação executada!</span>}
          </form>

          {/* Active simulations stats */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Simulações Ativas</h3>
            <div className="p-4 bg-purple-50 rounded-2xl flex justify-between items-center text-sans font-sans border border-purple-100">
              <div>
                <strong className="text-slate-900 text-xs block">Simulação de Impacto Climático</strong>
                <span className="text-[10px] text-slate-505 block">Processamento de escoamento hidráulico nos rios Barigui e Belém.</span>
              </div>
              <strong className="text-purple-700 text-xs font-mono">{summary.activeSimulations} Simulações</strong>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
