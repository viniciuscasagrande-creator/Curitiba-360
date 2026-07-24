import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Filter,
  Plus,
  Save,
  Search,
  Ticket,
  Trash2,
  X
} from 'lucide-react';
import { AttractionCategoriesTable } from '../components/AttractionCategoriesTable';
import { AttractionSidebar } from '../components/AttractionSidebar';
import { attractionCategoriesMock, attractionsMock } from '../data/attractionsMock';
import { attractionRoutes } from '../routes/attractionRoutes';

export function AttractionCategoriesPage() {
  const navigate = useNavigate();
  const { attractionId } = useParams();

  const attraction = useMemo(
    () => attractionsMock.find((item) => item.id === attractionId) || attractionsMock[0],
    [attractionId]
  );

  const [categories, setCategories] = useState(
    attractionCategoriesMock.filter((c) => c.attractionId === attraction.id)
  );

  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => {
      if (!q) return true;
      return (c.name + ' ' + c.description + ' ' + c.id).toLowerCase().includes(q);
    });
  }, [categories, query]);

  function handleSave(form) {
    if (editingCategory) {
      setCategories((current) =>
        current.map((item) => (item.id === editingCategory.id ? { ...item, ...form } : item))
      );
    } else {
      setCategories((current) => [
        {
          ...form,
          id: `cat-${Date.now()}`,
          attractionId: attraction.id
        },
        ...current
      ]);
    }
    setDrawerOpen(false);
    setEditingCategory(null);
  }

  function handleDelete(category) {
    if (category.ticketsIssued > 0) {
      window.alert(
        'Esta categoria já possui ingressos emitidos. Inative a categoria em vez de excluir.'
      );
      return;
    }

    if (window.confirm(`Excluir a categoria "${category.name}"?`)) {
      setCategories((current) => current.filter((item) => item.id !== category.id));
    }
  }

  function toggleItem(id) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  }

  function toggleAll() {
    const visibleIds = filteredCategories.map((c) => c.id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleIds);
    }
  }

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 text-left">
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(attractionRoutes.list)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Categorias de Ingresso &bull; {attraction.general?.name}
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              Categorias da Atração
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative sm:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar categoria..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none font-medium focus:border-emerald-500"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setDrawerOpen(true);
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-sm"
          >
            <Plus size={18} />
            Adicionar Categoria
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row">
        <AttractionSidebar
          attractionId={attraction.id}
          attractionName={attraction.general?.name}
        />

        <div className="flex-1 space-y-6">
          <AttractionCategoriesTable
            categories={filteredCategories}
            selectedIds={selectedIds}
            onToggle={toggleItem}
            onToggleAll={toggleAll}
            onEdit={(cat) => {
              setEditingCategory(cat);
              setDrawerOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {drawerOpen && (
        <CategoryDrawer
          open={drawerOpen}
          category={editingCategory}
          onSave={handleSave}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}

function CategoryDrawer({ open, category, onSave, onClose }) {
  const [form, setForm] = useState({
    name: category?.name || '',
    description: category?.description || '',
    price: category?.price || 10.00,
    quantity: category?.quantity || 100,
    status: category?.status || 'active',
    batchCode: category?.batchCode || '001'
  });

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-xs" />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl text-left">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Ticket size={20} />
            </span>
            <div>
              <h2 className="font-black text-slate-900">
                {category ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Configure valores e lote.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </header>

        <form
          id="category-drawer-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex-1 space-y-4 overflow-y-auto p-6"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Categoria *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex: Morador Curitiba Adulto"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Descrição</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Condições ou regras..."
              className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Preço (R$)</label>
              <input
                type="number"
                step="0.50"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-emerald-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quantidade</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </form>

        <footer className="flex gap-3 border-t border-slate-200 p-6 bg-slate-50/80">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            form="category-drawer-form"
            type="submit"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700"
          >
            <Save size={17} />
            Salvar
          </button>
        </footer>
      </aside>
    </>
  );
}

export default AttractionCategoriesPage;
