import React, { useState, useEffect } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { biService } from "../services/biService";
import { Play, RefreshCw, Layers, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function BIPipelinesPage() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPipelines = () => {
    biService.getPipelines().then(res => {
      if (res.success) setPipelines(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPipelines();

    // Listen to changes emitted by triggering execution
    const handleChanged = () => fetchPipelines();
    window.addEventListener("curitiba360:bi-data-changed", handleChanged);
    return () => window.removeEventListener("curitiba360:bi-data-changed", handleChanged);
  }, []);

  const handleTrigger = (id) => {
    biService.triggerPipelineRun(id);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "succeeded":
        return <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200"><CheckCircle2 size={12} /> Sucesso</span>;
      case "running":
        return <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-bold border border-purple-200 animate-pulse"><RefreshCw size={12} className="animate-spin" /> Rodando</span>;
      case "failed":
        return <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-bold border border-red-200"><XCircle size={12} /> Falhou</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full font-bold border border-slate-200"><Clock size={12} /> Aguardando</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fila de Pipelines de Ingestão (ETL/ELT)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore as esteiras de processamento que extraem dados das fontes, refinando pelas camadas Bronze, Silver e Gold.</p>
        </div>

        {/* Camadas do Data Lake Telemetry */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-600">
              <Layers size={20} />
              <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider">Camada Bronze</h3>
            </div>
            <p className="text-xs text-slate-500 my-0">Dados brutos, persistência de histórico e webhooks preservados na íntegra.</p>
            <div className="pt-2 flex justify-between text-xs border-t border-slate-100">
              <span className="text-slate-400">Total Armazenado</span>
              <span className="font-bold text-slate-800">42.8 GB</span>
            </div>
          </div>

          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-600">
              <Layers size={20} />
              <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider">Camada Silver</h3>
            </div>
            <p className="text-xs text-slate-500 my-0">Dados limpos, normalizados e com dados sensíveis mascarados (LGPD).</p>
            <div className="pt-2 flex justify-between text-xs border-t border-slate-100">
              <span className="text-slate-400">Total Armazenado</span>
              <span className="font-bold text-slate-800">18.5 GB</span>
            </div>
          </div>

          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600">
              <Layers size={20} />
              <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider">Camada Gold</h3>
            </div>
            <p className="text-xs text-slate-500 my-0">Tabelas dimensionais e datamarts prontos para BI e modelos de IA.</p>
            <div className="pt-2 flex justify-between text-xs border-t border-slate-100">
              <span className="text-slate-400">Total Armazenado</span>
              <span className="font-bold text-slate-800">4.2 GB</span>
            </div>
          </div>
        </section>

        {/* Pipelines list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Esteiras Ativas</h3>
          {loading ? (
            <div className="text-center py-6 text-xs text-slate-400">Carregando esteiras...</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pipelines.map(pipe => (
                <div key={pipe.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 text-sm">{pipe.name}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {pipe.mode.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 my-0">Origem: <span className="font-mono">{pipe.source}</span> ➔ Destino: <span className="font-mono">{pipe.destination}</span></p>
                    <div className="flex items-center gap-6 text-[10px] text-slate-400 mt-2">
                      <span>Registros: <strong className="text-slate-600">{pipe.processedRecords}</strong></span>
                      <span>Rejeitados: <strong className="text-red-500">{pipe.rejectedRecords}</strong></span>
                      {pipe.lastSuccessfulRunAt && <span>Último sucesso: <strong className="text-slate-600">{new Date(pipe.lastSuccessfulRunAt).toLocaleTimeString()}</strong></span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(pipe.status)}
                    <button
                      onClick={() => handleTrigger(pipe.id)}
                      disabled={pipe.status === "running"}
                      className="h-8 w-8 rounded-xl border border-slate-200 inline-flex items-center justify-center hover:bg-slate-50 cursor-pointer disabled:opacity-50 transition"
                      title="Disparar Ingestão Manual"
                    >
                      <Play size={14} className="text-slate-600 fill-slate-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
