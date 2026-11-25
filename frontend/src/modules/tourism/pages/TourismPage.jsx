import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useTourismCategories } from '../hooks/useTourismCategories';
import AttractionFilters from '../components/AttractionFilters';
import AttractionGrid from '../components/AttractionGrid';
import CategoryCard from '../components/CategoryCard';
import { Compass, Map, Sparkles } from 'lucide-react';

export function TourismPage() {
  const navigate = useNavigate();
  const { attractions, loading, error, filters, updateFilter, resetFilters } = useAttractions();
  const { categories } = useTourismCategories();
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles size={16} />
            Descubra a Capital Paranaense
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Turismo & Atrativos de Curitiba
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Explore parques, museus, arquitetura histórica e passeios imperdíveis.
          </p>
        </div>

        <button
          onClick={() => navigate('/turismo/mapa')}
          className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/10 transition-all"
        >
          <Map size={18} />
          Ver Mapa Turístico Interativo
        </button>
      </div>

      {/* Categorias */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
          Categorias Populares
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div
            onClick={() => updateFilter('categoryId', 'todas')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-2 shrink-0 w-32 ${
              filters.categoryId === 'todas'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <Compass size={24} />
            <span className="text-xs">Todas</span>
          </div>

          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={filters.categoryId === cat.id}
              onClick={() => updateFilter('categoryId', cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Filtros */}
      <AttractionFilters
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
      />

      {/* Grid de Atrativos */}
      {error ? (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-center">
          {error}
        </div>
      ) : (
        <AttractionGrid
          attractions={attractions}
          loading={loading}
          favorites={favorites}
          onFavorite={handleFavoriteToggle}
        />
      )}
    </div>
  );
}
export default TourismPage;
