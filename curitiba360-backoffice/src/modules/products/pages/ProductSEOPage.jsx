import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Globe } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useProduct } from "../hooks/useProduct";
import { updateProduct } from "../services/productService";

export default function ProductSEOPage() {
  const { id } = useParams();
  const { product, loading, reload } = useProduct(id);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    if (product?.seo) {
      setMetaTitle(product.seo.metaTitle || "");
      setMetaDescription(product.seo.metaDescription || "");
      setKeywords(product.seo.keywords || "");
    }
  }, [product]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProduct(id, {
      seo: {
        metaTitle,
        metaDescription,
        keywords
      }
    });
    await reload();
    window.alert("Configurações de SEO salvas com sucesso!");
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
              Marketing
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Otimização de SEO
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Configure tags para melhorar o ranqueamento do produto em motores de busca como o Google.
            </p>
          </div>
        </header>

        <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Meta Title (Título da Aba)</label>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Ex: Passeio e Tour por Curitiba - Compre Ingressos"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Digite uma descrição resumida para indexação..."
              rows={4}
              className="w-full rounded-xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Palavras-chave (Separadas por vírgula)</label>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Ex: turismo, curitiba, tour historico"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer transition"
          >
            <Globe size={18} />
            Salvar SEO
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
