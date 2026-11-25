import React, { useState, useEffect } from 'react';
import { multitenantService } from '../services/multitenantService';
import OrganizationsManagerCard from '../components/OrganizationsManagerCard';
import { Building2 } from 'lucide-react';

export default function SuperAdminConsoleScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    multitenantService.getMultitenantOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando console super admin...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-purple-600" /> Console do Operador Global (Super Admin Operator)
        </h1>
      </div>

      <OrganizationsManagerCard organizacoes={data.organizacoes || []} />
    </div>
  );
}
