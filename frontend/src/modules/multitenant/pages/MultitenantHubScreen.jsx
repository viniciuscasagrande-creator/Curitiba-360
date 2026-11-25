import React, { useState, useEffect } from 'react';
import { multitenantService } from '../services/multitenantService';
import TenantSelectorHeader from '../components/TenantSelectorHeader';
import OrganizationsManagerCard from '../components/OrganizationsManagerCard';
import SaasPlansGrid from '../components/SaasPlansGrid';
import MarketplacePluginsGrid from '../components/MarketplacePluginsGrid';
import { Building2 } from 'lucide-react';

export default function MultitenantHubScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await multitenantService.getMultitenantOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSwitchTenant = async (tenantId) => {
    const res = await multitenantService.switchActiveTenant(tenantId);
    alert(res.message);
    loadData();
  };

  const handleToggleInstall = async (pluginId) => {
    const res = await multitenantService.togglePluginInstall(pluginId);
    alert(res.message);
    loadData();
  };

  const handleUpgrade = async (planId) => {
    const res = await multitenantService.upgradeSaasPlan(planId);
    alert(res.message);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Plataforma Multi-tenant SaaS...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-purple-600" /> Plataforma Multiempresa, Multi-tenant & Marketplace (MOD-12)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Isolamento de dados por tenant, gestão de filiais, faturamento recorrente e loja de aplicativos.
          </p>
        </div>
      </div>

      <TenantSelectorHeader activeTenant={data.activeTenant || {}} organizacoes={data.organizacoes || []} onSwitchTenant={handleSwitchTenant} />
      <OrganizationsManagerCard organizacoes={data.organizacoes || []} />
      <SaasPlansGrid planos={data.planosSaas || []} activePlanName={data.activeTenant?.plano} onUpgrade={handleUpgrade} />
      <MarketplacePluginsGrid plugins={data.marketplacePlugins || []} onToggleInstall={handleToggleInstall} />
    </div>
  );
}
