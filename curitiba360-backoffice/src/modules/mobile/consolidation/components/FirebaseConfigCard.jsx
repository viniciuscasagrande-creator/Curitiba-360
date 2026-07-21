import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

export default function FirebaseConfigCard({ firebaseStatus = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-500" /> Conexão Firebase & Backend Mobile
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          100% Conectado
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-bold">
          <span>Firebase Auth</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-bold">
          <span>Firestore DB</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-bold">
          <span>Cloud Messaging</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-bold">
          <span>Cloud Storage</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
      </div>
    </div>
  );
}
