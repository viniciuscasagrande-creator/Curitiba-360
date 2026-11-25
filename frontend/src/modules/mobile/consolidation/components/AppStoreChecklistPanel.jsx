import React from 'react';
import { Store, CheckCircle2 } from 'lucide-react';

export default function AppStoreChecklistPanel({ checklists = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5 text-purple-600" /> Checklist para Publicação em Lojas
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Google Play & App Store</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="font-extrabold text-slate-900 text-xs mb-1.5 flex items-center gap-1 text-emerald-800">
            🤖 Google Play Store (Android)
          </div>
          <div className="space-y-1">
            {(checklists.googlePlay || []).map((item, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-medium text-[10px]">
                <span>{item.item}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="font-extrabold text-slate-900 text-xs mb-1.5 flex items-center gap-1 text-slate-800">
            🍏 Apple App Store (iOS)
          </div>
          <div className="space-y-1">
            {(checklists.appStore || []).map((item, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-medium text-[10px]">
                <span>{item.item}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
