import React from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import BenefitCard from "../components/BenefitCard";
import { useBenefits } from "../hooks/useBenefits";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BenefitsPage() {
  const { benefits, loading } = useBenefits();

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Clube de Benefícios</h2>
          <p className="text-[10px] text-slate-500 m-0">Descontos exclusivos e cashback diferenciado para moradores e visitantes autenticados.</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Carregando clube...</div>
        ) : (
          <div className="space-y-3">
            {benefits.map((b) => (
              <BenefitCard key={b.id} benefit={b} />
            ))}
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
