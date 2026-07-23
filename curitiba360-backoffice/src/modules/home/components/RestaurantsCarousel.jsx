import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Star, MapPin, ArrowRight } from 'lucide-react';

const mockRestaurants = [
  {
    id: 'rest-1',
    name: 'Restaurante Madalosso',
    category: 'Italiana',
    rating: 4.8,
    neighborhood: 'Santa Felicidade',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    price: '$$$'
  },
  {
    id: 'rest-2',
    name: 'Bar do Victor',
    category: 'Frutos do Mar',
    rating: 4.9,
    neighborhood: 'São Lourenço',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    price: '$$$'
  },
  {
    id: 'rest-3',
    name: 'Mercado Municipal - Praça Gastronômica',
    category: 'Variada & Orgânicos',
    rating: 4.9,
    neighborhood: 'Centro',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop',
    price: '$$'
  }
];

export function RestaurantsCarousel() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <UtensilsCrossed size={20} className="text-rose-600" />
            Gastronomia Curitibana
          </h3>
          <p className="text-xs text-slate-500">Restaurantes, cafés e feiras gastronômicas consagradas</p>
        </div>

        <button
          onClick={() => navigate('/explorar?cat=gastronomia')}
          className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
        >
          Ver Gastronomia
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockRestaurants.map((rest) => (
          <div
            key={rest.id}
            onClick={() => navigate('/explorar')}
            className="group bg-white border border-slate-200 hover:border-amber-400 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-44 w-full">
              <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400 text-[10px] font-extrabold backdrop-blur-md">
                {rest.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{rest.name}</h4>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  {rest.rating}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-amber-600" />
                  {rest.neighborhood}
                </span>
                <span className="font-mono text-slate-700 font-bold">{rest.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RestaurantsCarousel;
