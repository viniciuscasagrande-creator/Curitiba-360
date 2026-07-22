import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getCheckoutResult,
} from "../services/checkoutResultService";

export function useCheckoutResult(
  orderId
) {
  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadResult =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getCheckoutResult(
            orderId
          );

        setResult(response);
      } catch (requestError) {
        console.error(requestError);

        setError(
          requestError.message ||
            "Não foi possível carregar o resultado da compra."
        );
      } finally {
        setLoading(false);
      }
    }, [orderId]);

  useEffect(() => {
    loadResult();
  }, [loadResult]);

  return {
    result,
    loading,
    error,
    reload: loadResult,
  };
}
