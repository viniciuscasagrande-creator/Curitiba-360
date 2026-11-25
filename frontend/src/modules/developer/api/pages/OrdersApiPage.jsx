import React, { useState, useEffect } from 'react';
import { ordersApiService } from '../services/ordersApiService';
import OrdersApiPanel from '../components/OrdersApiPanel';
import IdempotencyCheckerPanel from '../components/IdempotencyCheckerPanel';
import { ShoppingBag } from 'lucide-react';

export default function OrdersApiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ordersApiService.getOrdersOverview();
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

  const handleCreateOrder = async (orderData, idempotencyKey) => {
    const res = await ordersApiService.createOrderWithIdempotency(orderData, idempotencyKey);
    loadData();
    return res;
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando API de Pedidos...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-purple-600" /> API Pública de Pedidos & Checkout (`/v1/orders`)
        </h1>
      </div>

      <OrdersApiPanel orders={data.orders || []} onCreateOrder={handleCreateOrder} />
      <IdempotencyCheckerPanel store={data.idempotencyStore || []} />
    </div>
  );
}
