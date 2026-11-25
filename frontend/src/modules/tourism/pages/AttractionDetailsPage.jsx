import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttraction } from '../hooks/useAttraction';
import AttractionGallery from '../components/AttractionGallery';
import AttractionSchedule from '../components/AttractionSchedule';
import AttractionAmenities from '../components/AttractionAmenities';
import AttractionMap from '../components/AttractionMap';
import { ArrowLeft, Calendar, MapPin, Star, Share2, Heart, Clock } from 'lucide-react';

export function AttractionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { attraction, loading, error } = useAttraction(id || 'att-1');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <p>Carregando atrativo turístico...</p>
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center space-y-4">
        <p className="text-rose-400 font-bold">{error || 'Atrativo não encontrado.'}</p>
        <button onClick={() => navigate('/turismo')} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">
          Voltar ao Turismo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Voltar */}
      <button
        onClick={() => navigate('/turismo')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para a lista de atrativos
      </button>

      {/* Hero Banner do Atrativo */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="relative h-72 md:h-96 w-full">
          <img
            src={attraction.coverImage}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-slate-950">
                {attraction.categoryName}
              </span>

              <h1 className="text-2xl md:text-4xl font-extrabold text-white">
                {attraction.name}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star size={14} className="fill-amber-400" />
                  {attraction.rating ? attraction.rating.toFixed(1) : '4.9'} ({attraction.reviewCount || 100} avaliações)
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin size={14} className="text-amber-400" />
                  {attraction.address?.neighborhood || 'Curitiba'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/turismo/${attraction.id}/reserva`)}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2 text-sm"
              >
                <Calendar size={18} />
                {attraction.free ? 'Fazer Reserva Gratuita' : 'Reservar Ingresso'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Detalhes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Descrição */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">Sobre o Atrativo</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{attraction.description || attraction.shortDescription}</p>
          </div>

          <AttractionGallery gallery={attraction.gallery} coverImage={attraction.coverImage} />

          <AttractionMap location={attraction.location} name={attraction.name} address={attraction.address} />
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-6">
          <AttractionSchedule openingHours={attraction.openingHours} />

          <AttractionAmenities attraction={attraction} />

          {/* Card de Preço / CTA */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 text-center shadow-xl">
            <span className="text-xs uppercase font-semibold text-slate-400 block">Entrada</span>
            <span className="text-3xl font-black text-amber-400 block">
              {attraction.free ? 'Gratuito' : `R$ ${attraction.priceFrom?.toFixed(2)}`}
            </span>

            <button
              onClick={() => navigate(`/turismo/${attraction.id}/reserva`)}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Calendar size={18} />
              Garantir Minha Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AttractionDetailsPage;
