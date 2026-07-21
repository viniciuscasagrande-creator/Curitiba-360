import React, { useState, useEffect } from 'react';
import { b2bService } from '../services/b2bService';
import B2bFornecedoresGrid from '../components/B2bFornecedoresGrid';
import RfqRequestWorkflow from '../components/RfqRequestWorkflow';
import { Handshake } from 'lucide-react';

export default function B2bMarketplacePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    b2bService.getB2bOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando ecossistema B2B...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800 font-medium">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Handshake className="w-6 h-6 text-purple-600 animate-pulse" /> Ecossistema B2B, Marketplace de Serviços & Parcerias (MOD-21)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Conexão entre produtores, fornecedores de som/luz/segurança, fluxo de cotações RFQ e agenda operacional.
          </p>
        </div>
      </div>

      <B2bFornecedoresGrid fornecedores={data.fornecedoresB2b || []} />
      <RfqRequestWorkflow solicitacoes={data.solicitacoesRfq || []} />
    </div>
  );
}
