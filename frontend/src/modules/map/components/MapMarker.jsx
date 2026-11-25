import React from "react";
import {
  MapPin,
} from "lucide-react";

export default function MapMarker({
  item,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      aria-label={`Selecionar ${item.title}`}
      className={[
        "absolute z-10 -translate-x-1/2 -translate-y-full transition cursor-pointer border-none bg-transparent p-0",
        selected
          ? "z-30 scale-125 font-bold"
          : "hover:z-20 hover:scale-110",
      ].join(" ")}
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
      }}
    >
      <span
        className={[
          "flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-lg transition",
          selected
            ? "bg-emerald-700 text-white"
            : "bg-slate-950 text-white",
        ].join(" ")}
      >
        <MapPin
          size={19}
          aria-hidden="true"
        />
      </span>

      <span
        className={[
          "absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2 py-1 text-[10px] font-semibold text-white shadow-lg",
          selected
            ? "block"
            : "",
        ].join(" ")}
      >
        {item.title}
      </span>
    </button>
  );
}
