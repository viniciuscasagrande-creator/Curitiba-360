import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getOrderById,
} from "../services/ordersService";

export function useOrderDetail(
  orderId
) {
  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadOrder =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        setOrder(
          await getOrderById(orderId)
        );
      } catch (requestError) {
        setError(
          requestError.message ||
            "Não foi possível carregar o pedido."
        );
      } finally {
        setLoading(false);
      }
    }, [orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  return {
    order,
    loading,
    error,
    reload: loadOrder,
  };
}
export default useOrderDetail;
