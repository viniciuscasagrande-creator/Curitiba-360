import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BannerCarousel({ banners = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [banners.length, handleNext]);

  if (!banners.length) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 select-none">
      <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden rounded-3xl shadow-lg">
        {/* Banner Slides */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover transition-transform duration-[5000ms] hover:scale-105"
            />
            {/* Dark/Green Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white flex flex-col justify-end text-left">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Destaque Especial
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                {banner.title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-200 max-w-md line-clamp-2">
                {banner.subtitle}
              </p>
              
              {banner.link && (
                <div className="mt-4">
                  <Link
                    to={banner.link}
                    className="inline-flex items-center justify-center h-9 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-500 shadow-md shadow-emerald-950/20 text-decoration-none"
                  >
                    Ver detalhes
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Navigation Arrow buttons */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/40 transition outline-none"
              aria-label="Banner anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/40 transition outline-none"
              aria-label="Próximo banner"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicator dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-emerald-500" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Ir para o banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
