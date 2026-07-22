const FAVORITES_KEY = "curitiba360:favorites";

function parseFavorites(value) {
  try {
    const favorites = JSON.parse(value || "[]");

    return Array.isArray(favorites)
      ? favorites.filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

export async function getFavoriteIdsRepository() {
  return parseFavorites(
    localStorage.getItem(FAVORITES_KEY)
  );
}

export async function saveFavoriteIdsRepository(ids) {
  const uniqueIds = [...new Set(ids)];

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(uniqueIds)
  );

  window.dispatchEvent(
    new CustomEvent("curitiba360:favorites-changed", {
      detail: uniqueIds,
    })
  );

  return uniqueIds;
}

export async function clearFavoritesRepository() {
  localStorage.removeItem(FAVORITES_KEY);

  window.dispatchEvent(
    new CustomEvent("curitiba360:favorites-changed", {
      detail: [],
    })
  );

  return [];
}
