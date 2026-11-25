import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Send } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useProduct } from "../hooks/useProduct";
import { updateProduct } from "../services/productService";

export default function ProductPublishPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, reload } = useProduct(id);

  const [visibility, setVisibility] = useState("private");
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    if (product) {
      setVisibility(product.visibility || "private");
      setStatus(product.status || "draft");
    }
  }, [product]);

  const handlePublish = async (e) => {
    e.preventDefault();
    await updateProduct(id, {
      status: "published",
      visibility
    });
    await reload();
    window.alert("Parabéns! Seu produto foi publicado com sucesso e agora está disponível no Curitiba 360.");
    navigate("/parceiro/produtos");
  };

  const handleSaveDraft = async () => {
    await updateProduct(id, {
      status: "draft",
      visibility
    });
    await reload();
    window.alert("Configurações de publicação atualizadas!");
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
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/produtos"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Operações
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Publicar Produto
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Defina as regras de visibilidade e coloque o produto no ar no aplicativo Curitiba 360.
            </p>
          </div>
        </header>

        <form onSubmit={handlePublish} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Regra de Visibilidade</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white cursor-pointer"
            >
              <option value="public">Público (Visível para todos no catálogo)</option>
              <option value="private">Privado (Apenas para quem possuir o link direto)</option>
            </select>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider my-0">Status Atual</h4>
            <p className="text-sm font-bold text-slate-700 my-0">{status.toUpperCase()}</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm cursor-pointer transition"
            >
              Manter Rascunho
            </button>
            <button
              type="submit"
              className="h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm border-none cursor-pointer transition"
            >
              <Send size={16} />
              Publicar Agora
            </button>
          </div>
        </form>
      </div>
    </PartnerLayout>
  );
}
