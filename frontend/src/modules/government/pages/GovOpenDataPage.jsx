import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Database, Key, FileJson, MapPin } from "lucide-react";

export default function GovOpenDataPage() {
  const datasets = [
    { title: "Geolocalização dos Pontos de Ônibus", format: "GeoJSON", size: "2.4 MB", updated: "2026-07-20", downloads: 1450 },
    { title: "Fluxo de Turistas Mensal", format: "CSV", size: "850 KB", updated: "2026-07-15", downloads: 890 },
    { title: "Orçamento Executado Consolidade", format: "JSON", size: "4.1 MB", updated: "2026-07-23", downloads: 2310 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Portal de Dados Abertos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Catálogos, arquivos estruturados e APIs públicas do município de Curitiba para livre integração.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-purple-700 font-bold">
            <Key size={18} />
            <h3 className="text-sm font-bold text-slate-900 my-0">Chaves de API Públicas</h3>
          </div>
          <p className="text-slate-500 my-0">
            Desenvolvedores podem acessar os endpoints REST e GraphQL de produção registrando uma chave na aba de integrações.
          </p>
          <div className="flex gap-2">
            <button className="px-3 h-8 bg-purple-700 text-white font-bold rounded-lg border-none hover:bg-purple-800 cursor-pointer">
              Gerenciar Credenciais API
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 my-0">Arquivos Disponíveis</h3>
          <div className="grid grid-cols-1 gap-3">
            {datasets.map((set, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-700 border border-slate-100">
                    <Database size={16} />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">{set.title}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                      Atualizado em: {set.updated} | Downloads: {set.downloads}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-purple-700 bg-purple-50 rounded-full">
                    {set.format} ({set.size})
                  </span>
                  <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 border border-slate-200 cursor-pointer">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
