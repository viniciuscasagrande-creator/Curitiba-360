import React from "react";
import {
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileMenuItem({
  item,
}) {
  const Icon = item.icon;
  const isHashOrExternal = item.href.includes("#") || item.href === "/ajuda" || item.href === "/perfil/privacidade" || item.href === "/perfil/avaliacoes";

  const content = (
    <div className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition hover:border-slate-200 hover:bg-slate-50 text-left">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-emerald-50 group-hover:text-emerald-700">
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-950 my-0 text-sm">
          {item.label}
        </h3>

        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 my-0">
          {item.description}
        </p>
      </div>

      <ChevronRight
        size={19}
        className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700"
      />
    </div>
  );

  if (isHashOrExternal) {
    return (
      <button
        type="button"
        onClick={() => {
          if (item.href.includes("#")) {
            window.location.href = item.href;
          } else {
            alert(`A tela de "${item.label}" estará disponível em breve!`);
          }
        }}
        className="w-full border-none bg-transparent p-0 cursor-pointer block"
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={item.href}
      className="block text-decoration-none"
    >
      {content}
    </Link>
  );
}
