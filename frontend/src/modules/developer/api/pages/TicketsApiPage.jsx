import React, { useState, useEffect } from 'react';
import { ordersApiService } from '../services/ordersApiService';
import TicketsApiPanel from '../components/TicketsApiPanel';
import { Ticket } from 'lucide-react';

export default function TicketsApiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApiService.getOrdersOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando API de Ingressos...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Ticket className="w-6 h-6 text-purple-600" /> API Pública de Ingressos (`/v1/tickets`)
        </h1>
      </div>

      <TicketsApiPanel tickets={data.tickets || []} />
    </div>
  );
}
