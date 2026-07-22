import React, { useState } from "react";
import PartnerLayout from "../layouts/PartnerLayout";
import { usePartner } from "../hooks/usePartner";
import { updatePartnerProfile } from "../services/partnerService";

export default function PartnerProfilePage() {
  const { partner, loading, reload } = usePartner();
  const [description, setDescription] = useState(partner?.profile?.description || "");
  const [website, setWebsite] = useState(partner?.profile?.website || "");
  const [instagram, setInstagram] = useState(partner?.profile?.instagram || "");

  const handleSave = async (e) => {
    e.preventDefault();
    await updatePartnerProfile({
      description,
      website,
      instagram
    });
    await reload();
    window.alert("Perfil comercial atualizado com sucesso!");
  };

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-2xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Configurações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Perfil Comercial
          </h1>
          <p className="mt-2 text-sm text-slate-600 my-0">
            Edite a descrição, links de mídias sociais e site público.
          </p>
        </header>

        <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Descrição Comercial</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Fale um pouco sobre sua empresa e experiências oferecidas..."
              rows={4}
              className="w-full rounded-xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Site Oficial</label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://suaempresa.com.br"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Instagram</label>
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@seu.instagram"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer transition"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
