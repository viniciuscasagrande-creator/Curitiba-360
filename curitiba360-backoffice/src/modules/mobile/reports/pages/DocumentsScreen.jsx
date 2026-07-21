import React, { useState, useEffect } from 'react';
import { reportsService } from '../services/reportsService';
import DocumentRepositoryPanel from '../components/DocumentRepositoryPanel';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function DocumentsScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await reportsService.getReportsOverview();
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

  const handleToggleFavorite = async (docId) => {
    await reportsService.toggleFavoriteDocument(docId);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando documentos...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200 p-4">
        <DocumentRepositoryPanel documentos={data.documentosEvento || []} onToggleFavorite={handleToggleFavorite} />
        <MobileBottomNav />
      </div>
    </div>
  );
}
