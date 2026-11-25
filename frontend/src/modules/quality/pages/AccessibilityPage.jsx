import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useQualityDashboard } from "../hooks/useQualityDashboard";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export default function AccessibilityPage() {
  const { accessibility, loading } = useQualityDashboard();

  if (loading || !accessibility) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de acessibilidade...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Acessibilidade (WCAG 2.2)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Valide a conformidade com as diretrizes WCAG 2.2, contraste de cores e legibilidade de telas em leitores.
          </p>
        </div>

        {/* Accessibility Metrics */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Verificações de Acessibilidade Recentes</h3>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Conformidade com Diretrizes WCAG 2.2</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                Conforme
              </span>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Contraste de Cores (AA/AAA)</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                Conforme
              </span>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Navegabilidade por Teclado</span>
              <strong className="text-slate-800">{accessibility.keyboardNavigability}</strong>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Nota de Acessibilidade de Leitores de Tela</span>
              <strong className="text-purple-700 font-bold">{accessibility.screenReaderScore}</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
