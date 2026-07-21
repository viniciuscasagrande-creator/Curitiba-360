import React, { useState, useEffect } from 'react';
import { consolidationService } from '../services/consolidationService';
import MobileAppHubGrid from '../components/MobileAppHubGrid';
import EasBuildStatusCard from '../components/EasBuildStatusCard';
import FirebaseConfigCard from '../components/FirebaseConfigCard';
import AppStoreChecklistPanel from '../components/AppStoreChecklistPanel';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function MobileAppHubScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await consolidationService.getConsolidationOverview();
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

  const handleTriggerBuild = async (platform) => {
    const res = await consolidationService.triggerEasBuild(platform);
    alert(res.message);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Hub Consolidador Mobile...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200 p-4">
        {/* HUB GRID DOS 7 MÓDULOS MÓVEIS */}
        <MobileAppHubGrid submodulos={data.submodulosMobile || []} />

        {/* BUILD EAS CONFIG */}
        <EasBuildStatusCard buildHistory={data.easBuildHistory || []} onTriggerBuild={handleTriggerBuild} />

        {/* CONEXÃO FIREBASE */}
        <FirebaseConfigCard firebaseStatus={data.firebaseConfigStatus || {}} />

        {/* CHECKLIST DE LOJAS */}
        <AppStoreChecklistPanel checklists={data.checklistsLojas || {}} />

        {/* BOTTOM NAV */}
        <MobileBottomNav />
      </div>
    </div>
  );
}
