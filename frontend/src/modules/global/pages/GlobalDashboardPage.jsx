import React, { useState, useEffect } from 'react';
import { globalService } from '../services/globalService';
import GlobalKpiDashboard from '../components/GlobalKpiDashboard';
import CurrencyExchangeCard from '../components/CurrencyExchangeCard';
import TaxComplianceInspector from '../components/TaxComplianceInspector';
import LatencyGlobalObserver from '../components/LatencyGlobalObserver';
import { Globe } from 'lucide-react';

export default function GlobalDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    globalService.getGlobalOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando plataforma global...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800 font-medium">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-600 animate-spin" /> Plataforma Global, Internacionalização & Multi-Moeda (MOD-26)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Suporte a 6 idiomas (i18n), 7 moedas (BRL, USD, EUR), gateways de pagamento globais e regras tributárias (VAT/Sales Tax).
          </p>
        </div>
      </div>

      <GlobalKpiDashboard kpis={data.globalKpis || {}} />
      <CurrencyExchangeCard taxas={data.taxasCambio || []} />
      <TaxComplianceInspector regras={data.regrasTributarias || []} />
      <LatencyGlobalObserver latencias={data.latenciasRegionais || []} />
    </div>
  );
}
