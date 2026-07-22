import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOrganizations } from "../hooks/useOrganizations";
import { Landmark, Users, Calendar, ShieldCheck, Activity } from "lucide-react";

export default function OrganizationDashboardPage() {
  const { activeOrg, loading } = useOrganizations();

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  if (!activeOrg) {
    return (
      <AdminLayout>
        <section className="p-6 bg-slate-50 border rounded-3xl text-slate-600">
          Nenhuma organização selecionada no momento.
        </section>
      </AdminLayout>
    );
  }

  const { billing } = activeOrg;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Painel do Tenant: {activeOrg.name}</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Ambiente de gestão de faturamento, limites e White Label da organização ativa.</p>
        </div>

        {/* Plan Limits & Billing Info */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 my-0">Consumo de Limites</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-600 mb-1">
                  <span>Usuários</span>
                  <span>{billing.usage.users} / {billing.usage.usersLimit}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${(billing.usage.users / billing.usage.usersLimit) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-600 mb-1">
                  <span>Eventos Ativos</span>
                  <span>{billing.usage.events} / {billing.usage.eventsLimit}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${(billing.usage.events / billing.usage.eventsLimit) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-600 mb-1">
                  <span>Requisições de API</span>
                  <span>{billing.usage.apiRequests.toLocaleString()} / {billing.usage.apiLimit.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${(billing.usage.apiRequests / billing.usage.apiLimit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 my-0">Faturamento</h3>
              <p className="text-xs text-slate-500 my-0 mt-1">Status financeiro do plano de assinatura.</p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-500 my-0">Plano Atual</p>
                <p className="text-2xl font-bold text-emerald-700 my-0 mt-1">{billing.planName}</p>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4 mt-6">
              <span className="text-xs text-slate-505 block">Próximo Vencimento</span>
              <span className="text-sm font-bold text-slate-800 block mt-1">{billing.nextBilling}</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
