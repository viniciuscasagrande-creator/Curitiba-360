import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Compass, Search } from "lucide-react";

const mockPlaces = [
  {
    id: "botanico",
    title: "Jardim Botânico de Curitiba",
    description: "Cartão-postal da cidade, com sua famosa estufa de ferro e vidro inspirada no Palácio de Cristal de Londres.",
    rating: 4.9,
    address: "Rua Engenheiro Ostoja Roguski, s/n - Jardim Botânico",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "opera",
    title: "Ópera de Arame",
    description: "Teatro circular construído com tubos de aço e placas transparentes de policarbonato, em meio a lagos e cascatas.",
    rating: 4.8,
    address: "Rua João Gava, 970 - Abranches",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  }
];

export function PlacesPage() {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
            <Compass size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Turismo & Atrativos</h1>
            <p className="text-sm text-gray-400">Descubra os pontos turísticos e parques mais visitados de Curitiba.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockPlaces.map((place) => (
          <div key={place.id} className="overflow-hidden rounded-2xl border border-gray-800 bg-[#131720] shadow-lg flex flex-col justify-between">
            <div>
              <div className="relative h-48">
                <img src={place.image} alt={place.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131720] to-transparent" />
                <span className="absolute right-4 top-4 rounded-lg bg-gray-900/90 border border-gray-800 px-2.5 py-1 text-xs font-semibold text-amber-500 flex items-center gap-1">
                  ⭐ {place.rating}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-white">{place.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{place.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={14} className="text-red-500" />
                  <span className="truncate">{place.address}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                to={`/atrativos/${place.id}`}
                className="block text-center rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm py-2.5 transition"
              >
                Ver Detalhes & Agendar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
