import React, { useState } from 'react';
import { ShoppingBag, Plus, Key, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function OrdersApiPanel({ orders = [], onCreateOrder }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ comprador: '', email: '', total: 150.00, idempotencyKey: 'idem-test-key-900' });
  const [lastResult, setLastResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onCreateOrder) {
      const res = await onCreateOrder({ comprador: form.comprador, email: form.email, total: parseFloat(form.total) }, form.idempotencyKey);
      setLastResult(res);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-purple-600" /> API de Pedidos (`/v1/orders`) & Idempotência
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px] shadow-xs flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Testar POST /v1/orders
        </button>
      </div>

      <div className="space-y-2">
        {orders.map((ord) => (
          <div key={ord.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="font-mono text-purple-900">{ord.id} • {ord.comprador}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase">
                {ord.status}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Idempotency-Key: <b className="text-purple-800">{ord.idempotencyKey}</b> • Total: <b>R$ {ord.total.toFixed(2)}</b>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-600" /> Testar Criação de Pedido com Idempotency-Key
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cabeçalho `Idempotency-Key`</label>
                <input
                  type="text"
                  required
                  value={form.idempotencyKey}
                  onChange={(e) => setForm({ ...form, idempotencyKey: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs font-bold text-purple-900"
                />
                <span className="text-[9px] text-slate-400">Re-enviar esta mesma chave simulará o cache de idempotência!</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Comprador</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Lima"
                  value={form.comprador}
                  onChange={(e) => setForm({ ...form, comprador: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail do Comprador</label>
                <input
                  type="email"
                  required
                  placeholder="mariana@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Fechar</button>
                <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded shadow-sm">
                  Enviar Requisição POST
                </button>
              </div>
            </form>

            {lastResult && (
              <div className={`p-3 rounded-lg border text-xs font-bold ${
                lastResult.isCachedIdempotent ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                {lastResult.message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
