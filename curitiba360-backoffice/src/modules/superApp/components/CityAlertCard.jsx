import React from "react";
import { AlertTriangle, Info, BellRing } from "lucide-react";

export default function CityAlertCard({ alert = {} }) {
  const getLevelColor = (level) => {
    switch (level) {
      case "critical": return "bg-red-50 text-red-900 border-red-200";
      case "high": return "bg-orange-50 text-orange-900 border-orange-200";
      case "attention": return "bg-amber-50 text-amber-900 border-amber-200";
      default: return "bg-blue-50 text-blue-900 border-blue-200";
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case "critical":
      case "high": return <AlertTriangle size={16} className="text-red-500 shrink-0" />;
      case "attention": return <AlertTriangle size={16} className="text-amber-500 shrink-0" />;
      default: return <Info size={16} className="text-blue-500 shrink-0" />;
    }
  };

  return (
    <div className={`border rounded-3xl p-4 shadow-2xs flex gap-3 font-sans animate-fadeIn ${getLevelColor(alert.level)}`}>
      {getLevelIcon(alert.level)}
      <div>
        <h4 className="text-xs font-bold m-0 leading-tight">
          {alert.title}
        </h4>
        <p className="text-[10px] m-0 mt-1 leading-snug opacity-90">
          {alert.description}
        </p>
      </div>
    </div>
  );
}
