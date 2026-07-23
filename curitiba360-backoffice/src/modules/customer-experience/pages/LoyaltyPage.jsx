import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Plus } from "lucide-react";

export default function LoyaltyPage() {
  const { summary, loyaltyTransactions, coupons, saveCoupon, loading } = useExperienceDashboard();
  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState(10);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return;
    saveCoupon({
      code,
      name: `Desconto Promocional ${code}`,
      discountType: "percentage",
      discountValue: Number(discountValue),
      validFrom: "2026-01-01",
      validUntil: "2026-12-31"
    });
    setCode("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de fidelidade...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fidelidade, Cashback & Cupons</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o saldo total acumulado de pontos dos embaixadores, cashback de faturamento de bilheteria e parametrização de cupons.
          </p>
        </div>

        {/* Loyalty KPIs */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Pontos Totais Acumulados</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.loyaltyMembers.toLocaleString()} embaixadores ativos</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Saldo de Cashback Disponível</span>
            <span className="text-2xl font-extrabold text-emerald-700 block">R$ {summary.cashbackAvailable.toLocaleString()}</span>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Award size={14} className="text-purple-755" /> Cadastrar Cupom
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Código do Cupom</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex: PARQUE15"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Valor de Desconto (%)</label>
              <input
                type="number"
                required
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Cupom
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Cupom cadastrado!</span>}
          </form>

          {/* List of coupons & transactions */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Cupons Habilitados</h3>
            <div className="divide-y divide-slate-100">
              {coupons.map(coup => (
                <div key={coup.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{coup.code}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Desconto: {coup.discountValue}% | Validade: {coup.validUntil}</span>
                  </div>

                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase shrink-0">
                    {coup.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
