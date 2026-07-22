import React from "react";
import { ArrowLeft, RefreshCcw, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import SecurityCard from "../components/SecurityCard";
import SecurityPasswordForm from "../components/SecurityPasswordForm";
import TwoFactorCard from "../components/TwoFactorCard";
import ActiveSessionsCard from "../components/ActiveSessionsCard";
import ConnectedDevices from "../components/ConnectedDevices";
import LoginHistoryCard from "../components/LoginHistoryCard";
import SecurityDangerZone from "../components/SecurityDangerZone";
import ProfileLoading from "../components/ProfileLoading";

import { useSecurity } from "../hooks/useSecurity";
import { useAuth } from "../../auth/hooks/useAuth";

export default function SecurityPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const {
    securityState,
    loading,
    saving,
    error,
    successMessage,
    changePassword,
    toggleTwoFactor,
    terminateSession,
    terminateAllSessions,
    reload,
  } = useSecurity();

  const handleExportHistory = () => {
    if (!securityState?.history) return;
    const blob = new Blob([JSON.stringify(securityState.history, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "curitiba360-historico-seguranca.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = async () => {
    try {
      // simulate account deletion
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      window.alert("Não foi possível excluir a conta.");
    }
  };

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        {/* Top Header */}
        <div className="flex items-start gap-4">
          <Link
            to="/perfil"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 text-decoration-none"
            aria-label="Voltar para o perfil"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <ShieldCheck size={18} />
              <span className="text-xs uppercase tracking-wider">
                Proteção de Conta
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Segurança
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 my-0">
              Gerencie senhas, verificação em duas etapas, sessões ativas e histórico.
            </p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700 my-0">{error}</p>
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

        {loading ? (
          <ProfileLoading />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left/Main Column - Forms & Actions */}
            <div className="space-y-6 lg:col-span-2">
              <SecurityCard state={securityState} />
              
              <SecurityPasswordForm onSave={changePassword} saving={saving} />
              
              <TwoFactorCard
                enabled={securityState?.twoFactor}
                onToggle={toggleTwoFactor}
                saving={saving}
              />
              
              <SecurityDangerZone
                onTerminateAll={terminateAllSessions}
                onExportHistory={handleExportHistory}
                onDeleteAccount={handleDeleteAccount}
                saving={saving}
              />
            </div>

            {/* Right Column - Status & Lists */}
            <div className="space-y-6 lg:col-span-1">
              <ActiveSessionsCard
                sessions={securityState?.sessions}
                onTerminate={terminateSession}
              />
              
              <ConnectedDevices devices={securityState?.devices} />
              
              <LoginHistoryCard history={securityState?.history} />
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
