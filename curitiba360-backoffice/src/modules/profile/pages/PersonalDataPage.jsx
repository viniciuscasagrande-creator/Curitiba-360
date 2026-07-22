import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import { usePersonalData } from "../hooks/usePersonalData";
import { personalDataSchema } from "../schemas/personalDataSchema";
import PersonalDataForm from "../components/PersonalDataForm";
import AddressForm from "../components/AddressForm";
import ProfileSuccessAlert from "../components/ProfileSuccessAlert";
import ProfileErrorAlert from "../components/ProfileErrorAlert";
import ProfileLoading from "../components/ProfileLoading";

export default function PersonalDataPage() {
  const navigate = useNavigate();
  const {
    personalData,
    loading,
    saving,
    error,
    success,
    updateData,
    getAddressByCep,
    reload,
  } = usePersonalData();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      cpf: "",
      gender: "",
      address: {
        zipCode: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
    },
  });

  // Load existing data into form
  useEffect(() => {
    if (personalData) {
      reset(personalData);
    }
  }, [personalData, reset]);

  // Block unsaved changes on beforeunload (browser refresh)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Existem alterações não salvas. Deseja sair?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Intercept custom navigation
  const handleBackClick = (e) => {
    if (isDirty) {
      const confirm = window.confirm("Existem alterações não salvas. Deseja sair?");
      if (!confirm) {
        e.preventDefault();
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateData(data);
      // Reset form state isDirty to false, keeping the new saved values
      reset(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <Link
            to="/perfil"
            onClick={handleBackClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition text-decoration-none"
            aria-label="Voltar para o perfil"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 my-0">
              Configurações
            </p>
            <h1 className="text-2xl font-extrabold text-slate-955 my-0">
              Dados Pessoais
            </h1>
          </div>
        </div>

        {/* Feedback Alerts */}
        {success && (
          <ProfileSuccessAlert message="Dados pessoais atualizados com sucesso!" />
        )}
        {error && <ProfileErrorAlert message={error} />}

        {loading ? (
          <ProfileLoading />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm space-y-8"
          >
            {/* Seção Dados Pessoais */}
            <PersonalDataForm
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              isCpfLocked={!!personalData?.cpf}
            />

            {/* Seção Endereço */}
            <AddressForm
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              onLookupCep={getAddressByCep}
            />

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  if (isDirty) {
                    const confirm = window.confirm("Descartar alterações?");
                    if (confirm) {
                      reset(personalData);
                    }
                  } else {
                    navigate("/perfil");
                  }
                }}
                className="w-full sm:w-auto h-11 px-5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!isDirty || saving}
                className={[
                  "w-full sm:w-auto h-11 px-6 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2 border-none",
                  (!isDirty || saving)
                    ? "bg-slate-300 cursor-not-allowed text-slate-500"
                    : "bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
                ].join(" ")}
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        )}
      </div>
    </HomeLayout>
  );
}
