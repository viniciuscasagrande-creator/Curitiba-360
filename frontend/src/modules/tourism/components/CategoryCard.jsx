import React from 'react';
import { Trees, Building, Compass, Utensils, Landmark, ShoppingBag, Theater, Sun } from 'lucide-react';

const ICON_MAP = {
  Trees,
  Building,
  Compass,
  Utensils,
  Landmark,
  ShoppingBag,
  Theater,
  Sun
};

export function CategoryCard({ category, isSelected = false, onClick }) {
  const IconComponent = ICON_MAP[category.icon] || Compass;

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-2 shrink-0 w-32 ${
        isSelected
          ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20 scale-105'
          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-white'
      }`}
    >
      <IconComponent size={24} />
      <span className="text-xs">{category.name}</span>
    </div>
  );
}
export default CategoryCard;
