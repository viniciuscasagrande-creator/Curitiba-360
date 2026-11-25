import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Upload, Building2, Landmark, CheckCircle2 } from "lucide-react";
import { usePartner } from "../hooks/usePartner";
import { completeOnboardingStep, submitPartnerForReview } from "../services/partnerService";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

export default function PartnerOnboardingPage() {
  const navigate = useNavigate();
  const { partner, loading, reload } = usePartner();
  const [step, setStep] = useState(1);

  // Forms states
  const [personType, setPersonType] = useState("company");
  const [legalName, setLegalName] = useState("");
  const [docFile, setDocFile] = useState(null);

  const stepsList = [
    { id: "type", label: "Tipo de parceiro" },
    { id: "business", label: "Dados empresariais" },
    { id: "responsible", label: "Responsável" },
    { id: "address", label: "Endereço" },
    { id: "profile", label: "Perfil público" },
    { id: "documents", label: "Documentos" },
    { id: "bank", label: "Dados bancários" },
    { id: "review", label: "Revisão e envio" }
  ];

  const handleNextStep = async (stepId) => {
    await completeOnboardingStep(stepId);
    await reload();
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const handleFinish = async () => {
    try {
      await submitPartnerForReview();
      await reload();
      window.alert("Cadastro enviado para revisão com sucesso! Nosso time analisará em até 48 horas.");
      navigate("/parceiro/dashboard");
    } catch (err) {
      window.alert(err.message || "Erro ao finalizar.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 select-none">
        <div className="mx-auto h-72 max-w-5xl animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <HomeLayout header={<HomeHeader />} bottomNavigation={<BottomNavigation />}>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 select-none text-left">
        <header>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <Building2 size={18} />
            <span className="text-xs uppercase tracking-wider">Passo {step} de 8</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
            Onboarding Comercial
          </h1>
          <p className="mt-1 text-sm text-slate-500 my-0">
            Preencha os dados necessários para que possamos validar e aprovar sua conta.
          </p>
        </header>

        {/* Stepper progress */}
        <section className="grid grid-cols-8 gap-2">
          {stepsList.map((s, idx) => {
            const isCompleted = partner?.onboarding?.completedSteps?.includes(s.id);
            const isActive = step === idx + 1;

            return (
              <div
                key={s.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted ? "bg-emerald-600" : isActive ? "bg-slate-900" : "bg-slate-200"
                }`}
                title={s.label}
              />
            );
          })}
        </section>

        {/* Steps contents */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
          <div>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-950 my-0">Qual o tipo do seu estabelecimento?</h3>
                <p className="text-sm text-slate-505 my-0">Selecione o segmento comercial da sua empresa.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleNextStep("type")}
                    className="border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl p-5 text-left transition select-none cursor-pointer"
                  >
                    <Building2 size={24} className="text-emerald-700 mb-2" />
                    <strong className="text-slate-955 block">Produtor de Eventos</strong>
                    <span className="text-xs text-slate-500 block mt-1">Shows, feiras, teatros e congressos.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNextStep("type")}
                    className="border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 text-left transition select-none cursor-pointer bg-white"
                  >
                    <Landmark size={24} className="text-slate-700 mb-2" />
                    <strong className="text-slate-955 block">Atrativo Turístico</strong>
                    <span className="text-xs text-slate-500 block mt-1">Museus, passeios e pontos de visitação.</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-955 my-0">Dados Empresariais</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Razão Social</label>
                    <input
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value)}
                      placeholder="Ex: Eventos LTDA"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-955 my-0">Responsável Legal</h3>
                <p className="text-sm text-slate-500 my-0">Insira as informações de contato do representante legal.</p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-955 my-0">Endereço Comercial</h3>
                <p className="text-sm text-slate-500 my-0">Endereço onde está sediada a sua empresa.</p>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-955 my-0">Perfil Público</h3>
                <p className="text-sm text-slate-500 my-0">Configure como o público verá a sua marca no app.</p>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-955 my-0">Upload de Documentos</h3>
                <p className="text-sm text-slate-500 my-0">Faça o upload do Contrato Social / Cartão CNPJ para validação.</p>
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer select-none">
                  <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                  <span className="text-sm font-semibold text-slate-700 block">Clique para fazer upload</span>
                  <span className="text-xs text-slate-450 block mt-1">Apenas PDF, PNG ou JPG de até 5MB</span>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-955 my-0">Dados Bancários para Repasses</h3>
                <p className="text-sm text-slate-505 my-0">Informe a conta bancária vinculada ao mesmo CNPJ/CPF do cadastro.</p>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-4 text-center">
                <CheckCircle2 size={48} className="mx-auto text-emerald-600 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-955 my-0">Tudo pronto para envio!</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto my-0">
                  Revise todas as etapas anteriores e clique no botão abaixo para enviar sua solicitação de análise comercial.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center gap-3 pt-6 border-t border-slate-100 mt-8">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-50 transition"
            >
              Voltar
            </button>
            {step < 8 ? (
              <button
                type="button"
                onClick={() => handleNextStep(stepsList[step - 1].id)}
                className="h-11 rounded-xl bg-slate-950 text-white px-5 text-sm font-bold hover:bg-slate-800 transition cursor-pointer border-none"
              >
                Avançar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-5 text-sm font-bold transition cursor-pointer border-none"
              >
                Enviar para Análise
              </button>
            )}
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
