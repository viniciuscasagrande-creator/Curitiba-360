import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnersB2b } from "../hooks/usePartnersB2b";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export default function ContractsPage() {
  const { contracts, signContract, loading } = usePartnersB2b();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando contratos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Contratos & Comissionamento</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie contratos comerciais de parceiros e comissões variáveis parametrizadas para as atrações.
          </p>
        </div>

        {/* Contracts grid */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Shield size={18} className="text-purple-755 font-bold" /> Contratos Vigentes
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {contracts.map(c => (
              <div key={c.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{c.partnerName}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {c.id} | Comissão: {c.commissionPct}% | Expiração: {c.expiryDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-100 uppercase">
                    {c.status}
                  </span>
                  {c.status !== "signed" && (
                    <button onClick={() => signContract(c.id)} className="h-6 px-2 font-bold text-[9px] text-white bg-purple-700 hover:bg-purple-800 rounded cursor-pointer border-none transition">
                      Assinar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
