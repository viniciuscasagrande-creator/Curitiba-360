import {
  useEffect,
  useState,
} from "react";

import {
  getMapItems,
} from "../services/mapService";

export function useMap({
  query,
  filters,
  favoriteIds,
  favoritesOnly,
}) {
  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadItems() {
      setLoading(true);
      setError("");

      try {
        const response =
          await getMapItems({
            query,
            filters,
            favoriteIds,
            favoritesOnly,
          });

        if (active) {
          setItems(response);
        }
      } catch (requestError) {
        console.error(requestError);

        if (active) {
          setError(
            "Não foi possível carregar os locais do mapa."
          );

          setItems([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      active = false;
    };
  }, [
    query,
    filters.category,
    filters.partner,
    filters.free,
    filters.accessible,
    filters.petFriendly,
    favoritesOnly,
    favoriteIds,
  ]);

  return {
    items,
    loading,
    error,
  };
}
