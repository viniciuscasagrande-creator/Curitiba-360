import React from "react";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Configurações Gerais do Sistema</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Gerencie taxas globais, reservas financeiras, prazos de liquidação de repasses e limites operacionais da plataforma.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
