import React from "react";
import { Link } from "react-router-dom";
import { Heart, Calendar, MapPin } from "lucide-react";

const mockFavorites = [
  {
    id: "botanico",
    title: "Jardim Botânico de Curitiba",
    type: "atrativo",
    address: "Rua Engenheiro Ostoja Roguski, s/n - Jardim Botânico",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "evt-1",
    title: "Festival de Teatro de Curitiba",
    type: "evento",
    date: "2026-08-15 às 20:00",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  }
];

export function FavoritesPage() {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
          <Heart size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Meus Favoritos</h1>
          <p className="text-sm text-gray-400">Veja seus eventos e atrações salvos para acesso rápido.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockFavorites.map((fav) => (
          <div key={fav.id} className="overflow-hidden rounded-2xl border border-gray-800 bg-[#131720] shadow-lg flex flex-col justify-between">
            <div>
              <div className="relative h-44">
                <img src={fav.image} alt={fav.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131720] to-transparent" />
                <span className="absolute left-4 top-4 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white uppercase tracking-wider">
                  {fav.type}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-white">{fav.title}</h3>
                {fav.type === "evento" ? (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={14} className="text-red-500" />
                    <span>{fav.date}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin size={14} className="text-red-500" />
                    <span className="truncate">{fav.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                to={fav.type === "evento" ? `/eventos/${fav.id}` : `/atrativos/${fav.id}`}
                className="block text-center rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:text-white font-medium text-sm py-2.5 transition text-gray-300"
              >
                Acessar Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
