import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

export default function PartnerRegistrationSuccessPage() {
  return (
    <HomeLayout header={<HomeHeader />} bottomNavigation={<BottomNavigation />}>
      <div className="mx-auto max-w-md px-4 py-16 select-none text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 animate-bounce">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-955 my-0">
          Cadastro realizado!
        </h1>
        <p className="text-sm text-slate-500 my-0">
          Parabéns! Sua conta de parceiro foi criada como rascunho com sucesso. Complete as etapas de onboarding para enviar seus documentos e dados bancários para aprovação.
        </p>
        <Link
          to="/parceiro/onboarding"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white text-decoration-none hover:bg-slate-800 transition"
        >
          Iniciar Onboarding
          <ArrowRight size={17} />
        </Link>
      </div>
    </HomeLayout>
  );
}
