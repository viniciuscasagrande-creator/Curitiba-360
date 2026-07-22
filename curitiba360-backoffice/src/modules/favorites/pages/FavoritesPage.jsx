import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import SearchResultCard from "../../search/components/SearchResultCard";

import FavoritesEmpty from "../components/FavoritesEmpty";
import FavoritesLoading from "../components/FavoritesLoading";
import FavoritesToolbar from "../components/FavoritesToolbar";

import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesPage() {
  const [sort, setSort] =
    useState("saved");

  const {
    items,
    loading,
    error,
    count,
    clearFavorites,
    reload,
  } = useFavorites({
    loadItems: true,
  });

  const sortedItems = useMemo(() => {
    const nextItems = [...items];

    switch (sort) {
      case "rating":
        return nextItems.sort(
          (first, second) =>
            second.rating -
            first.rating
        );

      case "distance":
        return nextItems.sort(
          (first, second) =>
            first.distance -
            second.distance
        );

      case "title":
        return nextItems.sort(
          (first, second) =>
            first.title.localeCompare(
              second.title,
              "pt-BR"
            )
        );

      case "saved":
      default:
        return nextItems;
    }
  }, [
    items,
    sort,
  ]);

  async function handleClear() {
    const confirmed =
      window.confirm(
        "Deseja remover todos os favoritos?"
      );

    if (!confirmed) {
      return;
    }

    await clearFavorites();
  }

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-7xl space-y-7 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 select-none">
        <div className="flex items-start gap-4 text-left">
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

          <div>
            <div className="flex items-center gap-2 text-emerald-700">
              <Heart
                size={18}
                className="fill-current animate-pulse"
                aria-hidden="true"
              />

              <span className="text-sm font-semibold uppercase tracking-[0.14em]">
                Sua seleção
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl my-0">
              Favoritos
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 my-0">
              Reúna os lugares e experiências que deseja visitar em Curitiba.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-left">
            <p className="text-sm font-medium text-red-700 my-0">
              {error}
            </p>

            <button
              type="button"
              onClick={reload}
              className="mt-3 text-sm font-semibold text-red-700 underline bg-transparent border-none cursor-pointer p-0"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {loading && (
          <FavoritesLoading />
        )}

        {!loading &&
          !error &&
          count === 0 && (
            <FavoritesEmpty />
          )}

        {!loading &&
          !error &&
          count > 0 && (
            <>
              <FavoritesToolbar
                count={count}
                sort={sort}
                onSortChange={setSort}
                onClear={handleClear}
              />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sortedItems.map(
                  (item) => (
                    <SearchResultCard
                      key={item.id}
                      item={item}
                    />
                  )
                )}
              </div>
            </>
          )}
      </div>
    </HomeLayout>
  );
}
