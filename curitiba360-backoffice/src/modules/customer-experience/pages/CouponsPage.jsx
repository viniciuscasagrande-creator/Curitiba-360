import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Ticket } from "lucide-react";

export default function CouponsPage() {
  const { coupons, loading } = useExperienceDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando cupons...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Cupons de Desconto & Vantagens</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie cupons ativos aplicáveis a atrações, shows e passeios integrados no portal Curitiba 360.
          </p>
        </div>

        {/* Coupons list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Ticket size={18} className="text-purple-755" /> Cupons Cadastrados
          </h3>

          <div className="divide-y divide-slate-100">
            {coupons.map(coup => (
              <div key={coup.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-sm block">{coup.code} ({coup.name})</strong>
                  <span className="text-[10px] text-slate-505 block">Desconto: {coup.discountValue}% | Validade: {coup.validFrom} a {coup.validUntil}</span>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase bg-emerald-50 text-emerald-700 border-emerald-100`}>
                  {coup.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
