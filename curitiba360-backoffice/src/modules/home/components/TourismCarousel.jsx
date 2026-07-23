import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttractions } from '../../tourism/hooks/useAttractions';
import AttractionCard from '../../tourism/components/AttractionCard';
import { Trees, ArrowRight } from 'lucide-react';

export function TourismCarousel() {
  const navigate = useNavigate();
  const { attractions, loading } = useAttractions();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Trees size={20} className="text-emerald-400" />
            Explore Curitiba
          </h3>
          <p className="text-xs text-slate-400">Parques, museus e atrações imperdíveis da capital ecológica</p>
        </div>

        <button
          onClick={() => navigate('/turismo')}
          className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
        >
          Ver Todos ({attractions.length})
          <ArrowRight size={14} />
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 text-xs">Carregando atrativos turísticos...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {attractions.slice(0, 3).map((attr) => (
            <AttractionCard key={attr.id} attraction={attr} />
          ))}
        </div>
      )}
    </div>
  );
}
export default TourismCarousel;
