import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, LayoutGrid, CalendarDays, Coins, BarChart3, HelpCircle } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { duplicateProduct, deleteProduct } from "../services/productService";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    status: "all",
  });

  const { products, loading, reload } = useProducts(filters);

  const handleDuplicate = async (id) => {
    try {
      await duplicateProduct(id);
      await reload();
      window.alert("Produto duplicado como rascunho com sucesso!");
    } catch (err) {
      window.alert(err.message || "Erro ao duplicar.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este rascunho permanentemente?")) {
      return;
    }
    try {
      await deleteProduct(id);
      await reload();
      window.alert("Rascunho excluído com sucesso!");
    } catch (err) {
      window.alert(err.message || "Erro ao excluir.");
    }
  };

  const totalPublished = products.filter((p) => p.status === "published").length;
  const totalDraft = products.filter((p) => p.status === "draft").length;

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-7xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Catálogo Comercial
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 my-0">
              Atrações, Eventos e Experiências
            </h1>
            <p className="mt-2 text-sm text-slate-600 my-0">
              Cadastre e gerencie o catálogo de vendas do seu estabelecimento.
            </p>
          </div>

          <Link
            to="/parceiro/produtos/novo"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white text-decoration-none hover:bg-slate-800 transition cursor-pointer"
          >
            <Plus size={18} />
            Novo Produto
          </Link>
        </header>

        {/* Dashboard/KPI summary row */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Produtos Publicados</span>
            <strong className="block text-3xl font-extrabold text-slate-950 mt-2">{totalPublished}</strong>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rascunhos</span>
            <strong className="block text-3xl font-extrabold text-slate-950 mt-2">{totalDraft}</strong>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total de Visitas</span>
            <strong className="block text-3xl font-extrabold text-slate-950 mt-2">
              {products.reduce((acc, p) => acc + (p.analytics?.views || 0), 0)}
            </strong>
          </div>
        </section>

        <ProductFilters filters={filters} onChange={setFilters} />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[360px] animate-pulse rounded-3xl bg-slate-200" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Nenhum produto cadastrado com os filtros informados.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
