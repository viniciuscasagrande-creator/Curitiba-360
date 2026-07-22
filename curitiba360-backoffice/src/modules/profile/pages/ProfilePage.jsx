import React from "react";
import {
  ArrowLeft,
  RefreshCcw,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import ProfileDangerZone from "../components/ProfileDangerZone";
import ProfileHeader from "../components/ProfileHeader";
import ProfileLoading from "../components/ProfileLoading";
import ProfileMenu from "../components/ProfileMenu";
import ProfileStats from "../components/ProfileStats";

import {
  useProfile,
} from "../hooks/useProfile";

import {
  useAuth,
} from "../../auth/hooks/useAuth";

export default function ProfilePage() {
  const navigate = useNavigate();

  const {
    logout,
  } = useAuth();

  const {
    profile,
    loading,
    saving,
    error,
    successMessage,
    updatePhoto,
    deleteAccount,
    reload,
  } = useProfile();

  async function handleLogout() {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (logoutError) {
      console.error(logoutError);

      window.alert(
        "Não foi possível sair da conta."
      );
    }
  }

  async function handleDeleteAccount() {
    try {
      await deleteAccount();
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (deleteError) {
      console.error(deleteError);
    }
  }

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 text-left select-none">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 text-decoration-none"
            aria-label="Voltar para o início"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Minha conta
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 my-0">
              Perfil
            </h1>
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

        {!loading && profile && (
          <>
            <ProfileHeader
              profile={profile}
              saving={saving}
              onPhotoChange={
                updatePhoto
              }
            />

            <ProfileStats
              stats={{
                ...profile.stats,
                orders: JSON.parse(localStorage.getItem("curitiba360:orders") || "[]").length || profile.stats.orders || 0,
                favorites: JSON.parse(localStorage.getItem("curitiba360:favorites") || "[]").length || profile.stats.favorites || 0,
              }}
            />

            {!profile.verified && (
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h2 className="font-bold text-amber-900 my-0">
                  Confirme seu e-mail
                </h2>

                <p className="mt-2 text-sm leading-6 text-amber-800 my-0">
                  Confirme seu endereço de e-mail para liberar recursos protegidos da plataforma.
                </p>

                <button
                  type="button"
                  className="mt-4 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white border-none cursor-pointer"
                >
                  Reenviar confirmação
                </button>
              </section>
            )}

            <ProfileMenu />

            <ProfileDangerZone
              saving={saving}
              onLogout={
                handleLogout
              }
              onDeleteAccount={
                handleDeleteAccount
              }
            />
          </>
        )}
      </div>
    </HomeLayout>
  );
}
