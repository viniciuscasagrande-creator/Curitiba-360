import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Upload, Image, Trash2 } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useProduct } from "../hooks/useProduct";
import { updateProduct } from "../services/productService";

export default function ProductImagesPage() {
  const { id } = useParams();
  const { product, loading, reload } = useProduct(id);

  const handleUploadSimulate = async () => {
    const simulatedUrl = `/images/products/simulated-${Date.now()}.jpg`;
    const currentImages = product.images || [];
    await updateProduct(id, {
      images: [...currentImages, simulatedUrl]
    });
    await reload();
    window.alert("Imagem adicionada à galeria do produto!");
  };

  const handleRemoveImage = async (url) => {
    const currentImages = product.images || [];
    const filtered = currentImages.filter((img) => img !== url);
    await updateProduct(id, {
      images: filtered
    });
    await reload();
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
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/produtos"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Mídias
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Imagens e Galeria
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Gerencie as fotos da galeria, capa e banners do produto.
            </p>
          </div>
        </header>

        <section
          onClick={handleUploadSimulate}
          className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-white hover:bg-slate-50 transition cursor-pointer select-none"
        >
          <Upload size={32} className="mx-auto text-slate-400 mb-2" />
          <span className="text-sm font-semibold text-slate-700 block">Clique para simular upload de foto</span>
          <span className="text-xs text-slate-450 block mt-1">Apenas JPG, PNG ou WEBP de até 5MB</span>
        </section>

        <section className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          {(product.images || []).map((img, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-square group bg-slate-50">
              <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                <Image size={32} />
              </div>
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  onClick={() => handleRemoveImage(img)}
                  className="h-9 w-9 flex items-center justify-center rounded-xl bg-white text-red-650 hover:text-red-700 border-none cursor-pointer"
                  title="Remover"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {(product.images || []).length === 0 && (
            <div className="col-span-full py-12 border border-slate-200 rounded-3xl text-center text-slate-500 bg-white">
              Nenhuma imagem na galeria.
            </div>
          )}
        </section>
      </div>
    </PartnerLayout>
  );
}
