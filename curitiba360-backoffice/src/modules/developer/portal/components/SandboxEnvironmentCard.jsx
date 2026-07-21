import React from 'react';
import { Box, ToggleLeft, ToggleRight, ShieldCheck, Key } from 'lucide-react';

export default function SandboxEnvironmentCard({ sandboxInfo = {}, onToggleEnv }) {
  const isSandbox = (sandboxInfo.modoAtual || '').includes('Sandbox');

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Box className="w-3.5 h-3.5 text-purple-600" /> Ambiente de Testes Sandbox
        </h3>
        <button
          onClick={() => onToggleEnv && onToggleEnv(isSandbox ? 'Produção' : 'Sandbox')}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-900 font-bold transition-all text-[10px]"
        >
          {isSandbox ? <ToggleRight className="w-4 h-4 text-purple-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
          <span>{sandboxInfo.modoAtual}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-0.5">
          <div className="text-slate-400 font-sans font-bold">Chave API Sandbox:</div>
          <div className="text-purple-900 font-bold">{sandboxInfo.apiKeySandbox}</div>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-0.5">
          <div className="text-slate-400 font-sans font-bold">Segredo HMAC Sandbox:</div>
          <div className="text-slate-800 font-bold">{sandboxInfo.secretHmacSandbox}</div>
        </div>
      </div>
    </div>
  );
}
