import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

export default function DetailGallery({
  images = [],
  title,
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  if (!images.length) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
        <Images size={42} />
      </div>
    );
  }

  const activeImage =
    images[activeIndex];

  function previousImage() {
    setActiveIndex((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  }

  // Next image
  function nextImage() {
    setActiveIndex((current) =>
      current ===
      images.length - 1
        ? 0
        : current + 1
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-100 select-none">
      <div className="grid min-h-[330px] gap-1 md:grid-cols-[2fr_1fr] lg:min-h-[460px]">
        <div className="relative overflow-hidden">
          <img
            src={activeImage}
            alt={title}
            className="h-full min-h-[330px] w-full object-cover lg:min-h-[460px]"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white border-none cursor-pointer"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={21} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white md:hidden border-none cursor-pointer"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={21} />
              </button>
            </>
          )}
        </div>

        <div className="hidden grid-rows-2 gap-1 md:grid">
          {images
            .slice(1, 3)
            .map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() =>
                  setActiveIndex(
                    index + 1
                  )
                }
                className="relative overflow-hidden border-none p-0 cursor-pointer"
              >
                <img
                  src={image}
                  alt={`${title} ${index + 2}`}
                  className="h-full w-full object-cover transition hover:scale-105"
                />
              </button>
            ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        {activeIndex + 1} de{" "}
        {images.length}
      </div>
    </section>
  );
}
