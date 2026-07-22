import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { ShieldAlert } from "lucide-react";

export default function OAuthClientsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">OAuth 2.1 Clients</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Gerencie credenciais OAuth 2.1 para fluxos de Authorization Code com PKCE e Client Credentials.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500 font-semibold my-4">Nenhum cliente OAuth cadastrado.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
