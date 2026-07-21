import React, { useState, useEffect } from 'react';
import { crmSalesService } from '../services/crmSalesService';
import CrmPipelineBoard from '../components/CrmPipelineBoard';
import CrmCustomerDetailCard from '../components/CrmCustomerDetailCard';
import { Target } from 'lucide-react';

export default function CrmSalesHubPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    crmSalesService.getCrmSalesOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando CRM 360...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600 animate-pulse" /> Plataforma Comercial & CRM 360º (MOD-18)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Cadastro unificado, pipeline de oportunidades por etapas, gestão de propostas comerciais e contratos.
          </p>
        </div>
      </div>

      <CrmPipelineBoard leads={data.pipelineLeads || []} />
      <CrmCustomerDetailCard customers={data.clientes360 || []} />
    </div>
  );
}
