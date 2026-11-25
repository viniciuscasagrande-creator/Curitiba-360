import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  PRODUCTS_CHANGED_EVENT,
} from "../repositories/productRepository";

import {
  getProductById,
} from "../services/productService";

export function useProduct(id) {
  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProduct =
    useCallback(async () => {
      if (!id) return;
      setLoading(true);
      setError("");

      try {
        const prod = await getProductById(
          id
        );

        if (!prod) {
          setError(
            "Produto não encontrado."
          );
        } else {
          setProduct(prod);
        }
      } catch (err) {
        setError(
          err.message ||
            "Erro ao carregar o produto."
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    window.addEventListener(
      PRODUCTS_CHANGED_EVENT,
      loadProduct
    );

    return () =>
      window.removeEventListener(
        PRODUCTS_CHANGED_EVENT,
        loadProduct
      );
  }, [loadProduct]);

  return {
    product,
    loading,
    error,
    reload: loadProduct,
  };
}
export default useProduct;
