import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function OrderQRCode({ value }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <QRCodeSVG value={value} size={200} level="H" />
      <p className="mt-3 text-[10px] font-mono text-slate-400 select-all font-bold">
        {value}
      </p>
    </div>
  );
}
