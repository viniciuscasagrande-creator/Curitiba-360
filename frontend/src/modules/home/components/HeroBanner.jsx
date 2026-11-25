import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Compass,
  MapPin,
  Search,
  Sparkles
} from 'lucide-react';

import { ROUTES } from '../../../routes/routePaths';

export function HeroBanner() {
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('query') || '').trim();

    if (!query) {
      navigate(ROUTES.public.explore);
      return;
    }

    navigate(
      `${ROUTES.public.explore}?q=${encodeURIComponent(query)}`
    );
  }

  return (
    <section className="relative isolate min-h-[440px] overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl sm:min-h-[500px]">
      <img
        src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&auto=format&fit=crop"
        alt="Jardim Botânico de Curitiba"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[440px] items-end px-5 py-7 sm:min-h-[500px] sm:px-10 sm:py-10 lg:px-14">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md">
            <Sparkles size={15} className="text-emerald-300" />
            Tudo de Curitiba em um só lugar
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Viva Curitiba de um jeito completamente novo.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Encontre eventos, atrativos, experiências, gastronomia e
            benefícios para aproveitar melhor cada momento na cidade.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-7 flex max-w-2xl flex-col gap-2 rounded-[1.4rem] bg-white p-2 shadow-2xl sm:flex-row"
          >
            <div className="relative min-w-0 flex-1">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="query"
                type="search"
                placeholder="O que você quer conhecer?"
                className="h-12 w-full rounded-2xl bg-transparent pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
            >
              Explorar
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate(ROUTES.public.events)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <CalendarDays size={15} />
              Eventos
            </button>

            <button
              type="button"
              onClick={() => navigate(ROUTES.public.tourism)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <Compass size={15} />
              Turismo
            </button>

            <button
              type="button"
              onClick={() => navigate(ROUTES.public.tourismMap)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <MapPin size={15} />
              Mapa da cidade
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
