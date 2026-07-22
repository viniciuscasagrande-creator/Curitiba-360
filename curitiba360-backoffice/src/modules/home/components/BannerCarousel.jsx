import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BannerCarousel({
  banners = [],
  autoplayDelay = 5000,
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    if (banners.length <= 1) {
      return undefined;
    }

    const intervalId =
      window.setInterval(() => {
        setActiveIndex((current) =>
          current === banners.length - 1
            ? 0
            : current + 1
        );
      }, autoplayDelay);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    autoplayDelay,
    banners.length,
  ]);

  if (!banners.length) {
    return null;
  }

  const activeBanner =
    banners[activeIndex];

  function goPrevious() {
    setActiveIndex((current) =>
      current === 0
        ? banners.length - 1
        : current - 1
    );
  }

  function goNext() {
    setActiveIndex((current) =>
      current === banners.length - 1
        ? 0
        : current + 1
    );
  }

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-slate-900"
      aria-label="Destaques"
    >
      <div className="relative min-h-[320px] sm:min-h-[390px]">
        <img
          src={activeBanner.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />

        <div className="relative z-10 flex min-h-[320px] max-w-xl flex-col justify-end px-6 py-8 text-white sm:min-h-[390px] sm:px-10 sm:py-10 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300 my-0">
            Curitiba 360
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl my-0">
            {activeBanner.title}
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base my-0">
            {activeBanner.description}
          </p>

          <div className="mt-6">
            <Link
              to={activeBanner.href}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 text-decoration-none"
            >
              {activeBanner.buttonLabel}
            </Link>
          </div>
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrevious}
            className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 sm:flex border-none cursor-pointer"
            aria-label="Banner anterior"
          >
            <ArrowLeft
              size={20}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 sm:flex border-none cursor-pointer"
            aria-label="Próximo banner"
          >
            <ArrowRight
              size={20}
              aria-hidden="true"
            />
          </button>

          <div className="absolute bottom-4 right-5 z-20 flex gap-2">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() =>
                  setActiveIndex(index)
                }
                className={
                  index === activeIndex
                    ? "h-2 w-7 rounded-full bg-white border-none cursor-pointer p-0"
                    : "h-2 w-2 rounded-full bg-white/50 border-none cursor-pointer p-0"
                }
                aria-label={`Exibir banner ${index + 1}`}
                aria-current={
                  index === activeIndex
                    ? "true"
                    : undefined
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
