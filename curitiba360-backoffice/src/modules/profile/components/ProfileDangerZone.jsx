import React from "react";
import {
  Download,
  LogOut,
  Trash2,
} from "lucide-react";

export default function ProfileDangerZone({
  onLogout,
  onDeleteAccount,
  saving,
}) {
  async function handleDelete() {
    const confirmation =
      window.prompt(
        'Para excluir sua conta local, digite "EXCLUIR".'
      );

    if (
      confirmation !== "EXCLUIR"
    ) {
      return;
    }

    await onDeleteAccount();
  }

  function exportLocalData() {
    const data = {};

    for (
      let index = 0;
      index < localStorage.length;
      index += 1
    ) {
      const key =
        localStorage.key(index);

      if (
        key?.startsWith(
          "curitiba360:"
        )
      ) {
        data[key] =
          localStorage.getItem(key);
      }
    }

    const blob = new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "curitiba360-dados.json";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-3xl border border-red-200 bg-red-50/50 p-5 sm:p-6 select-none text-left">
      <h2 className="text-lg font-bold text-slate-950 my-0">
        Gerenciamento da conta
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 my-0">
        Controle sua sessão, exporte seus dados ou solicite a remoção da conta.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={exportLocalData}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
        >
          <Download size={17} />
          Exportar dados
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
        >
          <LogOut size={17} />
          Sair da conta
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
