import React, { useState } from 'react';
import { QrCode, CheckCircle2, XCircle, AlertTriangle, Scan } from 'lucide-react';

export default function QrScannerWidget({ onValidate }) {
  const [qrInput, setQrInput] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qrInput.trim()) return;

    if (onValidate) {
      const res = await onValidate(qrInput.trim());
      setResult(res);
    }
    setQrInput('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Scan className="w-4 h-4 text-purple-600 animate-pulse" /> Scanner de QR Code / Leitor de Ingressos
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Validação instantânea com verificação de duplicidade.</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
          Tempo &lt; 350ms ⚡
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={qrInput}
          onChange={(e) => setQrInput(e.target.value)}
          placeholder="Digite ou escaneie o código do QR Code (Ex: QR-TREM-VIP-9001-A1)..."
          className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
        >
          <QrCode className="w-4 h-4" /> Validar Entrada
        </button>
      </form>

      {/* FEEDBACK DA VALIDAÇÃO */}
      {result && (
        <div className={`p-4 rounded-xl border space-y-2 animate-fade-in ${
          result.success ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
        }`}>
          <div className="flex items-center gap-2 font-extrabold text-sm">
            {result.success ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
            <span>{result.message}</span>
          </div>

          {result.ticket && (
            <div className="text-[11px] font-medium pt-1 border-t border-slate-200/60 space-y-0.5">
              <div>Comprador: <b>{result.ticket.comprador}</b> (CPF: {result.ticket.cpf})</div>
              <div>Categoria: <b>{result.ticket.categoria}</b> • Assento: <b>{result.ticket.assento}</b></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
