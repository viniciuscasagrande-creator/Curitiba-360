import React from "react";
import { ArrowRight, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

export default function PartnerLandingPage() {
  return (
    <HomeLayout header={<HomeHeader />} bottomNavigation={<BottomNavigation />}>
      <div className="mx-auto max-w-5xl px-4 py-12 select-none text-left space-y-12">
        <section className="text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
            <Building2 size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-955 my-0">
            Seja um parceiro Curitiba 360
          </h1>
          <p className="mx-auto max-w-2xl text-slate-600 my-0">
            Divulgue seus eventos, gerencie suas atrações turísticas e alavanque suas vendas na plataforma oficial de turismo e experiências da cidade.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/parceiro/cadastro"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white text-decoration-none hover:bg-slate-800 transition"
            >
              Criar conta de parceiro
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          <div className="border border-slate-200 rounded-3xl p-6 bg-white shadow-sm space-y-3">
            <ShieldCheck size={24} className="text-emerald-700" />
            <h3 className="font-bold text-slate-950 my-0">Ambiente Seguro</h3>
            <p className="text-sm text-slate-500 my-0">Acesso via regras de RBAC e auditoria completa das transações.</p>
          </div>
          <div className="border border-slate-200 rounded-3xl p-6 bg-white shadow-sm space-y-3">
            <CheckCircle2 size={24} className="text-blue-700" />
            <h3 className="font-bold text-slate-955 my-0">Fácil Integração</h3>
            <p className="text-sm text-slate-500 my-0">Cadastre atrações turísticas e produtores de eventos com poucos passos.</p>
          </div>
          <div className="border border-slate-200 rounded-3xl p-6 bg-white shadow-sm space-y-3">
            <Building2 size={24} className="text-purple-700" />
            <h3 className="font-bold text-slate-955 my-0">Gestão de Equipes</h3>
            <p className="text-sm text-slate-500 my-0">Convide administradores, operadores e financeiros com permissões finas.</p>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
