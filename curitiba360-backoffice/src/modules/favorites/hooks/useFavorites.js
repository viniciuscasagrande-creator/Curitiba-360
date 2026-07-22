import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  addFavorite,
  clearFavorites,
  getFavoriteIds,
  getFavoriteItems,
  removeFavorite,
  toggleFavorite,
} from "../services/favoritesService";

export function useFavorites({
  loadItems = false,
} = {}) {
  const [favoriteIds, setFavoriteIds] =
    useState([]);

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadFavorites =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const ids =
          await getFavoriteIds();

        setFavoriteIds(ids);

        if (loadItems) {
          const favoriteItems =
            await getFavoriteItems();

          setItems(favoriteItems);
        }
      } catch (requestError) {
        console.error(requestError);

        setError(
          "Não foi possível carregar os favoritos."
        );
      } finally {
        setLoading(false);
      }
    }, [loadItems]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    function handleFavoritesChanged(event) {
      const ids =
        event.detail || [];

      setFavoriteIds(ids);

      if (loadItems) {
        getFavoriteItems()
          .then(setItems)
          .catch(console.error);
      }
    }

    function handleStorage(event) {
      if (
        event.key ===
        "curitiba360:favorites"
      ) {
        loadFavorites();
      }
    }

    window.addEventListener(
      "curitiba360:favorites-changed",
      handleFavoritesChanged
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "curitiba360:favorites-changed",
        handleFavoritesChanged
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [
    loadFavorites,
    loadItems,
  ]);

  const favoriteSet = useMemo(
    () => new Set(favoriteIds),
    [favoriteIds]
  );

  const checkFavorite =
    useCallback(
      (itemId) =>
        favoriteSet.has(itemId),
      [favoriteSet]
    );

  const handleToggle =
    useCallback(async (itemId) => {
      const result =
        await toggleFavorite(itemId);

      setFavoriteIds(result.ids);

      if (loadItems) {
        setItems(
          await getFavoriteItems()
        );
      }

      return result.favorite;
    }, [loadItems]);

  const handleAdd =
    useCallback(async (itemId) => {
      const ids =
        await addFavorite(itemId);

      setFavoriteIds(ids);

      if (loadItems) {
        setItems(
          await getFavoriteItems()
        );
      }
    }, [loadItems]);

  const handleRemove =
    useCallback(async (itemId) => {
      const ids =
        await removeFavorite(itemId);

      setFavoriteIds(ids);

      if (loadItems) {
        setItems((currentItems) =>
          currentItems.filter(
            (item) =>
              item.id !== itemId
          )
        );
      }
    }, [loadItems]);

  const handleClear =
    useCallback(async () => {
      await clearFavorites();

      setFavoriteIds([]);
      setItems([]);
    }, []);

  return {
    favoriteIds,
    items,
    loading,
    error,
    count: favoriteIds.length,

    isFavorite: checkFavorite,
    toggleFavorite: handleToggle,
    addFavorite: handleAdd,
    removeFavorite: handleRemove,
    clearFavorites: handleClear,
    reload: loadFavorites,
  };
}
