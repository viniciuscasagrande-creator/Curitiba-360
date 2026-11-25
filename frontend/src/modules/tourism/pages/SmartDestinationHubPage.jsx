import React, { useState, useEffect } from 'react';
import { tourismService } from '../services/tourismService';
import TouristExperiencesCatalog from '../components/TouristExperiencesCatalog';
import SmartItineraryPlanner from '../components/SmartItineraryPlanner';
import TourismKpiDashboard from '../components/TourismKpiDashboard';
import { MapPin } from 'lucide-react';

export default function SmartDestinationHubPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tourismService.getTourismOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando experiências turísticas...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800 font-medium">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-purple-600 animate-bounce" /> Destinos Turísticos Inteligentes & Lazer (MOD-22)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Reservas de passeios integradas, construtor de roteiros personalizados (IA) e monitor de sustentabilidade ESG.
          </p>
        </div>
      </div>

      <TourismKpiDashboard metrics={data.metrics || {}} />
      <TouristExperiencesCatalog experiences={data.experiences || []} />
      <SmartItineraryPlanner roteiro={data.roteiroInteligente || []} />
    </div>
  );
}
