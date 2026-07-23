import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Compass, Calendar, CheckSquare } from "lucide-react";

export default function StrategicRoadmapPage() {
  const horizons = [
    {
      id: "h1",
      title: "Horizonte 1 — Consolidação",
      period: "2026–2027",
      description: "Foco no amadurecimento operacional e infraestrutura robusta do core business.",
      items: ["Estabilidade do Checkout & Pix", "App Mobile do Cliente (Android/iOS)", "Métricas de BI & Data Lake", "Segurança Estática (SAST/SCA)"]
    },
    {
      id: "h2",
      title: "Horizonte 2 — Expansão Regional",
      period: "2027–2028",
      description: "Escalar a plataforma para novas praças territoriais e expor APIs públicas de consumo.",
      items: ["Lançamento de Pilotos Metropolitanos", "APIs & Webhooks para Desenvolvedores", "Curitiba 360 Pass (Passe Turístico)", "IA de Recomendação Personalizada"]
    },
    {
      id: "h3",
      title: "Horizonte 3 — Ecossistema Conectado",
      period: "2028–2030",
      description: "Transformar a aplicação em um hub de Open Data urbano integrado com IoT e Digital Twins.",
      items: ["Realidade Aumentada (Guias Históricos)", "Sensores de Ocupação de Atrativos (IoT)", "Integração de Mobilidade Urbana", "Digital Twin do Centro Histórico"]
    }
  ];

  const pillars = [
    "Experiência do cliente",
    "Crescimento de parceiros",
    "Receita recorrente",
    "Dados e inteligência",
    "Plataforma tecnológica",
    "Expansão territorial"
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Roadmap Estratégico (Horizontes)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o cronograma macro de transformação plurianual do superapp e as metas associadas a cada ciclo.
          </p>
        </div>

        {/* Horizons Timelines */}
        <section className="space-y-6">
          {horizons.map(h => (
            <div key={h.id} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 my-0">{h.title}</h3>
                  <span className="text-xs text-slate-450 block mt-0.5">{h.description}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full font-bold text-xs">
                  <Calendar size={12} /> {h.period}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {h.items.map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex items-start gap-2">
                    <CheckSquare size={14} className="text-purple-600 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Strategic Pillars */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold my-0">Pilares Estratégicos</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((p, idx) => (
              <div key={idx} className="p-4 border border-slate-800 rounded-2xl bg-slate-850 text-xs font-bold uppercase tracking-wider text-slate-300">
                {p}
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
