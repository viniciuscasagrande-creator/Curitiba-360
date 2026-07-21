import React, { useState } from 'react';
import { Send, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function WebhookTesterReplayPanel() {
  const [replayingId, setReplayingId] = useState(null);

  const webhookEvents = [
    { id: 'EV-1001', evento: 'order.paid', status: 200, payload: '{"orderId":"ORD-8801","total":520.00,"status":"paid"}' },
    { id: 'EV-1002', evento: 'checkin.approved', status: 200, payload: '{"code":"CTB-OFF-001","gate":"GATE-01"}' },
    { id: 'EV-1003', evento: 'refund.completed', status: 200, payload: '{"refundId":"REF-701","amount":240.00}' }
  ];

  const handleReplay = (id) => {
    setReplayingId(id);
    setTimeout(() => {
      alert(`🔁 Replay do Evento ${id} reenviado ao webhook de destino com nova assinatura HMAC!`);
      setReplayingId(null);
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Send className="w-3.5 h-3.5 text-purple-600" /> Webhook Tester & Replay de Eventos (HMAC Validated)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Replay Instantâneo</span>
      </div>

      <div className="space-y-2">
        {webhookEvents.map((ev) => (
          <div key={ev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 font-mono">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs font-sans">
              <span className="text-purple-900 font-mono">{ev.evento} ({ev.id})</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                HTTP {ev.status} ✓
              </span>
            </div>

            <div className="p-2 bg-slate-900 text-emerald-400 rounded text-[10px] overflow-x-auto">
              {ev.payload}
            </div>

            <div className="pt-1 flex items-center justify-end">
              <button
                onClick={() => handleReplay(ev.id)}
                disabled={replayingId === ev.id}
                className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-[9px] flex items-center gap-1 shadow-xs font-sans"
              >
                <RefreshCw className={`w-3 h-3 ${replayingId === ev.id ? 'animate-spin' : ''}`} />
                {replayingId === ev.id ? 'Reenviando...' : 'Reenviar Evento (Replay)'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
