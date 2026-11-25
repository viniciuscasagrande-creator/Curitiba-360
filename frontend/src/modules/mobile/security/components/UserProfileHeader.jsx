import React from 'react';
import { ShieldCheck, Building, Mail, Fingerprint } from 'lucide-react';

export default function UserProfileHeader({ profile = {} }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-purple-700 border-2 border-purple-400 overflow-hidden flex items-center justify-center font-extrabold text-base text-white shadow-inner">
          {profile.nome ? profile.nome.charAt(0) : 'U'}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-white text-sm">{profile.nome}</span>
            {profile.biometriaFaceId && <ShieldCheck className="w-4 h-4 text-emerald-400" title="Face ID Ativo" />}
          </div>
          <div className="text-[10px] text-purple-300 font-medium">{profile.cargo}</div>
          <div className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Building className="w-3 h-3 text-slate-400" /> {profile.empresa}
          </div>
        </div>
      </div>
    </div>
  );
}
