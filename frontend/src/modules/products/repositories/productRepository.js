import { initialProductsMock } from "../mocks/productMock";

export const PRODUCTS_STORAGE_KEY =
  "curitiba360:products";

export const PRODUCTS_CHANGED_EVENT =
  "curitiba360:products-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitProductsChanged() {
  window.dispatchEvent(
    new CustomEvent(PRODUCTS_CHANGED_EVENT)
  );
}

export async function getProductsRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 150)
  );

  try {
    const stored = localStorage.getItem(
      PRODUCTS_STORAGE_KEY
    );

    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(
      PRODUCTS_STORAGE_KEY
    );
  }

  localStorage.setItem(
    PRODUCTS_STORAGE_KEY,
    JSON.stringify(initialProductsMock)
  );

  return clone(initialProductsMock);
}

export async function saveProductRepository(
  product
) {
  const products =
    await getProductsRepository();

  const index = products.findIndex(
    (p) => p.id === product.id
  );

  const updatedProduct = {
    ...product,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    products[index] = updatedProduct;
  } else {
    products.push(updatedProduct);
  }

  localStorage.setItem(
    PRODUCTS_STORAGE_KEY,
    JSON.stringify(products)
  );

  emitProductsChanged();

  return clone(updatedProduct);
}

export async function deleteProductRepository(
  id
) {
  const products =
    await getProductsRepository();

  const filtered = products.filter(
    (p) => p.id !== id
  );

  localStorage.setItem(
    PRODUCTS_STORAGE_KEY,
    JSON.stringify(filtered)
  );

  emitProductsChanged();

  return true;
}
