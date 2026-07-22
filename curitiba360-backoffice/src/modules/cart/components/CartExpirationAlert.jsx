import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";

export default function CartExpirationAlert({ expiresAt, onExpire }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiresAt) return;

    function updateTimer() {
      const remaining = new Date(expiresAt).getTime() - Date.now();
      if (remaining <= 0) {
        setTimeLeft("Expirado");
        if (onExpire) onExpire();
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  if (!expiresAt || timeLeft === "Expirado") return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-100 p-4 select-none text-left animate-pulse">
      <Timer size={20} className="text-amber-700 shrink-0" />
      <div>
        <p className="text-sm font-bold text-amber-900 my-0">
          Reserva temporária ativa
        </p>
        <p className="text-xs text-amber-700 my-0 mt-0.5">
          Conclua seu pagamento em <strong className="font-bold">{timeLeft}</strong> minutos para garantir seus ingressos.
        </p>
      </div>
    </div>
  );
}
