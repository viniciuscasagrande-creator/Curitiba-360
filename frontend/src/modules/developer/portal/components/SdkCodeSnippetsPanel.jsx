import React, { useState } from 'react';
import { Code, Copy, CheckCircle2, Terminal } from 'lucide-react';

export default function SdkCodeSnippetsPanel({ sdks = [] }) {
  const [selectedSdkId, setSelectedSdkId] = useState('sdk-node');
  const [copied, setCopied] = useState(false);

  const selectedSdk = sdks.find((s) => s.id === selectedSdkId) || sdks[0];

  const handleCopy = () => {
    if (selectedSdk) {
      navigator.clipboard.writeText(selectedSdk.snippetExemplo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Code className="w-3.5 h-3.5 text-purple-400" /> SDKs Oficiais & Exemplos de Código
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">TypeScript / Python / PHP</span>
      </div>

      {/* TABS DE LINGUAGEM */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {sdks.map((sdk) => (
          <button
            key={sdk.id}
            onClick={() => setSelectedSdkId(sdk.id)}
            className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all ${
              selectedSdkId === sdk.id ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {sdk.linguagem}
          </button>
        ))}
      </div>

      {selectedSdk && (
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[10px]">
            <span className="text-purple-300">$ {selectedSdk.comandoInstalacao}</span>
            <span className="text-slate-400">Versão {selectedSdk.versao}</span>
          </div>

          <div className="relative">
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-pre">
              {selectedSdk.snippetExemplo}
            </pre>

            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white text-[9px] rounded font-bold flex items-center gap-1 border border-slate-700 shadow-xs"
            >
              {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
