import React from "react";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminLGPDPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Compliance LGPD & Privacidade</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Acompanhe solicitações de portabilidade de dados, revogações de consentimentos, exclusões ou anonimizações cadastrais.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
