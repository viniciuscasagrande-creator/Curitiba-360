import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, Compass, ArrowRight } from 'lucide-react';

export function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
      {/* Imagem de Fundo de Alta Qualidade */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&auto=format&fit=crop"
          alt="Jardim Botânico de Curitiba"
          className="w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles size={14} />
          Super App Curitiba 360
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Descubra Curitiba <br />
          <span className="text-amber-400">de um jeito novo.</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Eventos, turismo, gastronomia, carteira digital e benefícios municipais reunidos em uma única experiência inteligente.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => navigate('/explorar')}
            className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Compass size={18} />
            Explorar Curitiba
          </button>

          <button
            onClick={() => navigate('/eventos')}
            className="flex items-center gap-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl border border-slate-700 backdrop-blur-md transition-all hover:border-slate-600"
          >
            <Calendar size={18} className="text-amber-400" />
            Ver Eventos
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default HeroBanner;
