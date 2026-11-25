import React, { useState, useEffect } from 'react';
import { staffService } from '../services/staffService';
import StaffHeader from '../components/StaffHeader';
import StaffIncidentForm from '../components/StaffIncidentForm';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function StaffIncidentsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await staffService.getStaffOverview();
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

  const handleRegisterIncident = async (incidentData) => {
    await staffService.registerIncident(incidentData);
    alert('⚠️ Ocorrência registrada e enviada à Central de Comando!');
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando ocorrências...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200">
        <StaffHeader member={data.staffMember || {}} />

        <div className="p-4 space-y-4">
          <StaffIncidentForm onRegisterIncident={handleRegisterIncident} />
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}
