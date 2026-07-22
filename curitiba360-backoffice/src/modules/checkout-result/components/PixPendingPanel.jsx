import React, { useState } from "react";
import {
  Check,
  Copy,
  QrCode,
} from "lucide-react";
import {
  QRCodeSVG,
} from "qrcode.react";

import PixExpirationTimer from "./PixExpirationTimer";

export default function PixPendingPanel({
  payment,
  onExpire,
}) {
  const [copied, setCopied] =
    useState(false);

  const pix = payment.pix;

  async function handleCopy() {
    if (!pix.copyPasteCode) {
      return;
    }

    await navigator.clipboard.writeText(
      pix.copyPasteCode
    );

    setCopied(true);

    window.setTimeout(
      () => setCopied(false),
      2000
    );
  }

  return (
    <section className="rounded-3xl border border-amber-200 bg-white p-5 shadow-sm sm:p-6 select-none text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <QrCode size={21} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-955 my-0">
            Pague com PIX
          </h2>

          <p className="text-sm text-slate-500 my-0">
            O pedido será confirmado após o pagamento.
          </p>
        </div>
      </div>

      {pix.qrCodeValue && (
        <div className="mx-auto mt-6 flex w-fit rounded-3xl border border-slate-200 bg-white p-5">
          <QRCodeSVG
            value={pix.qrCodeValue}
            size={210}
            level="H"
          />
        </div>
      )}

      <div className="mt-6">
        <PixExpirationTimer
          expiresAt={pix.expiresAt}
          onExpire={onExpire}
        />
      </div>

      {pix.copyPasteCode && (
        <div className="mt-5">
          <label className="text-sm font-bold text-slate-955">
            PIX copia e cola
          </label>

          <div className="mt-2 flex gap-2">
            <input
              readOnly
              value={
                pix.copyPasteCode
              }
              className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none"
            />

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-750 border-none cursor-pointer px-5 text-sm font-semibold text-white transition"
            >
              {copied ? (
                <>
                  <Check size={17} />
                  Copiado
                </>
              ) : (
                <>
                  <Copy size={17} />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <ol className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 list-none my-0">
        <li>1. Abra o aplicativo do seu banco.</li>
        <li>2. Escolha a opção pagar com PIX.</li>
        <li>3. Leia o QR Code ou cole o código.</li>
        <li>4. Confirme o pagamento.</li>
      </ol>
    </section>
  );
}
