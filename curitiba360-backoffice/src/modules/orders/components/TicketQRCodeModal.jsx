import React from "react";
import {
  Download,
  Share2,
  X,
} from "lucide-react";
import {
  QRCodeSVG,
} from "qrcode.react";

export default function TicketQRCodeModal({
  ticket,
  onClose,
}) {
  if (!ticket) {
    return null;
  }

  async function handleShare() {
    const shareData = {
      title: ticket.event.title,
      text: `Ingresso ${ticket.code}`,
    };

    if (navigator.share) {
      await navigator.share(
        shareData
      );

      return;
    }

    await navigator.clipboard.writeText(
      `${ticket.event.title} - ${ticket.code}`
    );
    window.alert("Detalhes do ingresso copiados para a área de transferência!");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm select-none">
      <section className="relative w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 border-none cursor-pointer bg-white transition"
          aria-label="Fechar"
        >
          <X size={19} />
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 my-0">
          Ingresso digital
        </p>

        <h2 className="mt-3 text-2xl font-bold text-slate-955 my-0">
          {ticket.event.title}
        </h2>

        <p className="mt-2 text-sm text-slate-500 my-0">
          Apresente este QR Code na entrada.
        </p>

        <div className="mx-auto mt-6 w-fit rounded-3xl border border-slate-200 bg-white p-5">
          <QRCodeSVG
            id={`ticket-qr-${ticket.id}`}
            value={ticket.secureValue}
            size={240}
            level="H"
          />
        </div>

        <p className="mt-5 text-sm font-bold text-slate-955 my-0">
          {ticket.holder.name}
        </p>

        <p className="mt-1 text-xs text-slate-500 my-0 font-mono">
          {ticket.code}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 transition px-4 text-sm font-semibold text-white border-none cursor-pointer"
          >
            <Share2 size={17} />
            Compartilhar
          </button>

          <button
            type="button"
            onClick={() => window.alert("Download do ingresso iniciado...")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-705 cursor-pointer hover:bg-slate-50 transition"
          >
            <Download size={17} />
            Salvar
          </button>
        </div>
      </section>
    </div>
  );
}
