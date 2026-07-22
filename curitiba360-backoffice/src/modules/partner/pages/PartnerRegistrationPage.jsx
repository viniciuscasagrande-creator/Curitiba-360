import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { partnerRegistrationSchema } from "../schemas/partnerRegistrationSchema";
import { PARTNER_TYPES } from "../constants/partnerTypes";
import { replacePartnerRepository } from "../repositories/partnerRepository";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

export default function PartnerRegistrationPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(partnerRegistrationSchema),
    defaultValues: {
      type: "event_producer"
    }
  });

  const onSubmit = async (data) => {
    const newPartner = {
      id: `partner-${Date.now()}`,
      ownerUserId: "user-demo",
      type: data.type,
      status: "draft", // Start as draft for onboarding
      legal: {
        personType: data.document.length > 11 ? "company" : "individual",
        legalName: data.legalName,
        tradeName: data.tradeName,
        document: data.document,
        stateRegistration: null,
        municipalRegistration: null,
      },
      contact: {
        responsibleName: data.responsibleName,
        email: data.email,
        phone: data.phone,
        whatsapp: data.phone,
      },
      address: {
        zipCode: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "Brasil",
      },
      profile: {
        slug: data.tradeName.toLowerCase().replace(/\s+/g, "-"),
        description: "",
        logo: null,
        coverImage: null,
        website: null,
        instagram: null,
        facebook: null,
      },
      bankAccount: null,
      verification: {
        emailVerified: false,
        documentsVerified: false,
        bankAccountVerified: false,
        identityVerified: false,
      },
      onboarding: {
        currentStep: 1,
        completedSteps: ["type"],
        percentage: 12,
      },
      settings: {
        notifications: true,
        automaticReports: true,
        marketingEmails: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      approvedAt: null,
    };

    await replacePartnerRepository(newPartner);
    navigate("/parceiro/cadastro/sucesso");
  };

  return (
    <HomeLayout header={<HomeHeader />} bottomNavigation={<BottomNavigation />}>
      <div className="mx-auto max-w-2xl px-4 py-8 select-none text-left space-y-6">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-955 my-0">
              Quero ser parceiro
            </h1>
            <p className="mt-1 text-sm text-slate-500 my-0">
              Preencha os dados abaixo para iniciar sua jornada comercial.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Parceiro</label>
            <select
              {...register("type")}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            >
              {Object.entries(PARTNER_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-xs text-red-650 my-0">{errors.type.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Razão Social / Nome Completo</label>
            <input
              {...register("legalName")}
              placeholder="Ex: Minha Empresa de Eventos Ltda."
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.legalName && <p className="mt-1 text-xs text-red-650 my-0">{errors.legalName.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome Fantasia / Nome Comercial</label>
            <input
              {...register("tradeName")}
              placeholder="Ex: Curitiba Festas"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.tradeName && <p className="mt-1 text-xs text-red-650 my-0">{errors.tradeName.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">CNPJ / CPF</label>
            <input
              {...register("document")}
              placeholder="Ex: 00.000.000/0001-00"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.document && <p className="mt-1 text-xs text-red-650 my-0">{errors.document.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome do Responsável</label>
            <input
              {...register("responsibleName")}
              placeholder="Ex: João da Silva"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.responsibleName && <p className="mt-1 text-xs text-red-650 my-0">{errors.responsibleName.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">E-mail Comercial</label>
            <input
              {...register("email")}
              placeholder="Ex: contato@empresa.com.br"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.email && <p className="mt-1 text-xs text-red-650 my-0">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Telefone / WhatsApp</label>
            <input
              {...register("phone")}
              placeholder="Ex: (41) 99999-9999"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-650 my-0">{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-sm border-none cursor-pointer transition"
          >
            <Building2 size={18} />
            Cadastrar Parceiro
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
