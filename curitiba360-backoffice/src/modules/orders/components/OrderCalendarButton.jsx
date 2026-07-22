import React from "react";
import { Calendar } from "lucide-react";

export default function OrderCalendarButton({ order = {} }) {
  const handleAddToCalendar = () => {
    const mainItem = order?.items?.[0] || {};
    
    // Format date string for ICS (YYYYMMDD)
    const rawDate = mainItem.date || "2026-08-18";
    const dateFormatted = rawDate.replace(/-/g, "");

    // Format time string for ICS (HHMMSS)
    const rawTime = mainItem.time || "18:00";
    const timeFormatted = rawTime.replace(/:/g, "") + "00";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "CLASS:PUBLIC",
      `DESCRIPTION:Pedido ${order.code} no Curitiba 360. Item: ${mainItem.title}`,
      `DTSTART:${dateFormatted}T${timeFormatted}`,
      `DTEND:${dateFormatted}T210000`, // default 3 hours duration
      `LOCATION:${mainItem.location || "Curitiba, PR"}`,
      `SUMMARY:${mainItem.title}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${order.code}-evento.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleAddToCalendar}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
    >
      <Calendar size={16} />
      Adicionar ao Calendário
    </button>
  );
}
