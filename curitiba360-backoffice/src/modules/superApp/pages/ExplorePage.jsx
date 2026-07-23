import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import SmartSearch from "../components/SmartSearch";
import EventCard from "../components/EventCard";
import AttractionCard from "../components/AttractionCard";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["Todos", "Atrações", "Eventos", "Gastronomia", "Serviços"];
  const [selectedCat, setSelectedCat] = useState("Todos");

  const mockAttractions = [
    { id: "attr-1", title: "Jardim Botânico", type: "Atrações", distanceKm: 2.1, rating: 4.9 },
    { id: "attr-2", title: "Ópera de Arame", type: "Atrações", distanceKm: 6.3, rating: 4.8 },
    { id: "attr-3", title: "Cantina Família Madalosso", type: "Gastronomia", distanceKm: 7.8, rating: 4.7 }
  ];

  const mockEvents = [
    { id: "evt-1", name: "Feira do Largo da Ordem", date: "Domingo", startTime: "09:00", location: "Largo da Ordem" },
    { id: "evt-2", name: "Festival de Teatro de Curitiba", date: "2026-08-20", startTime: "20:00", location: "Teatro Guaíra" }
  ];

  const filteredAttractions = mockAttractions.filter(
    (item) =>
      (selectedCat === "Todos" || item.type === selectedCat) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Explorar Curitiba</h2>
          <p className="text-[10px] text-slate-500 m-0">Descubra o melhor da cidade inteligente em tempo real.</p>
        </div>

        <SmartSearch onSearch={setSearchQuery} placeholder="Buscar locais, museus, cantinas..." />

        {/* Categories Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 text-[10px] font-bold rounded-full border transition shrink-0 cursor-pointer ${
                selectedCat === cat
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {selectedCat !== "Eventos" && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Locais & Atrações</h3>
            <div className="grid grid-cols-1 gap-3">
              {filteredAttractions.map((attr) => (
                <AttractionCard key={attr.id} attraction={attr} />
              ))}
            </div>
          </div>
        )}

        {selectedCat !== "Atrações" && selectedCat !== "Gastronomia" && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Eventos Culturais</h3>
            <div className="grid grid-cols-1 gap-3">
              {mockEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
