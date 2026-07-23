import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useQualityDashboard } from "../hooks/useQualityDashboard";
import { Bug, Plus, CheckCircle, AlertCircle } from "lucide-react";

export default function BugsPage() {
  const { bugs, createBug, updateBugStatus, loading } = useQualityDashboard();
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("high");
  const [environment, setEnvironment] = useState("Web Chrome");
  const [stepsText, setStepsText] = useState("");
  const [expected, setExpected] = useState("");
  const [actual, setActual] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    createBug({
      title,
      severity,
      priority: "high",
      environment,
      steps: stepsText.split("\n").filter(Boolean),
      expected,
      actual,
      assignedTo: null,
      status: "triagem",
      screenshots: []
    });
    setTitle("");
    setStepsText("");
    setExpected("");
    setActual("");
    setShowForm(false);
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando central de bugs...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Central de Bugs (Defeitos)</h1>
            <p className="mt-2 text-sm text-slate-600 my-0">
              Gerencie a triagem, desenvolvimento e validação de defeitos identificados pela equipe de QA e produção.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
          >
            <Plus size={14} /> Reportar Bug
          </button>
        </div>

        {/* Manual report form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl">
            <h3 className="text-sm font-bold text-slate-900 my-0">Relatório de Novo Defeito</h3>
            <div className="space-y-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Título do Bug</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Erro ao submeter checkout Pix sem preencher e-mail"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Severidade</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="h-9 px-2 border border-slate-200 rounded-xl"
                  >
                    <option value="critical">Crítica</option>
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Ambiente</label>
                  <input
                    type="text"
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    className="h-9 px-3 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Passos para Reproduzir (um por linha)</label>
                <textarea
                  rows={3}
                  value={stepsText}
                  onChange={(e) => setStepsText(e.target.value)}
                  className="p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Resultado Esperado</label>
                  <input
                    type="text"
                    value={expected}
                    onChange={(e) => setExpected(e.target.value)}
                    className="h-9 px-3 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Resultado Obtido</label>
                  <input
                    type="text"
                    value={actual}
                    onChange={(e) => setActual(e.target.value)}
                    className="h-9 px-3 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Salvar Bug
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Bug list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {bugs.map(bug => (
              <div key={bug.id} className="py-4 first:pt-0 last:pb-0 text-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border capitalize ${getSeverityBadge(bug.severity)}`}>
                        {bug.severity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {bug.id}</span>
                    </div>
                    <strong className="text-slate-900 text-sm">{bug.title}</strong>
                  </div>
                  <select
                    value={bug.status}
                    onChange={(e) => updateBugStatus(bug.id, e.target.value)}
                    className="h-8 px-2 border border-slate-200 rounded-xl bg-slate-50 cursor-pointer font-bold"
                  >
                    <option value="triagem">Triagem</option>
                    <option value="em_desenvolvimento">Em Desenvolvimento</option>
                    <option value="validado">Validado</option>
                    <option value="fechado">Fechado</option>
                  </select>
                </div>

                <div className="space-y-1 font-sans text-slate-600">
                  <p className="my-0"><strong>Ambiente:</strong> {bug.environment}</p>
                  <p className="my-0"><strong>Passos:</strong> {bug.steps.join(" → ")}</p>
                  <p className="my-0 text-red-650"><strong>Obtido:</strong> {bug.actual}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
