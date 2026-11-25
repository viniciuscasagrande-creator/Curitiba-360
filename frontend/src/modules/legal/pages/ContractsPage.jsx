import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { Link } from "react-router-dom";
import { Plus, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContractsPage() {
  const { contracts, loading } = useLegalDashboard();

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
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Contratos & Aditivos</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerencie a conformidade de prazos, multas contratuais e workflows de assinaturas digitais.
            </p>
          </div>
          <Link
            to="/admin/legal/contracts/new"
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1 hover:no-underline"
          >
            <Plus size={14} /> Novo Contrato
          </Link>
        </div>

        {/* Contracts Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {contracts.map(con => (
            <div key={con.id} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                    {con.type}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded border uppercase font-bold ${con.status === "active" ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-amber-700 bg-amber-50 border-amber-100"}`}>
                    {con.status}
                  </span>
                </div>
                <strong className="text-slate-900 text-base block">{con.title}</strong>
                <span className="text-[10px] text-slate-400 font-mono block">Nº Registro: {con.number}</span>
              </div>

              <div className="border-t border-slate-50 pt-3 space-y-2 font-mono text-[10px]">
                <div className="flex justify-between text-slate-455">
                  <span>Vigência Início:</span>
                  <span className="font-bold text-slate-700">{con.effectiveDate}</span>
                </div>
                <div className="flex justify-between text-slate-455">
                  <span>Expiração:</span>
                  <span className="font-bold text-slate-700">{con.expirationDate}</span>
                </div>
                <div className="flex justify-between text-slate-455">
                  <span>Valor Estimado:</span>
                  <span className="font-bold text-emerald-650">R$ {con.value.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to={`/admin/legal/contracts/${con.id}`}
                className="h-8 w-full font-bold text-purple-750 hover:text-purple-805 bg-purple-50 hover:bg-purple-100 rounded-xl cursor-pointer transition flex items-center justify-center gap-1 hover:no-underline text-xs border border-purple-100"
              >
                Gerenciar Signatários & Termos <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
