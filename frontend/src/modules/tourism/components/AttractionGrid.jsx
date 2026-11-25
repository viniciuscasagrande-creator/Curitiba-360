import React from 'react';
import AttractionCard from './AttractionCard';
import { Compass } from 'lucide-react';

export function AttractionGrid({ attractions = [], loading = false, favorites = [], onFavorite }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse p-4 space-y-4">
            <div className="h-48 bg-slate-800 rounded-xl" />
            <div className="h-5 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800/60 rounded w-1/2" />
            <div className="h-10 bg-slate-800/80 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (attractions.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl my-6 space-y-3">
        <div className="w-14 h-14 rounded-full bg-slate-800 text-amber-400 mx-auto flex items-center justify-center">
          <Compass size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-200">Nenhum atrativo encontrado</h3>
        <p className="text-slate-400 text-xs max-w-sm mx-auto">
          Tente ajustar a busca ou os filtros para descobrir mais pontos turísticos em Curitiba.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {attractions.map((attr) => (
        <AttractionCard
          key={attr.id}
          attraction={attr}
          isFavorite={favorites.includes(attr.id)}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}
export default AttractionGrid;
