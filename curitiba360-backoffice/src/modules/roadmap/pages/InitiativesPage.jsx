import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useRoadmap } from "../hooks/useRoadmap";
import { Plus, CheckCircle, Clock } from "lucide-react";

export default function InitiativesPage() {
  const { initiatives, createInitiative, updateInitiativeStatus, loading } = useRoadmap();
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [strategicPillar, setStrategicPillar] = useState("Experiência do cliente");
  const [horizon, setHorizon] = useState("h1");
  const [type, setType] = useState("product");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    createInitiative({
      title,
      description: "Iniciativa cadastrada via painel administrativo.",
      strategicPillar,
      horizon,
      type,
      status: "discovery",
      ownerUserId: "usr-current",
      estimatedInvestment: 120000,
      actualInvestment: 0,
      expectedRevenue: 400000,
      actualRevenue: 0,
      impactScore: 7,
      effortScore: 4,
      riskScore: 3,
      dependencies: []
    });
    setTitle("");
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando iniciativas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Iniciativas</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Cadastre e acompanhe o andamento de projetos associados aos pilares de tecnologia, produto, marketing e dados.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
          >
            <Plus size={14} /> Nova Iniciativa
          </button>
        </div>

        {/* Quick form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl">
            <h3 className="text-sm font-bold text-slate-900 my-0">Cadastrar Nova Iniciativa</h3>
            <div className="space-y-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Título</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Multi-acquirer checkout split implementation"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Pilar Estratégico</label>
                  <select value={strategicPillar} onChange={(e) => setStrategicPillar(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                    <option value="Experiência do cliente">Experiência do cliente</option>
                    <option value="Crescimento de parceiros">Crescimento de parceiros</option>
                    <option value="Receita recorrente">Receita recorrente</option>
                    <option value="Dados e inteligência">Dados e inteligência</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Horizonte</label>
                  <select value={horizon} onChange={(e) => setHorizon(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                    <option value="h1">Horizonte 1</option>
                    <option value="h2">Horizonte 2</option>
                    <option value="h3">Horizonte 3</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Tipo</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                    <option value="product">Produto</option>
                    <option value="technology">Tecnologia</option>
                    <option value="marketing">Marketing</option>
                    <option value="expansion">Expansão</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Confirmar Iniciativa
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Initiatives List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {initiatives.map(ini => (
              <div key={ini.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-bold text-[10px] uppercase">
                      {ini.horizon.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Tipo: {ini.type}</span>
                  </div>
                  <strong className="text-slate-900 text-sm block">{ini.title}</strong>
                  <p className="text-slate-450 my-0">Pilar: <span className="font-semibold text-slate-700">{ini.strategicPillar}</span></p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 block">Progresso</span>
                    <strong className="text-slate-800 text-sm mt-0.5 block">{ini.progress}%</strong>
                  </div>
                  <select
                    value={ini.status}
                    onChange={(e) => updateInitiativeStatus(ini.id, e.target.value)}
                    className="h-8 px-2 border border-slate-200 rounded-xl bg-slate-50 font-bold text-xs"
                  >
                    <option value="idea">Ideia</option>
                    <option value="discovery">Descoberta</option>
                    <option value="planned">Planejada</option>
                    <option value="approved">Aprovada</option>
                    <option value="in_progress">Em Execução</option>
                    <option value="paused">Pausada</option>
                    <option value="completed">Concluída</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
