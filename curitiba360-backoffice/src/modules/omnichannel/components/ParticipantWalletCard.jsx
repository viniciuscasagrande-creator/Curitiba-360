import React from 'react';
import { Wallet, QrCode, Ticket, DollarSign } from 'lucide-react';

export default function ParticipantWalletCard({ profile = {}, ingressos = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5 text-purple-600" /> Carteira Digital do Participante & QR Code Offline
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          Saldo Cashback: R$ {profile.saldoCashback?.toFixed(2)}
        </span>
      </div>

      <div className="space-y-2">
        {ingressos.map((tkt) => (
          <div key={tkt.id} className="p-3 bg-gradient-to-r from-purple-900 to-slate-900 text-white rounded-xl space-y-2 shadow-md">
            <div className="flex items-center justify-between font-extrabold text-xs">
              <span>{tkt.evento}</span>
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px]">
                {tkt.categoria}
              </span>
            </div>
            <div className="text-[10px] text-purple-200 font-mono">Assento: {tkt.assento} • Data: {tkt.data}</div>
            <div className="flex items-center justify-between pt-1 border-t border-purple-800/80 font-mono text-[9px]">
              <span className="text-emerald-300 font-bold">+ R$ {tkt.cashbackGanho?.toFixed(2)} Cashback Ganho</span>
              <span className="flex items-center gap-1 text-white font-bold">
                <QrCode className="w-3.5 h-3.5 text-purple-300" /> Validar QR Code Offline
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
