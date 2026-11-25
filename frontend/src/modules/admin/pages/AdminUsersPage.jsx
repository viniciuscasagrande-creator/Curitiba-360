import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Gestão de Usuários da Plataforma</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Visualize, bloqueie, exclua ou consulte logs de auditoria de sessões ativas e dados de usuários.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
