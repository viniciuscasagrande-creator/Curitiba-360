import React, { useMemo } from "react";
import {
  ArrowRight,
  SearchX,
} from "lucide-react";
import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeSection from "../../home/components/HomeSection";
import HomeLayout from "../../home/layouts/HomeLayout";

import SearchLoading from "../../search/components/SearchLoading";
import SearchResultCard from "../../search/components/SearchResultCard";

import {
  useSearch,
} from "../../search/hooks/useSearch";

import CategoryHero from "../components/CategoryHero";
import CategoryQuickFilters from "../components/CategoryQuickFilters";
import CategoryStats from "../components/CategoryStats";

import {
  getCategoryConfig,
} from "../constants/categoryConfig";

const emptyFilters = {
  category: "",
  rating: "",
  maxDistance: "30",
  today: false,
  weekend: false,
  free: false,
  partner: false,
  petFriendly: false,
  accessible: false,
  featured: false,
};

export default function CategoryPage() {
  const { categorySlug } =
    useParams();

  const category =
    getCategoryConfig(
      categorySlug
    );

  const filters = useMemo(
    () => ({
      ...emptyFilters,
      category:
        category?.searchCategory ||
        "",
    }),
    [category]
  );

  const {
    results,
    loading,
    error,
  } = useSearch({
    query: "",
    filters,
    sort: "relevance",
    debounce: 0,
  });

  if (!category) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const partnerCount =
    results.filter(
      (item) => item.partner
    ).length;

  const averageRating =
    results.length > 0
      ? results.reduce(
          (total, item) =>
            total + item.rating,
          0
        ) / results.length
      : 0;

  const featuredResults =
    results
      .filter(
        (item) => item.featured
      )
      .slice(0, 6);

  const nearbyResults = [
    ...results,
  ]
    .sort(
      (first, second) =>
        first.distance -
        second.distance
    )
    .slice(0, 6);

  const bestRatedResults = [
    ...results,
  ]
    .sort(
      (first, second) =>
        second.rating -
        first.rating
    )
    .slice(0, 6);

  const categorySearchHref =
    `/buscar?categoria=${encodeURIComponent(
      category.searchCategory
    )}`;

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <CategoryHero
          category={category}
        />

        <CategoryQuickFilters
          category={category}
        />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 text-left">
            {error}
          </div>
        )}

        {loading && (
          <SearchLoading
            count={6}
          />
        )}

        {!loading &&
          !error &&
          results.length > 0 && (
            <>
              <CategoryStats
                total={results.length}
                partners={
                  partnerCount
                }
                averageRating={
                  averageRating
                }
              />

              <HomeSection
                title="Destaques"
                description={`Seleção especial de ${category.shortTitle.toLowerCase()} em Curitiba.`}
                href={categorySearchHref}
              >
                <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 scrollbar-none snap-x">
                  {(
                    featuredResults
                      .length
                      ? featuredResults
                      : results.slice(0, 6)
                  ).map((item) => (
                    <div
                      key={item.id}
                      className="min-w-[280px] max-w-[310px]"
                    >
                      <SearchResultCard
                        item={item}
                      />
                    </div>
                  ))}
                </div>
              </HomeSection>

              <HomeSection
                title="Mais próximos"
                description="Opções ordenadas pela menor distância."
                href={`${categorySearchHref}&sort=distance`}
              >
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {nearbyResults.map(
                    (item) => (
                      <SearchResultCard
                        key={item.id}
                        item={item}
                      />
                    )
                  )}
                </div>
              </HomeSection>

              <HomeSection
                title="Melhor avaliados"
                description="Lugares e experiências com as melhores avaliações."
                href={`${categorySearchHref}&sort=rating`}
              >
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {bestRatedResults.map(
                    (item) => (
                      <SearchResultCard
                        key={item.id}
                        item={item}
                      />
                    )
                  )}
                </div>
              </HomeSection>

              {category.popularSearches
                .length > 0 && (
                <HomeSection
                  title="Buscas populares"
                  description="Sugestões para continuar explorando."
                >
                  <div className="flex flex-wrap gap-3 select-none">
                    {category.popularSearches.map(
                      (term) => {
                        const params =
                          new URLSearchParams();

                        if (
                          category.searchCategory
                        ) {
                          params.set(
                            "categoria",
                            category.searchCategory
                          );
                        }

                        params.set(
                          "q",
                          term
                        );

                        return (
                          <Link
                            key={term}
                            to={`/buscar?${params.toString()}`}
                            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 text-decoration-none"
                          >
                            {term}

                            <ArrowRight
                              size={16}
                              aria-hidden="true"
                            />
                          </Link>
                        );
                      }
                    )}
                  </div>
                </HomeSection>
              )}
            </>
          )}

        {!loading &&
          !error &&
          results.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center select-none">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                <SearchX
                  size={30}
                  aria-hidden="true"
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-950 my-0">
                Nenhum item nesta categoria
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 my-0">
                Ainda não existem resultados cadastrados para esta categoria.
              </p>

              <Link
                to="/buscar"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 text-decoration-none"
              >
                Explorar todas as opções
              </Link>
            </div>
          )}
      </div>
    </HomeLayout>
  );
}
