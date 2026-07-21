import React, { useState } from 'react';
import { Scan, QrCode, CheckCircle2, AlertOctagon, XCircle } from 'lucide-react';

export default function OfflineQrScannerWidget({ onValidateCode }) {
  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState(null);

  const handleRunValidation = async (codeToTest) => {
    if (!codeToTest) return;
    if (onValidateCode) {
      const res = await onValidateCode(codeToTest);
      setResult(res);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRunValidation(inputCode.trim());
    setInputCode('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Scan className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Scanner QR Code Câmera (Offline)
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
          Tempo &lt; 100ms ⚡
        </span>
      </div>

      {/* ATALHOS DE TESTE RÁPIDO SOLICITADOS PELO USUÁRIO */}
      <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Códigos de Teste Demonstrativos:</div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleRunValidation('CTB-OFF-001')}
            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold rounded text-[10px] shadow-xs"
          >
            CTB-OFF-001 (Válido)
          </button>
          <button
            onClick={() => handleRunValidation('CTB-OFF-002')}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold rounded text-[10px] shadow-xs"
          >
            CTB-OFF-002 (Duplicado)
          </button>
          <button
            onClick={() => handleRunValidation('CTB-OFF-003')}
            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-mono font-bold rounded text-[10px] shadow-xs"
          >
            CTB-OFF-003 (Inválido)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Digite ou escaneie o código do bilhete..."
          className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1"
        >
          <QrCode className="w-3.5 h-3.5" /> Validar
        </button>
      </form>

      {/* EXIBIÇÃO DO RESULTADO DA VALIDAÇÃO */}
      {result && (
        <div className={`p-4 rounded-xl border space-y-2 animate-fade-in ${
          result.statusType === 'approved' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' :
          result.statusType === 'duplicate' ? 'bg-amber-50 border-amber-300 text-amber-900' :
          'bg-red-50 border-red-300 text-red-900'
        }`}>
          <div className="flex items-center gap-2 font-extrabold text-xs">
            {result.statusType === 'approved' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            {result.statusType === 'duplicate' && <AlertOctagon className="w-5 h-5 text-amber-600" />}
            {result.statusType === 'invalid' && <XCircle className="w-5 h-5 text-red-600" />}
            <span>{result.message}</span>
          </div>

          {result.ticket && (
            <div className="text-[10px] font-medium pt-1 border-t border-slate-200/60 space-y-0.5">
              <div>Comprador: <b>{result.ticket.comprador}</b> (CPF: {result.ticket.cpf})</div>
              <div>Categoria: <b>{result.ticket.categoria}</b> • Assento: <b>{result.ticket.assento}</b></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
