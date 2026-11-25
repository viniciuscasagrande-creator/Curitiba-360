import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Database, RefreshCw, BarChart2, CheckCircle, Play, FileSpreadsheet } from "lucide-react";

export default function BIDatasetsPage() {
  const [syncingId, setSyncingId] = useState(null);

  const initialDatasets = [
    {
      id: "ds-001",
      name: "fato_vendas_ingressos",
      type: "Fato (Data Warehouse)",
      rows: "2.4M",
      size: "820 MB",
      lastSync: new Date().toISOString(),
      status: "synced",
      schema: [
        { field: "venda_id", type: "STRING (PK)" },
        { field: "turista_id", type: "STRING (FK)" },
        { field: "evento_id", type: "STRING (FK)" },
        { field: "valor_pago", type: "NUMERIC" },
        { field: "data_compra", type: "TIMESTAMP" }
      ]
    },
    {
      id: "ds-002",
      name: "dim_turistas_segmentacao",
      type: "Dimensão (Data Warehouse)",
      rows: "150K",
      size: "45 MB",
      lastSync: new Date(Date.now() - 3600000).toISOString(),
      status: "synced",
      schema: [
        { field: "turista_id", type: "STRING (PK)" },
        { field: "faixa_etaria", type: "STRING" },
        { field: "nps_classificacao", type: "STRING" },
        { field: "cidade_origem", type: "STRING" }
      ]
    },
    {
      id: "ds-003",
      name: "fato_acesso_smart_venue",
      type: "Fato (Data Lake - Raw)",
      rows: "12.8M",
      size: "4.2 GB",
      lastSync: new Date(Date.now() - 7200000).toISOString(),
      status: "pending_sync",
      schema: [
        { field: "log_id", type: "STRING (PK)" },
        { field: "sensor_id", type: "STRING" },
        { field: "timestamp_entrada", type: "TIMESTAMP" }
      ]
    }
  ];

  const [datasets, setDatasets] = useState(initialDatasets);

  const handleSync = (id) => {
    setSyncingId(id);
    setTimeout(() => {
      setDatasets(prev =>
        prev.map(ds => (ds.id === id ? { ...ds, lastSync: new Date().toISOString(), status: "synced" } : ds))
      );
      setSyncingId(null);
      alert("Pipeline de ETL/ELT concluída com sucesso no BigQuery!");
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Data Lake & Datasets Corporativos</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerencie tabelas fatos e dimensões do Data Warehouse, sincronização BigQuery e filas de ETL/ELT.</p>
        </div>

        {/* Datasets List & Schema Inspector */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Modelos e Conjuntos de Dados</h3>
            <div className="space-y-4">
              {datasets.map(ds => (
                <div key={ds.id} className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="text-purple-600" size={24} />
                      <div>
                        <h4 className="font-bold text-slate-900 my-0">{ds.name}</h4>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 mt-1 inline-block">
                          {ds.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSync(ds.id)}
                      disabled={syncingId === ds.id}
                      className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold border cursor-pointer transition ${syncingId === ds.id ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-purple-700 text-white border-none hover:bg-purple-800'}`}
                    >
                      <RefreshCw size={14} className={syncingId === ds.id ? "animate-spin" : ""} />
                      {syncingId === ds.id ? "Sincronizando..." : "Executar ETL"}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Registros</span>
                      <span className="font-bold text-slate-800 mt-1 block">{ds.rows}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Tamanho Físico</span>
                      <span className="font-bold text-slate-800 mt-1 block">{ds.size}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Última Carga</span>
                      <span className="font-bold text-slate-800 mt-1 block">
                        {new Date(ds.lastSync).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Schema fields */}
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Esquema da Tabela</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      {ds.schema.map((sch, sIdx) => (
                        <div key={sIdx} className="flex justify-between border-b border-slate-200/60 pb-1">
                          <span className="font-bold text-slate-700">{sch.field}</span>
                          <span className="text-slate-500">{sch.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BigQuery Integration & Stats */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 my-0">Integração BigQuery</h3>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800">
                <CheckCircle className="flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs my-0">Conexão Ativa</h4>
                  <p className="text-[10px] text-emerald-700 mt-0.5">Catálogo de dados e credenciais OAuth2 do Google Cloud Platform validadas.</p>
                </div>
              </div>
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-semibold">Região do Data Warehouse</span>
                  <span className="font-bold text-slate-800">southamerica-east1 (SP)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-semibold">Custo de Queries (Mensal)</span>
                  <span className="font-bold text-slate-800">US$ 14,20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">SLA de Disponibilidade</span>
                  <span className="font-bold text-emerald-700">99.99%</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </AdminLayout>
  );
}
