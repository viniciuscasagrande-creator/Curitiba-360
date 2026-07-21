import React, { useState, useEffect } from 'react';
import { staffService } from '../services/staffService';
import StaffHeader from '../components/StaffHeader';
import StaffCredentialScanner from '../components/StaffCredentialScanner';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function StaffCredentialsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    staffService.getStaffOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando credenciais...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200">
        <StaffHeader member={data.staffMember || {}} />

        <div className="p-4 space-y-4">
          <StaffCredentialScanner credenciais={data.credenciaisCampo || []} />
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}
