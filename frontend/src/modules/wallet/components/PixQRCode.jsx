import React, { useState, useEffect } from 'react';
import { QrCode, Copy, Check, Clock } from 'lucide-react';

export function PixQRCode({ pixData, onConfirmSimulated }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    if (pixData?.pixCopyPaste) {
      navigator.clipboard.writeText(pixData.pixCopyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 text-center space-y-6 shadow-2xl">
      <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase">
        <Clock size={16} />
        Tempo limite do PIX: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="w-56 h-56 bg-white p-3 rounded-2xl mx-auto border-4 border-slate-800 shadow-xl">
        <img
          src={pixData?.qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=CURITIBA360'}
          alt="QR Code PIX"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-semibold block">Código Copia e Cola:</span>
        <div className="flex items-center gap-2 max-w-md mx-auto bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-[11px] font-mono text-slate-300 truncate flex-1">
            {pixData?.pixCopyPaste || '00020126580014BR.GOV.BCB.PIX...'}
          </span>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-1 shrink-0"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {onConfirmSimulated && (
        <div className="pt-2">
          <button
            onClick={onConfirmSimulated}
            className="px-5 py-2.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all"
          >
            ⚡ Simular Pagamento PIX Recebido (Ambiente de Teste)
          </button>
        </div>
      )}
    </div>
  );
}
export default PixQRCode;
