import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useQualityDashboard } from "../hooks/useQualityDashboard";
import { Cpu, CheckCircle } from "lucide-react";

export default function PerformancePage() {
  const { performance, loading } = useQualityDashboard();

  if (loading || !performance) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores de desempenho...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Desempenho & Performance</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">
            Acompanhe o tamanho dos bundles, consumo de memória e métricas vitais web (Core Web Vitals) obtidas em testes de stress.
          </p>
        </div>

        {/* Core Web Vitals grid */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Largest Contentful Paint (LCP)</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{performance.lcpSeconds}s</span>
            <span className="text-[10px] text-emerald-600 block">Excelente (Limite: 2.5s)</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Cumulative Layout Shift (CLS)</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{performance.cls}</span>
            <span className="text-[10px] text-emerald-600 block">Excelente (Limite: 0.1)</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Interaction to Next Paint (INP)</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{performance.inpMs}ms</span>
            <span className="text-[10px] text-emerald-600 block">Excelente (Limite: 200ms)</span>
          </div>
        </section>

        {/* Bundle metrics */}
        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Tamanho de Bundle & Consumo de Memória</h3>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Tamanho do Bundle de Produção</span>
              <strong className="text-slate-800">{(performance.bundleSizeBytes / (1024 * 1024)).toFixed(2)} MB</strong>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Uso de Memória Heap de Referência</span>
              <strong className="text-slate-800">{performance.memoryUsageMB} MB</strong>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Frequência de Quadros (FPS)</span>
              <strong className="text-slate-800">{performance.fps} FPS</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
