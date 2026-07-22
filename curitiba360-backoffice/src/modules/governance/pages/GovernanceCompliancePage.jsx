import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Scale, RefreshCw, Shield, CheckCircle2, AlertTriangle, Play, HelpCircle, HardDrive } from "lucide-react";

export default function GovernanceCompliancePage() {
  const {
    summary,
    backups,
    raci,
    slaPolicies,
    changes,
    loading,
    approveChange,
    createBackup,
    triggerDrpSimulation
  } = useGovernanceDashboard();

  const [dbName, setDbName] = useState("Firestore Production");
  const [drpStatus, setDrpStatus] = useState("idle");

  const runDrpSimulation = async () => {
    setDrpStatus("running");
    await new Promise(r => setTimeout(r, 1200));
    await triggerDrpSimulation();
    setDrpStatus("succeeded");
  };

  if (loading || !summary) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white flex flex-col justify-center items-center space-y-3">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-emerald-300 font-semibold animate-pulse">Carregando Governança e Alta Disponibilidade...</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Governança, Backups & Continuidade (WF-029)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Supervisione metas de alta disponibilidade, planos de DRP, matriz RACI e conformidade com RTO/RPO estabelecidos.</p>
        </div>

        {/* SLA and RTO/RPO Metrics */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-6 border border-slate-200 rounded-3xl bg-slate-900 text-white shadow-md space-y-2 flex flex-col justify-between">
            <span className="text-[10px] text-emerald-300 font-bold block uppercase tracking-wider">Acordo de Nível de Serviço</span>
            <div>
              <h2 className="text-4xl font-extrabold my-0">{summary.overallSla}</h2>
              <span className="text-xs text-slate-400 block mt-1">Uptime consolidado global</span>
            </div>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">RTO Alvo</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.rtoMinutes} min</span>
            <span className="text-[10px] text-emerald-600 font-medium block">Objetivo de tempo de recuperação</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">RPO Alvo</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.rpoMinutes} min</span>
            <span className="text-[10px] text-emerald-600 font-medium block">Objetivo de ponto de recuperação</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">Backups Armazenados</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.backupsCount}</span>
            <span className="text-[10px] text-slate-400 block">Criptografados com AES-256</span>
          </div>
        </section>

        {/* DRP Simulation & SLA status */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <Scale size={20} />
              <h3 className="text-lg font-bold my-0">Simulação de DRP / BCP</h3>
            </div>
            <p className="text-xs text-slate-500 my-0">Realize exercícios de contingência controlada para validar redundâncias multi-região no Google Cloud e certificar integridade das réplicas.</p>
            
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={runDrpSimulation}
                disabled={drpStatus === "running"}
                className="h-9 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 rounded-xl cursor-pointer border-none transition flex items-center gap-1.5"
              >
                {drpStatus === "running" ? "Executando Teste..." : "Disparar Exercício DRP"}
              </button>
              {drpStatus === "succeeded" && (
                <span className="text-xs text-emerald-600 font-semibold">Simulação concluída com sucesso! SLA restabelecido.</span>
              )}
            </div>
          </div>

          {/* Change Management (RFCS) */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Gerenciamento de Mudanças (RFC)</h3>
            <div className="divide-y divide-slate-100">
              {changes.map(chg => (
                <div key={chg.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-800 block">{chg.description}</span>
                    <span className="text-[10px] text-slate-400 block">Solicitado por: {chg.requestedBy}</span>
                  </div>
                  {chg.status === "pending_approval" ? (
                    <button
                      onClick={() => approveChange(chg.id)}
                      className="h-7 px-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg cursor-pointer transition"
                    >
                      Aprovar RFC
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500">Aprovada</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RACI Matrix & Backup creation */}
        <section className="grid gap-6 md:grid-cols-3">
          {/* Backups Panel */}
          <div className="col-span-2 p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 my-0">Painel de Backups Automáticos</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className="h-8 px-3 text-xs border border-slate-200 rounded-xl"
                  placeholder="Nome do Banco"
                />
                <button
                  onClick={() => createBackup(dbName)}
                  className="h-8 px-3 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl border-none cursor-pointer transition flex items-center gap-1"
                >
                  <HardDrive size={12} /> Backup
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-2">
              {backups.map(bak => (
                <div key={bak.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-slate-800">{bak.database}</strong>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span>Tamanho: {bak.size}</span>
                      <span>•</span>
                      <span>Tipo: {bak.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-mono">
                      Criptografado AES-256
                    </span>
                    <span className="block text-[9px] text-slate-400 mt-1">{new Date(bak.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RACI Matrix View */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Matriz RACI Corporativa</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 text-xs">
              {raci.map(item => (
                <div key={item.id} className="border border-slate-100 rounded-2xl p-3 bg-slate-50/50 space-y-2">
                  <strong className="text-slate-900 block text-xs">{item.process}</strong>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
                    <div className="bg-slate-100 p-1 rounded">
                      <span className="text-slate-400 block font-sans">R</span>
                      <strong className="text-slate-700 truncate block" title={item.R}>{item.R}</strong>
                    </div>
                    <div className="bg-slate-100 p-1 rounded">
                      <span className="text-slate-400 block font-sans">A</span>
                      <strong className="text-slate-700 truncate block" title={item.A}>{item.A}</strong>
                    </div>
                    <div className="bg-slate-100 p-1 rounded">
                      <span className="text-slate-400 block font-sans">C</span>
                      <strong className="text-slate-700 truncate block" title={item.C}>{item.C}</strong>
                    </div>
                    <div className="bg-slate-100 p-1 rounded">
                      <span className="text-slate-400 block font-sans">I</span>
                      <strong className="text-slate-700 truncate block" title={item.I}>{item.I}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
