import React, { useState } from "react";
import PartnerLayout from "../layouts/PartnerLayout";
import { usePartner } from "../hooks/usePartner";
import { updatePartnerRepository } from "../repositories/partnerRepository";
import { Settings } from "lucide-react";

export default function PartnerSettingsPage() {
  const { partner, loading, reload } = usePartner();

  const [notifications, setNotifications] = useState(partner?.settings?.notifications ?? true);
  const [automaticReports, setAutomaticReports] = useState(partner?.settings?.automaticReports ?? true);
  const [marketingEmails, setMarketingEmails] = useState(partner?.settings?.marketingEmails ?? false);

  const handleSave = async (e) => {
    e.preventDefault();
    await updatePartnerRepository({
      settings: {
        notifications,
        automaticReports,
        marketingEmails
      }
    });
    await reload();
    window.alert("Configurações atualizadas com sucesso!");
  };

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-2xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Configurações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Configurações da Conta
          </h1>
          <p className="mt-2 text-sm text-slate-650 my-0">
            Configure notificações do sistema, e-mails de marketing e relatórios automáticos.
          </p>
        </header>

        <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-955 my-0">Notificações por Push</h4>
                <p className="text-xs text-slate-500 my-0 mt-0.5">Receba alertas em tempo real sobre vendas e repasses.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="h-5 w-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-955 my-0">Relatórios Mensais Automáticos</h4>
                <p className="text-xs text-slate-500 my-0 mt-0.5">Envie o fechamento contábil e de conciliação para seu e-mail cadastrado.</p>
              </div>
              <input
                type="checkbox"
                checked={automaticReports}
                onChange={(e) => setAutomaticReports(e.target.checked)}
                className="h-5 w-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-955 my-0">E-mails de Parcerias</h4>
                <p className="text-xs text-slate-500 my-0 mt-0.5">Fique por dentro das novidades comerciais do Curitiba 360.</p>
              </div>
              <input
                type="checkbox"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
                className="h-5 w-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-955 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer transition"
          >
            <Settings size={18} />
            Salvar Configurações
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
