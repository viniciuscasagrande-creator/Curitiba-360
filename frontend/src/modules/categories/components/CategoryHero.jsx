import React from "react";
import {
  ArrowLeft,
  Search,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

export default function CategoryHero({
  category,
}) {
  const navigate = useNavigate();
  const Icon = category.icon;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const query = String(
      formData.get("query") || ""
    ).trim();

    const params = new URLSearchParams();

    params.set(
      "categoria",
      category.searchCategory
    );

    if (query) {
      params.set("q", query);
    }

    navigate(
      `/buscar?${params.toString()}`
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-left">
      <img
        src={category.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25" />

      <div className="relative z-10 min-h-[360px] px-6 py-7 text-white sm:min-h-[420px] sm:px-10 sm:py-10">
        <Link
          to="/"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 text-decoration-none"
        >
          <ArrowLeft
            size={17}
            aria-hidden="true"
          />

          Voltar
        </Link>

        <div className="mt-14 max-w-2xl sm:mt-20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Icon
                size={25}
                aria-hidden="true"
              />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300 my-0">
              {category.eyebrow}
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl my-0">
            {category.title}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base my-0">
            {category.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl"
          >
            <Search
              size={20}
              className="ml-2 shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <input
              type="search"
              name="query"
              placeholder={`Buscar em ${category.shortTitle.toLowerCase()}...`}
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="h-10 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 border-none cursor-pointer"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
