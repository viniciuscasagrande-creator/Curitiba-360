import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import SmartSearch from "../components/SmartSearch";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EventsPage() {
  const [search, setSearch] = useState("");

  const events = [
    { id: "event-001", name: "Festival Cultural de Curitiba", date: "2026-08-15", startTime: "18:00", location: "Centro de Eventos Curitiba" },
    { id: "event-002", name: "Natal de Curitiba - Luz dos Pinhais", date: "2026-11-28", startTime: "19:30", location: "Centro Histórico" },
    { id: "event-003", name: "Maratona Internacional de Curitiba", date: "2026-11-15", startTime: "06:00", location: "Praça da Nossa Senhora da Salete" }
  ];

  const filtered = events.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Eventos na Cidade</h2>
          <p className="text-[10px] text-slate-500 m-0">Agendas culturais, shows, maratonas e programações gratuitas.</p>
        </div>

        <SmartSearch onSearch={setSearch} placeholder="Pesquisar shows, natal, corridas..." />

        <div className="space-y-3">
          {filtered.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>
    </SuperAppLayout>
  );
}
