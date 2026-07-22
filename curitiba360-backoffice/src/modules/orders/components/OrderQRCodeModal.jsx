import React from "react";
import { X, Share2, Download } from "lucide-react";
import OrderQRCode from "./OrderQRCode";

export default function OrderQRCodeModal({ ticket = {}, item = {}, onClose }) {
  const handleShare = async () => {
    const text = `Ingresso para ${item.title} - Portador: ${ticket.holderName}. Link: ${window.location.origin}/perfil/pedidos`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        window.alert("Link de compartilhamento copiado para a área de transferência!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 select-none">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-slate-100 text-center animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold text-slate-950 my-0 mt-2">
          QR Code do Ingresso
        </h3>
        <p className="text-xs text-slate-500 my-0 mt-1">
          Apresente na entrada da atração.
        </p>

        <div className="mt-5 flex justify-center">
          <OrderQRCode value={ticket.qrCodeValue} />
        </div>

        <div className="mt-4 text-left p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 text-slate-600">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider my-0">Portador</p>
            <p className="font-bold text-slate-900 my-0 mt-0.5">{ticket.holderName}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider my-0">Código</p>
            <p className="font-bold text-slate-900 my-0 mt-0.5 font-mono">{ticket.code}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider my-0">Atração / Evento</p>
            <p className="font-bold text-slate-900 my-0 mt-0.5">{item.title}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            <Share2 size={15} />
            Compartilhar
          </button>
          <button
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-xl bg-slate-950 text-xs font-bold text-white hover:bg-slate-850 transition cursor-pointer border-none"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
