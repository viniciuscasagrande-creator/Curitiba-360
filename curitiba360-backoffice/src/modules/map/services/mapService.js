import {
  CURITIBA_MAP_BOUNDS,
} from "../constants/mapConfig";

import {
  getMapItemsRepository,
} from "../repositories/mapRepository";

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function matchesQuery(item, query) {
  const normalizedQuery =
    normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableText =
    normalizeText(
      [
        item.title,
        item.subtitle,
        item.category,
        item.categoryLabel,
        item.neighborhood,
        item.city,
      ]
        .filter(Boolean)
        .join(" ")
    );

  return normalizedQuery
    .split(/\s+/)
    .filter(Boolean)
    .every((term) =>
      searchableText.includes(term)
    );
}

function matchesFilters(item, filters) {
  if (
    filters.category &&
    item.category !== filters.category
  ) {
    return false;
  }

  if (
    filters.partner &&
    item.partner !== true
  ) {
    return false;
  }

  if (
    filters.free &&
    item.free !== true
  ) {
    return false;
  }

  if (
    filters.accessible &&
    item.accessible !== true
  ) {
    return false;
  }

  if (
    filters.petFriendly &&
    item.petFriendly !== true
  ) {
    return false;
  }

  return true;
}

export function convertCoordinatesToPosition({
  latitude,
  longitude,
}) {
  const {
    north,
    south,
    west,
    east,
  } = CURITIBA_MAP_BOUNDS;

  const horizontalRange = east - west;
  const verticalRange = north - south;

  const x =
    ((longitude - west) /
      horizontalRange) *
    100;

  const y =
    ((north - latitude) /
      verticalRange) *
    100;

  return {
    x: Math.min(
      96,
      Math.max(4, x)
    ),
    y: Math.min(
      94,
      Math.max(6, y)
    ),
  };
}

export async function getMapItems({
  query = "",
  filters = {},
  favoriteIds = [],
  favoritesOnly = false,
}) {
  const items =
    await getMapItemsRepository();

  return items
    .filter((item) => {
      if (
        favoritesOnly &&
        !favoriteIds.includes(item.id)
      ) {
        return false;
      }

      return (
        matchesQuery(item, query) &&
        matchesFilters(item, filters)
      );
    })
    .map((item) => ({
      ...item,
      position:
        convertCoordinatesToPosition({
          latitude: item.latitude,
          longitude: item.longitude,
        }),
    }));
}
