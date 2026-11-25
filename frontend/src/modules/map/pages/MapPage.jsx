import React, { useMemo, useState } from "react";
import {
  useSearchParams,
} from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import {
  useFavorites,
} from "../../favorites/hooks/useFavorites";

import MapCanvas from "../components/MapCanvas";
import MapEmpty from "../components/MapEmpty";
import MapFilters from "../components/MapFilters";
import MapHeader from "../components/MapHeader";
import MapLoading from "../components/MapLoading";
import MapResultsPanel from "../components/MapResultsPanel";
import MapSelectedPlace from "../components/MapSelectedPlace";

import {
  useMap,
} from "../hooks/useMap";

function parseBoolean(value) {
  return value === "true";
}

export default function MapPage() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [mobileView, setMobileView] =
    useState("map");

  const {
    favoriteIds,
  } = useFavorites();

  const query =
    searchParams.get("q") || "";

  const favoritesOnly =
    parseBoolean(
      searchParams.get("favoritos")
    );

  const filters = useMemo(
    () => ({
      category:
        searchParams.get(
          "categoria"
        ) || "",

      partner: parseBoolean(
        searchParams.get(
          "parceiro"
        )
      ),

      free: parseBoolean(
        searchParams.get(
          "gratuito"
        )
      ),

      accessible: parseBoolean(
        searchParams.get(
          "acessivel"
        )
      ),

      petFriendly: parseBoolean(
        searchParams.get(
          "petFriendly"
        )
      ),
    }),
    [searchParams]
  );

  const {
    items,
    loading,
    error,
  } = useMap({
    query,
    filters,
    favoriteIds,
    favoritesOnly,
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
          value === undefined ||
          value === null
        ) {
          nextParams.delete(key);
        } else {
          nextParams.set(
            key,
            String(value)
          );
        }
      }
    );

    setSearchParams(nextParams, {
      replace: true,
    });
  }

  function handleFiltersChange(
    nextFilters
  ) {
    updateParams({
      categoria:
        nextFilters.category,
      parceiro:
        nextFilters.partner,
      gratuito:
        nextFilters.free,
      acessivel:
        nextFilters.accessible,
      petFriendly:
        nextFilters.petFriendly,
    });
  }

  function clearFilters() {
    setSearchParams(
      new URLSearchParams(),
      {
        replace: true,
      }
    );

    setSelectedItem(null);
  }

  function selectItem(item) {
    setSelectedItem(item);

    if (
      window.innerWidth < 1024
    ) {
      setMobileView("map");
    }
  }

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-[1600px] space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <MapHeader
          query={query}
          onQueryChange={(value) =>
            updateParams({
              q: value,
            })
          }
          resultCount={items.length}
          mobileView={mobileView}
          onMobileViewChange={
            setMobileView
          }
        />

        <MapFilters
          filters={filters}
          favoritesOnly={
            favoritesOnly
          }
          onChange={
            handleFiltersChange
          }
          onFavoritesChange={(
            value
          ) =>
            updateParams({
              favoritos: value,
            })
          }
          onClear={clearFilters}
        />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 text-left select-none">
            {error}
          </div>
        )}

        {loading && (
          <MapLoading />
        )}

        {!loading &&
          !error &&
          items.length === 0 && (
            <MapEmpty
              onClear={
                clearFilters
              }
            />
          )}

        {!loading &&
          !error &&
          items.length > 0 && (
            <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
              <div
                className={
                  mobileView === "list"
                    ? "block animate-fade-in"
                    : "hidden lg:block animate-fade-in"
                }
              >
                <MapResultsPanel
                  items={items}
                  selectedItem={
                    selectedItem
                  }
                  onSelectItem={
                    selectItem
                  }
                />
              </div>

              <div
                className={[
                  "relative origin-center",
                  mobileView === "map"
                    ? "block animate-fade-in"
                    : "hidden lg:block animate-fade-in",
                ].join(" ")}
              >
                <MapCanvas
                  items={items}
                  selectedItem={
                    selectedItem
                  }
                  onSelectItem={
                    selectItem
                  }
                />

                <MapSelectedPlace
                  item={selectedItem}
                  onClose={() =>
                    setSelectedItem(
                      null
                    )
                  }
                />
              </div>
            </div>
          )}
      </div>
    </HomeLayout>
  );
}
