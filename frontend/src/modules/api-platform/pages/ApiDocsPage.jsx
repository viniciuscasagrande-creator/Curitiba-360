import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { FileCode, Download } from "lucide-react";

export default function ApiDocsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Documentação da API & SDKs</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Referência completa de endpoints OpenAPI 3.1 e downloads de SDKs oficiais (JavaScript, Python, PHP, Java).</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <FileCode size={22} className="text-emerald-700" />
            <span className="text-sm font-semibold text-slate-900">Postman Collection Curitiba 360</span>
          </div>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-700 px-4 text-xs font-bold text-white hover:bg-emerald-800 transition cursor-pointer border-none">
            <Download size={14} />
            Baixar JSON
          </button>
        </section>
      </div>
    </AdminLayout>
  );
}
