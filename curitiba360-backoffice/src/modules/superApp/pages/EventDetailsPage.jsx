import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Ticket, ShieldCheck, CheckCircle } from "lucide-react";
import { useTickets } from "../hooks/useTickets";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { reload } = useTickets();
  const [success, setSuccess] = useState(false);

  const eventDetails = {
    id: "event-001",
    name: "Festival Cultural de Curitiba",
    date: "2026-08-15",
    startTime: "18:00",
    location: "Centro de Eventos Curitiba",
    price: 80.0,
    desc: "O maior evento multicultural da região sul, reunindo culinária, shows folclóricos e apresentações de danças tradicionais dos imigrantes."
  };

  const handleBuy = () => {
    // Simulate purchase & emission
    setSuccess(true);
    setTimeout(() => {
      navigate("/app/tickets");
    }, 2000);
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/events" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Eventos
        </Link>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-3 animate-fadeIn my-12">
            <CheckCircle size={40} className="text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900 m-0">Ingresso Emitido!</h3>
            <p className="text-[10px] text-emerald-700 m-0">Seu QR Code dinâmico já está disponível na sua carteira de ingressos.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 m-0">{eventDetails.name}</h2>
              <p className="text-[10px] text-slate-500 m-0 mt-0.5 flex items-center gap-1">
                <Calendar size={11} className="text-emerald-600" /> {eventDetails.date} às {eventDetails.startTime}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono">
                <MapPin size={14} className="text-emerald-600" />
                <span>{eventDetails.location}</span>
              </div>
              <p className="text-[10px] text-slate-555 leading-relaxed m-0 mt-1">
                {eventDetails.desc}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Ingresso Geral</span>
                <strong className="text-lg text-slate-900 font-mono">R$ {eventDetails.price.toFixed(2)}</strong>
              </div>
              <button
                onClick={handleBuy}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition border-none cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Ticket size={16} /> Comprar Ingresso via PIX
              </button>
              <span className="text-[8px] text-slate-400 flex items-center justify-center gap-1 font-mono">
                <ShieldCheck size={10} className="text-emerald-500" /> Compra segura com split automatizado
              </span>
            </div>
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
