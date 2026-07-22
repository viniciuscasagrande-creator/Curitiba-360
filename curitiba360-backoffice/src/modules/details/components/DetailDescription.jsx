import React, { useState } from "react";

export default function DetailDescription({
  description,
}) {
  const [expanded, setExpanded] =
    useState(false);

  const longDescription =
    description.length > 300;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left select-none">
      <h2 className="text-xl font-bold text-slate-950 my-0">
        Sobre o local
      </h2>

      <p
        className={[
          "mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 my-0",
          !expanded &&
          longDescription
            ? "line-clamp-5"
            : "",
        ].join(" ")}
      >
        {description}
      </p>

      {longDescription && (
        <button
          type="button"
          onClick={() =>
            setExpanded(
              (current) => !current
            )
          }
          className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-800 bg-transparent border-none cursor-pointer p-0"
        >
          {expanded
            ? "Mostrar menos"
            : "Mostrar mais"}
        </button>
      )}
    </section>
  );
}
