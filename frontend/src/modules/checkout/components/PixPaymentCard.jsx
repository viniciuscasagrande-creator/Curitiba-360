import React, { useState, useEffect } from "react";
import { QrCode, Copy, Check } from "lucide-react";

export default function PixPaymentCard({ order = {} }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  const pixCode = "00020101021226870014br.gov.bcb.pix2565https://pix.curitiba360.com.br/pagar/5204000053039865802BR5920CURITIBA360%20PLATFORM6008CURITIBA62070503***6304D1B2";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-center space-y-5">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <QrCode size={24} />
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-950 my-0">
          Pagamento via Pix
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 my-0 leading-5">
          Escaneie o QR Code ou copie o código Pix abaixo para pagar no app do seu banco.
        </p>
      </div>

      {/* Simulated QR Code */}
      <div className="mx-auto h-48 w-48 rounded-2xl border border-slate-100 bg-slate-50 p-3 flex items-center justify-center">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pixCode)}`}
          alt="Pix QR Code"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-between gap-3 max-w-sm mx-auto">
        <span className="truncate text-xs font-mono font-bold text-slate-600 pr-2">
          {pixCode}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white hover:bg-slate-800 transition cursor-pointer border-none"
          title="Copiar código Pix"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div className="text-xs text-slate-500">
        O código expira em <strong className="text-emerald-700 font-bold">{timeFormatted}</strong> minutos.
      </div>
    </div>
  );
}
