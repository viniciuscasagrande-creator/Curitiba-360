import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import SmartSearch from "../components/SmartSearch";
import AttractionCard from "../components/AttractionCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AttractionsPage() {
  const [search, setSearch] = useState("");

  const attractions = [
    { id: "recommendation-001", type: "Museu", title: "Museu Oscar Niemeyer", distanceKm: 3.4, rating: 4.8 },
    { id: "recommendation-002", type: "Parque", title: "Jardim Botânico de Curitiba", distanceKm: 2.1, rating: 4.9 },
    { id: "recommendation-003", type: "Teatro", title: "Ópera de Arame", distanceKm: 6.3, rating: 4.8 }
  ];

  const filtered = attractions.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Pontos Turísticos & Atrações</h2>
          <p className="text-[10px] text-slate-500 m-0">Horários de funcionamento, distâncias e compra de ingressos.</p>
        </div>

        <SmartSearch onSearch={setSearch} placeholder="Pesquisar museu, parque, ópera..." />

        <div className="space-y-3">
          {filtered.map((attr) => (
            <AttractionCard key={attr.id} attraction={attr} />
          ))}
        </div>
      </div>
    </SuperAppLayout>
  );
}
