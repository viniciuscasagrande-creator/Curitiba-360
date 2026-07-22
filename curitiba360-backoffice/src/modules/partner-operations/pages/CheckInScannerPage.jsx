import React, { useState } from "react";
import { Keyboard, RotateCcw, Wifi, WifiOff } from "lucide-react";
import { useParams } from "react-router-dom";

import PartnerLayout from "../../partner/layouts/PartnerLayout";
import QRScanner from "../components/QRScanner";
import TicketValidationResult from "../components/TicketValidationResult";
import { useTicketValidation } from "../hooks/useTicketValidation";

export default function CheckInScannerPage() {
  const { productId, sessionId } = useParams();
  const [manualCode, setManualCode] = useState("");
  const [online, setOnline] = useState(navigator.onLine);

  const {
    validation,
    loading,
    error,
    validate,
    clearValidation,
  } = useTicketValidation({
    productId,
    sessionId: sessionId || null,
    operatorId: "user-operator-demo",
    deviceId: "device-browser-demo",
    gate: "Portão principal",
  });

  async function handleScan(code) {
    if (validation || loading) {
      return;
    }

    await validate(code, online ? "qr_code" : "offline");
  }

  async function handleManualSubmit(event) {
    event.preventDefault();

    if (!manualCode.trim()) {
      return;
    }

    await validate(manualCode, "manual");
    setManualCode("");
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-5xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Operação
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950 my-0">
              Check-in de ingressos
            </h1>

            <p className="mt-2 text-sm text-slate-655 my-0">
              Escaneie o QR Code ou informe o código manualmente.
            </p>
          </div>

          <div
            className={[
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
              online
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700",
            ].join(" ")}
          >
            {online ? (
              <Wifi size={17} />
            ) : (
              <WifiOff size={17} />
            )}

            {online
              ? "Operação online"
              : "Modo offline"}
          </div>
        </header>

        <QRScanner
          onScan={handleScan}
          disabled={loading || Boolean(validation)}
        />

        <form
          onSubmit={handleManualSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Keyboard
              size={19}
              className="text-slate-500"
            />

            <h2 className="font-bold text-slate-955 my-0">
              Digitação manual
            </h2>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={manualCode}
              onChange={(event) =>
                setManualCode(event.target.value)
              }
              placeholder="Ex.: CTB360-TKT-001"
              className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 bg-white"
            />

            <button
              type="submit"
              disabled={loading || !manualCode.trim()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white disabled:opacity-50 border-none cursor-pointer hover:bg-slate-800 transition"
            >
              {loading && (
                <RotateCcw
                  size={17}
                  className="animate-spin"
                />
              )}

              Validar ingresso
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm font-medium text-red-700 my-0">
              {error}
            </p>
          )}
        </form>
      </div>

      <TicketValidationResult
        validation={validation}
        onClose={clearValidation}
      />
    </PartnerLayout>
  );
}
