import React from "react";
import {
  ArrowLeft,
  Map,
  SlidersHorizontal,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import SearchEmpty from "../components/SearchEmpty";
import SearchFilters from "../components/SearchFilters";
import SearchInput from "../components/SearchInput";
import SearchLoading from "../components/SearchLoading";
import SearchResultCard from "../components/SearchResultCard";
import SearchSort from "../components/SearchSort";

import {
  useSearch,
} from "../hooks/useSearch";

const defaultFilters = {
  category: "",
  rating: "",
  maxDistance: "30",
  today: false,
  weekend: false,
  free: false,
  partner: false,
  petFriendly: false,
  accessible: false,
};

function parseBoolean(value) {
  return value === "true";
}

export default function SearchPage() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const query =
    searchParams.get("q") || "";

  const sort =
    searchParams.get("sort") ||
    "relevance";

  const filters = useMemo(
    () => ({
      category:
        searchParams.get(
          "categoria"
        ) || "",

      rating:
        searchParams.get(
          "avaliacao"
        ) || "",

      maxDistance:
        searchParams.get(
          "distancia"
        ) || "30",

      today: parseBoolean(
        searchParams.get("hoje")
      ),

      weekend: parseBoolean(
        searchParams.get(
          "fimDeSemana"
        )
      ),

      free: parseBoolean(
        searchParams.get(
          "gratuito"
        )
      ),

      partner: parseBoolean(
        searchParams.get(
          "parceiro"
        )
      ),

      petFriendly: parseBoolean(
        searchParams.get(
          "petFriendly"
        )
      ),

      accessible: parseBoolean(
        searchParams.get(
          "acessivel"
        )
      ),
    }),
    [searchParams]
  );

  const {
    results,
    loading,
    error,
  } = useSearch({
    query,
    filters,
    sort,
  });

  function updateParams(updates) {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (
          value === "" ||
          value === false ||
          value === null ||
          value === undefined
        ) {
          nextParams.delete(key);
          return;
        }

        nextParams.set(
          key,
          String(value)
        );
      }
    );

    setSearchParams(nextParams, {
      replace: true,
    });
  }

  function handleQueryChange(value) {
    updateParams({
      q: value,
    });
  }

  function handleFiltersChange(
    nextFilters
  ) {
    updateParams({
      categoria:
        nextFilters.category,
      avaliacao:
        nextFilters.rating,
      distancia:
        nextFilters.maxDistance ===
        "30"
          ? ""
          : nextFilters.maxDistance,
      hoje: nextFilters.today,
      fimDeSemana:
        nextFilters.weekend,
      gratuito:
        nextFilters.free,
      parceiro:
        nextFilters.partner,
      petFriendly:
        nextFilters.petFriendly,
      acessivel:
        nextFilters.accessible,
    });
  }

  function clearFilters() {
    const nextParams =
      new URLSearchParams();

    if (query) {
      nextParams.set("q", query);
    }

    setSearchParams(nextParams, {
      replace: true,
    });
  }

  function clearEverything() {
    setSearchParams(
      new URLSearchParams(),
      {
        replace: true,
      }
    );
  }

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 text-decoration-none"
            aria-label="Voltar para a Home"
          >
            <ArrowLeft
              size={20}
              aria-hidden="true"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <SearchInput
              value={query}
              onChange={
                handleQueryChange
              }
              onClear={() =>
                handleQueryChange("")
              }
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-left select-none">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 my-0">
              Resultados da busca
            </h1>

            <p className="mt-1 text-sm text-slate-600 my-0">
              {loading
                ? "Buscando lugares..."
                : `${results.length} resultado${
                    results.length === 1
                      ? ""
                      : "s"
                  } encontrado${
                    results.length === 1
                      ? ""
                      : "s"
                  }`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/mapa?${searchParams.toString()}`}
              className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:inline-flex text-decoration-none"
            >
              <Map
                size={17}
                aria-hidden="true"
              />

              Ver no mapa
            </Link>

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  true
                )
              }
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 lg:hidden border-none cursor-pointer"
            >
              <SlidersHorizontal
                size={17}
                aria-hidden="true"
              />

              Filtros
            </button>

            <SearchSort
              value={sort}
              onChange={(value) =>
                updateParams({
                  sort:
                    value ===
                    "relevance"
                      ? ""
                      : value,
                })
              }
            />
          </div>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <SearchFilters
                filters={filters}
                onChange={
                  handleFiltersChange
                }
                onClear={
                  clearFilters
                }
              />
            </div>
          </div>

          <div>
            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 text-left">
                {error}
              </div>
            )}

            {loading && (
              <SearchLoading />
            )}

            {!loading &&
              !error &&
              results.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map(
                    (item) => (
                      <SearchResultCard
                        key={item.id}
                        item={item}
                      />
                    )
                  )}
                </div>
              )}

            {!loading &&
              !error &&
              results.length === 0 && (
                <SearchEmpty
                  onClear={
                    clearEverything
                  }
                />
              )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Fechar filtros"
            className="absolute inset-0 bg-slate-950/55 border-none cursor-pointer"
            onClick={() =>
              setMobileFiltersOpen(
                false
              )
            }
          />

          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-slate-50 p-4 shadow-2xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300" />

            <SearchFilters
              filters={filters}
              onChange={
                handleFiltersChange
              }
              onClear={
                clearFilters
              }
            />

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  false
                )
              }
              className="mt-4 h-12 w-full rounded-xl bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800 border-none cursor-pointer"
            >
              Ver {results.length} resultados
            </button>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
