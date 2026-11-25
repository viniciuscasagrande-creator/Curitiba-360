import { detailMock } from "../mocks/detailMock";
import { searchMock } from "../../search/mocks/searchMock";

export async function findDetailBySlugRepository(slug) {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 300);
  });

  return (
    detailMock.find(
      (item) => item.slug === slug
    ) || null
  );
}

export async function findRelatedItemsRepository(item) {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 150);
  });

  return searchMock
    .filter(
      (candidate) =>
        candidate.id !== item.id &&
        (
          candidate.category ===
            item.category ||
          candidate.tags?.some((tag) =>
            item.tags?.includes(tag)
          )
        )
    )
    .slice(0, 6);
}
