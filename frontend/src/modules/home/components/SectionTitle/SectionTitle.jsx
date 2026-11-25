import React from "react";
import { Link } from "react-router-dom";

export default function SectionTitle({ title, linkTo, label = "Ver todos" }) {
  return (
    <div className="flex items-center justify-between px-4 mt-8 mb-4 select-none">
      <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      {linkTo && (
        <Link
          to={linkTo}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 text-decoration-none"
        >
          {label}
        </Link>
      )}
    </div>
  );
}
