import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOrganizations } from "../hooks/useOrganizations";

export default function BrandingPage() {
  const { activeOrg, updateBranding, loading } = useOrganizations();
  const [primaryColor, setPrimaryColor] = useState(activeOrg?.branding?.primaryColor || "#059669");
  const [borderRadius, setBorderRadius] = useState(activeOrg?.branding?.borderRadius || "16px");

  const handleSave = async (e) => {
    e.preventDefault();
    if (!activeOrg) return;
    await updateBranding(activeOrg.id, { primaryColor, borderRadius });
    alert("Identidade visual White Label atualizada com sucesso!");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Identidade Visual White Label</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-xl">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Cor Primária</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-10 border rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Arredondamento de Bordas (Border Radius)</label>
              <input
                type="text"
                placeholder="Ex: 16px, 8px"
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800 transition border-none cursor-pointer"
            >
              Salvar Alterações de Marca
            </button>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}
