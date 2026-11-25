import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useRoadmap } from "../hooks/useRoadmap";
import { Cpu, CheckCircle } from "lucide-react";

export default function InnovationPage() {
  const { innovationPipeline, loading } = useRoadmap();

  const mockConcepts = [
    { name: "Beacons de Proximidade (Parques)", status: "Triagem", desc: "Sensores bluetooth para alertar pontos de interesse no App automaticamente." },
    { name: "Visualização Virtual 360 (Hotéis)", status: "Pesquisa", desc: "Totens interativos e óculos VR na recepção dos hotéis parceiros." },
    { name: "Preços Dinâmicos por Demanda", status: "Protótipo", desc: "Algoritmos ML para ajustar taxas de ingressos conforme lotação e clima." }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando pipeline de inovação...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Pipeline de Inovação & IoT</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a triagem de ideias disruptivas (Gêmeos Digitais, Realidade Aumentada e Sensoreamento IoT) em estágio de protótipo.
          </p>
        </div>

        {/* Funnel Pipeline list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-2">
            <Cpu size={18} className="text-purple-700" /> Funnel de Conceitos Ativos
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {innovationPipeline.map(item => (
              <div key={item.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                <div>
                  <strong className="text-slate-900 text-sm">{item.title}</strong>
                  <p className="text-slate-500 mt-0.5 my-0">{item.description}</p>
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded border border-purple-200 uppercase">
                  {item.stage}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Mapped Future Concepts */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Pesquisas IoT & AR Mapeadas</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {mockConcepts.map((c, idx) => (
              <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 text-xs space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">{c.status}</span>
                <strong className="text-slate-900 text-sm block">{c.name}</strong>
                <p className="text-slate-505 my-0 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
