import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { updateProduct } from "../services/productService";
import { useProduct } from "../hooks/useProduct";
import { productSchema } from "../schemas/productSchema";
import { PRODUCT_TYPES } from "../constants/productTypes";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, reload } = useProduct(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("type", product.type);
      setValue("category", product.category);
      setValue("shortDescription", product.shortDescription);
      setValue("description", product.description);
      setValue("basePrice", product.pricing?.basePrice || 0);
      setValue("maxCapacity", product.capacity?.maxCapacity || 100);
      setValue("limitPerCPF", product.capacity?.limitPerCPF || 4);
      setValue("address", product.location?.address || "");
      setValue("zipCode", product.location?.zipCode || "");
      setValue("parking", product.location?.parking || false);
      setValue("accessibility", product.location?.accessibility || true);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProduct(id, {
        title: data.title,
        type: data.type,
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        location: {
          ...product.location,
          address: data.address,
          zipCode: data.zipCode,
          parking: data.parking,
          accessibility: data.accessibility,
        },
        pricing: {
          ...product.pricing,
          basePrice: data.basePrice,
        },
        capacity: {
          ...product.capacity,
          maxCapacity: data.maxCapacity,
          limitPerCPF: data.limitPerCPF,
        }
      });
      window.alert("Produto atualizado com sucesso!");
      navigate("/parceiro/produtos");
    } catch (err) {
      window.alert(err.message || "Erro ao salvar.");
    }
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
      <div className="mx-auto max-w-3xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/produtos"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Catálogo Comercial
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Editar Produto
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Faça as alterações necessárias nos campos do produto.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Título do Produto</label>
              <input
                {...register("title")}
                placeholder="Ex: Show Acústico no Paiol"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
              />
              {errors.title && <p className="mt-1 text-xs text-red-655 my-0">{errors.title.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Produto</label>
              <select
                {...register("type")}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white cursor-pointer"
              >
                {Object.entries(PRODUCT_TYPES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-xs text-red-655 my-0">{errors.type.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Categoria</label>
              <select
                {...register("category")}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white cursor-pointer"
              >
                {Object.entries(PRODUCT_CATEGORIES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-655 my-0">{errors.category.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Preço Base (R$)</label>
              <input
                type="number"
                step="0.01"
                {...register("basePrice", { valueAsNumber: true })}
                placeholder="Ex: 45.00"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
              />
              {errors.basePrice && <p className="mt-1 text-xs text-red-655 my-0">{errors.basePrice.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Descrição Curta (Resumo)</label>
            <input
              {...register("shortDescription")}
              placeholder="Resumo em poucas palavras para listagens e SEO..."
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
            />
            {errors.shortDescription && <p className="mt-1 text-xs text-red-655 my-0">{errors.shortDescription.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Descrição Detalhada</label>
            <textarea
              {...register("description")}
              placeholder="Detalhes completos sobre o local, horários, recomendações..."
              rows={5}
              className="w-full rounded-xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white resize-none"
            />
            {errors.description && <p className="mt-1 text-xs text-red-655 my-0">{errors.description.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Capacidade Máxima de Ingressos/Reservas</label>
              <input
                type="number"
                {...register("maxCapacity", { valueAsNumber: true })}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
              />
              {errors.maxCapacity && <p className="mt-1 text-xs text-red-655 my-0">{errors.maxCapacity.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Limite de ingressos por CPF</label>
              <input
                type="number"
                {...register("limitPerCPF", { valueAsNumber: true })}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
              />
              {errors.limitPerCPF && <p className="mt-1 text-xs text-red-655 my-0">{errors.limitPerCPF.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Endereço do Local</label>
              <input
                {...register("address")}
                placeholder="Ex: Rua Mateus Leme, 90"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">CEP</label>
              <input
                {...register("zipCode")}
                placeholder="Ex: 80000-000"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-sm text-slate-750">
              <input
                type="checkbox"
                {...register("parking")}
                className="h-4 w-4 accent-emerald-600 rounded"
              />
              Estacionamento no Local
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-sm text-slate-750">
              <input
                type="checkbox"
                {...register("accessibility")}
                className="h-4 w-4 accent-emerald-600 rounded"
              />
              Acessibilidade para PCD
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-sm border-none cursor-pointer transition"
          >
            <Save size={18} />
            Salvar Alterações
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
