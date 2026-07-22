import { searchMock } from "../mocks/searchMock";

export async function searchItemsRepository() {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 250);
  });

  return searchMock;
}
