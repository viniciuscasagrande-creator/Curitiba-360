import React from 'react';
import { Fingerprint, Lock, ShieldAlert } from 'lucide-react';

export default function BiometricsPinPanel({ profile = {}, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Fingerprint className="w-3.5 h-3.5 text-purple-600" /> Biometria, PIN & Autenticação 2FA
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Expo Secure Store</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <div className="font-extrabold text-slate-900 text-xs">Face ID / Touch ID</div>
            <div className="text-[10px] text-slate-500">Desbloqueio biométrico nativo do aparelho.</div>
          </div>
          <button
            onClick={() => onToggle && onToggle('faceId')}
            className={`px-3 py-1 rounded-full font-bold text-[10px] ${
              profile.biometriaFaceId ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {profile.biometriaFaceId ? 'ATIVADO' : 'DESATIVADO'}
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <div className="font-extrabold text-slate-900 text-xs">PIN Local de 4 dígitos</div>
            <div className="text-[10px] text-slate-500">Senha alternativa para acesso offline.</div>
          </div>
          <button
            onClick={() => onToggle && onToggle('pin')}
            className={`px-3 py-1 rounded-full font-bold text-[10px] ${
              profile.pinLocalAtivo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {profile.pinLocalAtivo ? 'ATIVADO' : 'DESATIVADO'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-extrabold text-slate-900 text-xs">Autenticação 2FA (TOTP)</div>
            <div className="text-[10px] text-slate-500">Código de 6 dígitos via app autenticador.</div>
          </div>
          <button
            onClick={() => onToggle && onToggle('2fa')}
            className={`px-3 py-1 rounded-full font-bold text-[10px] ${
              profile.twoFactorAuth ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {profile.twoFactorAuth ? 'ATIVADO' : 'DESATIVADO'}
          </button>
        </div>
      </div>
    </div>
  );
}
