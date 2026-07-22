import { detailMock } from "../../details/mocks/detailMock";
import { searchMock } from "../../search/mocks/searchMock";

function detailToMapItem(item) {
  return {
    id: item.id,
    slug: item.slug,
    type: item.type,
    title: item.title,
    subtitle: item.subtitle,
    image: item.images?.[0] || "",
    category: item.category,
    categoryLabel: item.categoryLabel,
    rating: item.rating,
    reviews: item.reviewsCount,
    distance: item.distance,
    featured: item.featured,
    partner: Boolean(item.partner),
    free: item.free,
    accessible: item.accessible,
    petFriendly: item.petFriendly,
    latitude: item.location?.latitude,
    longitude: item.location?.longitude,
    neighborhood: item.address?.neighborhood,
    city: item.address?.city,
    href:
      item.type === "event"
        ? `/evento/${item.slug}`
        : item.type === "experience"
          ? `/experiencia/${item.slug}`
          : `/local/${item.slug}`,
  };
}

function searchToMapItem(item) {
  return {
    ...item,
    latitude: item.latitude,
    longitude: item.longitude,
  };
}

export async function getMapItemsRepository() {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 250);
  });

  const detailItems = detailMock
    .filter(
      (item) =>
        item.location?.latitude &&
        item.location?.longitude
    )
    .map(detailToMapItem);

  const detailIds = new Set(
    detailItems.map((item) => item.id)
  );

  const searchItems = searchMock
    .filter(
      (item) =>
        !detailIds.has(item.id) &&
        item.latitude &&
        item.longitude
    )
    .map(searchToMapItem);

  return [
    ...detailItems,
    ...searchItems,
  ];
}
