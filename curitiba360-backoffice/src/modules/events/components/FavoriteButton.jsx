import React from 'react';
import { Heart } from 'lucide-react';

export function FavoriteButton({ isFavorite, onToggle, size = 20, className = '' }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle && onToggle();
      }}
      className={`p-2 rounded-full transition-all duration-200 ${
        isFavorite
          ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40 hover:bg-rose-500/30'
          : 'bg-black/40 text-slate-300 hover:text-white border border-white/10 hover:bg-black/60'
      } ${className}`}
      title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
    >
      <Heart size={size} className={isFavorite ? 'fill-rose-500' : ''} />
    </button>
  );
}
export default FavoriteButton;
