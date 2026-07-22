import { searchItemsRepository } from "../../search/repositories/searchRepository";

import {
  clearFavoritesRepository,
  getFavoriteIdsRepository,
  saveFavoriteIdsRepository,
} from "../repositories/favoritesRepository";

export async function getFavoriteIds() {
  return getFavoriteIdsRepository();
}

export async function getFavoriteItems() {
  const [favoriteIds, items] = await Promise.all([
    getFavoriteIdsRepository(),
    searchItemsRepository(),
  ]);

  const favoriteOrder = new Map(
    favoriteIds.map((id, index) => [
      id,
      index,
    ])
  );

  return items
    .filter((item) =>
      favoriteOrder.has(item.id)
    )
    .sort(
      (first, second) =>
        favoriteOrder.get(first.id) -
        favoriteOrder.get(second.id)
    );
}

export async function isFavorite(itemId) {
  const ids =
    await getFavoriteIdsRepository();

  return ids.includes(itemId);
}

export async function addFavorite(itemId) {
  const ids =
    await getFavoriteIdsRepository();

  if (ids.includes(itemId)) {
    return ids;
  }

  return saveFavoriteIdsRepository([
    itemId,
    ...ids,
  ]);
}

export async function removeFavorite(itemId) {
  const ids =
    await getFavoriteIdsRepository();

  return saveFavoriteIdsRepository(
    ids.filter((id) => id !== itemId)
  );
}

export async function toggleFavorite(itemId) {
  const ids =
    await getFavoriteIdsRepository();

  const favorite =
    ids.includes(itemId);

  const nextIds = favorite
    ? ids.filter((id) => id !== itemId)
    : [itemId, ...ids];

  await saveFavoriteIdsRepository(nextIds);

  return {
    favorite: !favorite,
    ids: nextIds,
  };
}

export async function clearFavorites() {
  return clearFavoritesRepository();
}
