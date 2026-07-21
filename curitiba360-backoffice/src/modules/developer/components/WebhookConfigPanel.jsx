import React, { useState } from 'react';
import { Send, Plus, ShieldCheck, Zap } from 'lucide-react';

export default function WebhookConfigPanel({ webhooks = [], onRegisterWebhook, onTriggerTest }) {
  const [showModal, setShowModal] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegisterWebhook) {
      onRegisterWebhook({
        targetUrl: targetUrl.trim(),
        eventosInscritos: ['order.paid', 'ticket.issued', 'checkin.approved']
      });
    }
    setShowModal(false);
    setTargetUrl('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Send className="w-3.5 h-3.5 text-purple-600" /> Cadastrar & Configurar Webhooks
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px] shadow-xs flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Adicionar Webhook Endpoint
        </button>
      </div>

      <div className="space-y-2">
        {webhooks.map((wh) => (
          <div key={wh.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="font-mono">{wh.targetUrl}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                {wh.status}
              </span>
            </div>

            <div className="text-[10px] text-slate-500 font-mono">
              Segredo HMAC: <b className="text-purple-800">{wh.secretHmac}</b>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-1 flex-wrap text-[9px] text-slate-500 font-mono">
                {wh.eventosInscritos.map((ev, i) => (
                  <span key={i} className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-800 border border-purple-200">
                    {ev}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onTriggerTest && onTriggerTest(wh.id)}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[9px] flex items-center gap-1 shadow-xs"
              >
                <Zap className="w-3 h-3" /> Disparar Teste HMAC
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-purple-600" /> Cadastrar Novo Webhook Endpoint
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL de Destino (HTTPS Endpoint)</label>
                <input
                  type="url"
                  required
                  placeholder="https://sua-api.com/webhooks/curitiba360"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded shadow-sm">
                  Salvar Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
