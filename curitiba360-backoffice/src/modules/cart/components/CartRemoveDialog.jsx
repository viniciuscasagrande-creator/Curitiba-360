import React from "react";

export default function CartRemoveDialog({ isOpen, item, onConfirm, onClose, saving }) {
  if (!isOpen || !item) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm select-none"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-item-title"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl text-left border border-slate-100 animate-scale-up"
      >
        <h2
          id="remove-item-title"
          className="text-xl font-bold text-slate-955 my-0"
        >
          Remover item?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 my-0">
          O item <strong>{item.title}</strong> será removido do carrinho.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Manter item
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={onConfirm}
            className="h-11 rounded-xl bg-red-600 hover:bg-red-700 px-5 text-sm font-semibold text-white disabled:opacity-50 border-none cursor-pointer"
          >
            Remover
          </button>
        </div>
      </section>
    </div>
  );
}
