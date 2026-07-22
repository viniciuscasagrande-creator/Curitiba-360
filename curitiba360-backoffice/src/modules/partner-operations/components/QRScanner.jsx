import React, { useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({
  onScan,
  disabled = false,
}) {
  const [enabled, setEnabled] =
    useState(true);

  function handleScan(result) {
    const value =
      result?.[0]?.rawValue;

    if (!value || disabled) {
      return;
    }

    onScan(value);
  }

  if (!enabled) {
    return (
      <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-950 p-6 text-center text-white select-none">
        <CameraOff size={34} />

        <h2 className="mt-4 text-xl font-bold">
          Câmera desativada
        </h2>

        <button
          type="button"
          onClick={() =>
            setEnabled(true)
          }
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold border-none text-white cursor-pointer hover:bg-emerald-700 transition"
        >
          <Camera size={17} />
          Ativar câmera
        </button>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 max-w-md mx-auto aspect-square select-none">
      <Scanner
        onScan={handleScan}
        onError={(error) =>
          console.error(error)
        }
        constraints={{
          facingMode:
            "environment",
        }}
        scanDelay={800}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-56 w-56 rounded-3xl border-4 border-white/90 shadow-[0_0_0_999px_rgba(15,23,42,0.45)]" />
      </div>

      <button
        type="button"
        onClick={() =>
          setEnabled(false)
        }
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950/70 text-white backdrop-blur border-none cursor-pointer"
        aria-label="Desativar câmera"
      >
        <CameraOff size={19} />
      </button>
    </section>
  );
}
