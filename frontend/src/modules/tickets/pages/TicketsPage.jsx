import React from "react";
import { Link } from "react-router-dom";
import { Ticket, Calendar, MapPin, Eye } from "lucide-react";

const mockTickets = [
  {
    id: "TKT-2026-001",
    title: "Festival de Teatro de Curitiba",
    category: "Teatro",
    date: "2026-08-15",
    time: "20:00",
    location: "Teatro Guaíra (Guairão)",
    type: "VIP / Setor A",
    price: 120.0,
    status: "active",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TKT-2026-002",
    title: "Jardim Botânico - Estufa da Biodiversidade",
    category: "Turismo",
    date: "2026-08-18",
    time: "10:30",
    location: "Jardim Botânico de Curitiba",
    type: "Ingresso Geral",
    price: 0.0,
    status: "active",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
  }
];

export function TicketsPage() {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
          <Ticket size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Meus Ingressos</h1>
          <p className="text-sm text-gray-400">Gerencie e visualize seus acessos a eventos e atrativos.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockTickets.map((ticket) => (
          <div key={ticket.id} className="overflow-hidden rounded-2xl border border-gray-800 bg-[#131720] shadow-lg">
            <div className="relative h-40">
              <img src={ticket.image} alt={ticket.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131720] to-transparent" />
              <span className="absolute left-4 top-4 rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider">
                {ticket.category}
              </span>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white leading-snug">{ticket.title}</h3>
                <p className="text-xs text-gray-500 mt-1">Código: {ticket.id}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-red-500" />
                  <span>{ticket.date} às {ticket.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  <span className="truncate">{ticket.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Lote</span>
                  <span className="text-sm font-semibold text-white">{ticket.type}</span>
                </div>
                <Link
                  to={`/ingressos/${ticket.id}`}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:text-white px-4 py-2 text-sm font-medium text-gray-300 transition"
                >
                  <Eye size={16} />
                  Visualizar QR Code
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
