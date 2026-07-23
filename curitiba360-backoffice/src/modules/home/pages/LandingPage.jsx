import React from "react";
import { Link } from "react-router-dom";
import { Compass, Sparkles, Calendar, Heart, Shield } from "lucide-react";
import { ROUTES } from "../../../routes/routePaths";

export function LandingPage() {
  return (
    <div className="space-y-12 py-8 text-left select-none">
      {/* Hero section */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-r from-red-950/20 via-slate-950 to-slate-950 p-8 md:p-12 shadow-2xl">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-600/10 blur-[80px] pointer-events-none" />
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 border border-red-500/20 px-3 py-1 text-xs text-red-400 font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Hub de Turismo & Eventos
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight md:text-5xl">
            Curitiba 360: A Cidade na Sua Mão
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            Acesse ingressos, agende visitas a parques e pontos turísticos, gerencie seu saldo e ganhe cashback cidadão em um ecossistema integrado.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={ROUTES.public.explore}
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-6 py-3 transition shadow-md shadow-red-600/15"
            >
              Explorar Cidade
            </Link>
            <Link
              to={ROUTES.public.login}
              className="rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-200 font-medium text-sm px-6 py-3 transition"
            >
              Acessar Minha Conta
            </Link>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-800 bg-[#131720] p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
            <Compass size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Turismo Inteligente</h3>
          <p className="text-sm text-gray-400">Agende visitas à Estufa do Jardim Botânico e garanta acesso prioritário sem filas.</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-[#131720] p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
            <Calendar size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Eventos & Cultura</h3>
          <p className="text-sm text-gray-400">Compre ingressos para o Festival de Teatro e shows no Pedreira Paulo Leminski.</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-[#131720] p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
            <Shield size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Identidade Única</h3>
          <p className="text-sm text-gray-400">Um login único unificado integrado ao governo digital e à sua carteira local.</p>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
