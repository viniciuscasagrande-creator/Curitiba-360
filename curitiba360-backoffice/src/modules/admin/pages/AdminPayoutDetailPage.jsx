import React from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminPayoutDetailPage() {
  const { payoutId } = useParams();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Ficha de Revisão de Repasse</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Identificação do ID de Repasse: {payoutId || "demo"}</p>
        </section>
      </div>
    </AdminLayout>
  );
}
