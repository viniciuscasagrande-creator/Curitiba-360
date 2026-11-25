import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Terminal } from "lucide-react";

export default function SandboxPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Ambiente Sandbox</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Ambiente de desenvolvimento seguro e isolado para testes de integração de dados com chaves sandbox sem impactar a produção.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-3">
          <Terminal size={22} className="text-slate-500" />
          <p className="text-sm text-slate-700 font-semibold my-0">Chaves de API geradas no sandbox utilizam o endpoint: <code className="bg-slate-100 px-2 py-1 rounded text-emerald-700">https://sandbox.curitiba360.com.br/api/v1</code></p>
        </section>
      </div>
    </AdminLayout>
  );
}
