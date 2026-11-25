import React from "react";
import { LogOut, Download, Trash2 } from "lucide-react";

export default function SecurityDangerZone({ onTerminateAll, onExportHistory, onDeleteAccount, saving }) {
  async function handleDelete() {
    const confirmation = window.prompt('Para excluir sua conta local, digite "EXCLUIR".');
    if (confirmation !== "EXCLUIR") {
      return;
    }
    await onDeleteAccount();
  }

  return (
    <section className="rounded-3xl border border-red-200 bg-red-50/50 p-5 sm:p-6 select-none text-left">
      <h2 className="text-lg font-bold text-slate-950 my-0">
        Área Crítica de Segurança
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 my-0">
        Ações de segurança irreversíveis. Tenha cautela ao executar essas ações.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onTerminateAll}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
        >
          <LogOut size={17} />
          Encerrar outras sessões
        </button>

        <button
          type="button"
          onClick={onExportHistory}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
        >
          <Download size={17} />
          Exportar histórico
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={handleDelete}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-100 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-200 disabled:opacity-60 cursor-pointer"
        >
          <Trash2 size={17} />
          Excluir conta
        </button>
      </div>
    </section>
  );
}
