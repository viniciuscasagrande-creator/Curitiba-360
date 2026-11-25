import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  PRODUCTS_CHANGED_EVENT,
} from "../repositories/productRepository";

import {
  listProducts,
} from "../services/productService";

export function useProducts(filters = {}) {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProducts =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const list = await listProducts(
          filters
        );

        setProducts(list);
      } catch (err) {
        setError(
          err.message ||
            "Erro ao carregar catálogo."
        );
      } finally {
        setLoading(false);
      }
    }, [
      filters.search,
      filters.type,
      filters.status,
      filters.category,
    ]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    window.addEventListener(
      PRODUCTS_CHANGED_EVENT,
      loadProducts
    );

    return () =>
      window.removeEventListener(
        PRODUCTS_CHANGED_EVENT,
        loadProducts
      );
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    reload: loadProducts,
  };
}
export default useProducts;
