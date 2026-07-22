import {
  searchItemsRepository,
} from "../repositories/searchRepository";

export function normalizeSearchText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function createSearchableText(item) {
  return normalizeSearchText(
    [
      item.title,
      item.subtitle,
      item.description,
      item.category,
      item.categoryLabel,
      item.neighborhood,
      item.city,
      item.address,
      ...(item.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function filterByQuery(items, query) {
  const normalizedQuery =
    normalizeSearchText(query);

  if (!normalizedQuery) {
    return items;
  }

  const queryTerms = normalizedQuery
    .split(/\s+/)
    .filter(Boolean);

  return items.filter((item) => {
    const searchableText =
      createSearchableText(item);

    return queryTerms.every((term) =>
      searchableText.includes(term)
    );
  });
}

function filterByOptions(items, filters) {
  return items.filter((item) => {
    if (
      filters.category &&
      item.category !== filters.category
    ) {
      return false;
    }

    if (
      filters.rating &&
      item.rating < Number(filters.rating)
    ) {
      return false;
    }

    if (
      filters.maxDistance &&
      item.distance >
        Number(filters.maxDistance)
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
      filters.partner &&
      item.partner !== true
    ) {
      return false;
    }

    if (
      filters.petFriendly &&
      item.petFriendly !== true
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
      filters.today &&
      item.availableToday !== true
    ) {
      return false;
    }

    if (
      filters.weekend &&
      item.availableWeekend !== true
    ) {
      return false;
    }

    if (
      filters.featured &&
      item.featured !== true
    ) {
      return false;
    }

    return true;
  });
}

function sortResults(items, sort) {
  const sortedItems = [...items];

  switch (sort) {
    case "rating":
      return sortedItems.sort(
        (first, second) =>
          second.rating - first.rating
      );

    case "distance":
      return sortedItems.sort(
        (first, second) =>
          first.distance - second.distance
      );

    case "popular":
      return sortedItems.sort(
        (first, second) =>
          second.visits - first.visits
      );

    case "newest":
      return sortedItems.sort(
        (first, second) =>
          new Date(second.createdAt) -
          new Date(first.createdAt)
      );

    case "relevance":
    default:
      return sortedItems.sort(
        (first, second) => {
          if (
            first.featured !==
            second.featured
          ) {
            return first.featured
              ? -1
              : 1;
          }

          return (
            second.rating -
            first.rating
          );
        }
      );
  }
}

export async function searchItems({
  query = "",
  filters = {},
  sort = "relevance",
}) {
  const items =
    await searchItemsRepository();

  const queryResults = filterByQuery(
    items,
    query
  );

  const filteredResults =
    filterByOptions(
      queryResults,
      filters
    );

  return sortResults(
    filteredResults,
    sort
  );
}
