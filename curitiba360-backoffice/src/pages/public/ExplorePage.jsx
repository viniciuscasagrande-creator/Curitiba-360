import { useState, useEffect } from 'react';
import { getAttractions } from '../../services/attractionService';
import { getEvents } from '../../services/eventService';
import { formatCurrency } from '../../utils/formatCurrency';
import BottomNavigation from '../../components/layout/BottomNavigation';
import { Search, MapPin, Navigation, Star, Filter } from 'lucide-react';

export default function ExplorePage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [radius, setRadius] = useState('5km');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [attractions, events] = await Promise.all([
        getAttractions(),
        getEvents()
      ]);

      const normalized = [
        ...attractions.map(a => ({ ...a, type: 'Atração', distance: '1,2 km', rating: '4.9' })),
        ...events.map(e => ({ ...e, name: e.title, type: 'Evento', distance: '2,8 km', rating: '4.8' }))
      ];

      setItems(normalized);
      setLoading(false);
    }
    load();
  }, []);

  const categories = ['Todos', 'Atração', 'Evento', 'Gastronomia', 'Hospedagem', 'Benefícios'];

  const filtered = items.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.type === selectedCategory;
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-slate-950/90 p-4 backdrop-blur border-b border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="O que você procura em Curitiba?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-300">
            <Filter size={18} />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Geolocation Radius bar */}
      <div className="p-4 flex items-center justify-between border-b border-slate-900 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <MapPin size={14} className="text-blue-500" />
          Perto de você em Curitiba
        </span>

        <div className="flex gap-1">
          {['500m', '1km', '5km', '10km'].map(r => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                radius === r ? 'bg-blue-500/20 text-blue-400 font-bold' : 'hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm animate-pulse">
            Localizando opções próximas...
          </div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-lg space-y-3 transition hover:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
                    {item.type}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white">{item.name}</h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-amber-400">
                    <Star size={14} fill="currentColor" /> {item.rating}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Navigation size={14} className="text-blue-400" /> {item.distance}
                  </span>
                </div>

                <strong className="text-sm font-bold text-blue-400">
                  {item.price > 0 ? formatCurrency(item.price) : 'Gratuito'}
                </strong>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
