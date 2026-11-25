import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function PromptManagementPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Gestão de Prompts & IA</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Crie templates de prompts, edite temperaturas e configure limites de tokens por agente cognitivo.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500 font-semibold my-4">Selecione o modelo LLM do AI Gateway para configurar as diretrizes sistêmicas (System Prompts).</p>
        </section>
      </div>
    </AdminLayout>
  );
}
