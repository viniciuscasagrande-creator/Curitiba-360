import React, { useState, useEffect } from 'react';
import { smartCityService } from '../services/smartCityService';
import PublicSpacesManagerPanel from '../components/PublicSpacesManagerPanel';
import DigitalLicensingWorkflow from '../components/DigitalLicensingWorkflow';
import EconomicImpactNoc from '../components/EconomicImpactNoc';
import { Landmark } from 'lucide-react';

export default function SmartCityDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    smartCityService.getSmartCityOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando portal da administração pública...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-purple-600 animate-pulse" /> Inteligência Urbana, Smart City & Gestão Pública (MOD-23)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Licenciamento digital de eventos temporários, diretório de equipamentos municipais e painel de impacto econômico urbano.
          </p>
        </div>
      </div>

      <EconomicImpactNoc impact={data.impactoEconomico || {}} />
      <PublicSpacesManagerPanel spaces={data.espacosPublicos || []} />
      <DigitalLicensingWorkflow licencas={data.licencasDigitais || []} />
    </div>
  );
}
