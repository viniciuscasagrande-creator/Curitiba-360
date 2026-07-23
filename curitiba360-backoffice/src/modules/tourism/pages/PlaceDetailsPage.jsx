import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Info, Sparkles } from "lucide-react";
import { ROUTES } from "../../../routes/routePaths";

export function PlaceDetailsPage() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [ticketsCount, setTicketsCount] = useState(1);
  const [success, setSuccess] = useState(false);

  const place = {
    id: placeId || "botanico",
    title: placeId === "opera" ? "Ópera de Arame" : "Jardim Botânico de Curitiba",
    description: placeId === "opera" 
      ? "Teatro circular construído com tubos de aço e placas transparentes de policarbonato, integrado a um cenário natural de tirar o fôlego."
      : "Inaugurado em 1991, é um dos principais marcos da capital, abrigando coleções botânicas nacionais em meio a belos jardins de estilo francês.",
    rating: placeId === "opera" ? 4.8 : 4.9,
    address: placeId === "opera" ? "Rua João Gava, 970 - Abranches" : "Rua Engenheiro Ostoja Roguski, s/n - Jardim Botânico",
    image: placeId === "opera" 
      ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
      : "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!date) return alert("Por favor, selecione uma data.");
    setSuccess(true);
    setTimeout(() => {
      navigate(ROUTES.app.home);
    }, 2500);
  };

  return (
    <div className="space-y-6 text-left mx-auto max-w-4xl">
      <Link to={ROUTES.public.places} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
        <ArrowLeft size={16} />
        Voltar para Turismo
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#131720]">
            <img src={place.image} alt={place.title} className="h-72 w-full object-cover" />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white">{place.title}</h1>
                <span className="rounded-lg bg-gray-900 border border-gray-800 px-2 py-1 text-xs text-amber-500 font-semibold flex items-center gap-1">
                  ⭐ {place.rating}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{place.description}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-2 border-t border-gray-800">
                <MapPin size={14} className="text-red-500" />
                <span>{place.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-800 bg-[#131720] p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-red-500" />
              Agendar Visitação
            </h3>

            {success ? (
              <div className="rounded-xl bg-emerald-950/20 border border-emerald-900/30 p-4 text-xs text-emerald-400 text-center space-y-2">
                <p className="font-bold">Agendamento Realizado!</p>
                <p>Seu voucher digital foi enviado para a aba "Reservas". Redirecionando...</p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-medium block mb-1">Selecione a Data</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl bg-gray-900 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium block mb-1">Quantidade de Acessos</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTicketsCount(Math.max(1, ticketsCount - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 border border-gray-800 font-bold hover:bg-gray-800"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-white text-sm">{ticketsCount}</span>
                    <button
                      type="button"
                      onClick={() => setTicketsCount(ticketsCount + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 border border-gray-800 font-bold hover:bg-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-900/40 p-3 text-xs text-gray-400 flex items-start gap-2">
                  <Info size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>A entrada para este atrativo é gratuita. O agendamento ajuda no controle de capacidade ecológica.</span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm py-3 transition shadow-md shadow-red-600/10"
                >
                  Confirmar Agendamento
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
