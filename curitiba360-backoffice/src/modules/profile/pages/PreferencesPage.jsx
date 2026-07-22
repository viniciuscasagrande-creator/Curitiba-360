import React from "react";
import {
  ArrowLeft,
  RefreshCcw,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import PreferencesForm from "../components/PreferencesForm";
import ProfileLoading from "../components/ProfileLoading";

import {
  useProfile,
} from "../hooks/useProfile";

export default function PreferencesPage() {
  const {
    profile,
    loading,
    saving,
    error,
    successMessage,
    updatePreferences,
    reload,
  } = useProfile();

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 select-none text-left">
        <div className="flex items-start gap-4">
          <Link
            to="/perfil"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 text-decoration-none"
            aria-label="Voltar para o perfil"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <div className="flex items-center gap-2 text-emerald-700">
              <SlidersHorizontal
                size={18}
              />

              <span className="text-sm font-semibold uppercase tracking-[0.14em]">
                Personalização
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
              Preferências
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 my-0">
              Configure seus interesses, notificações e recursos de acessibilidade.
            </p>
          </div>
        </div>

        {error && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700 my-0">
              {error}
            </p>

            <button
              type="button"
              onClick={reload}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-red-700 px-4 text-sm font-semibold text-white cursor-pointer border-none"
            >
              <RefreshCcw size={16} />
              Tentar novamente
            </button>
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
          >
            {successMessage}
          </div>
        )}

        {loading && (
          <ProfileLoading />
        )}

        {!loading &&
          profile && (
            <PreferencesForm
              preferences={
                profile.preferences
              }
              saving={saving}
              onSubmit={
                updatePreferences
              }
            />
          )}
      </div>
    </HomeLayout>
  );
}
