import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ORDERS_CHANGED_EVENT,
} from "../repositories/ordersRepository";

import {
  getOrders,
} from "../services/ordersService";

export function useOrders(
  initialFilters = {}
) {
  const [orders, setOrders] =
    useState([]);

  const [filters, setFilters] =
    useState({
      search: "",
      status: "all",
      sort: "recent",
      ...initialFilters,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadOrders =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        setOrders(
          await getOrders(filters)
        );
      } catch (requestError) {
        console.error(requestError);

        setError(
          requestError.message ||
            "Não foi possível carregar os pedidos."
        );
      } finally {
        setLoading(false);
      }
    }, [filters]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    function handleOrdersChanged() {
      loadOrders();
    }

    window.addEventListener(
      ORDERS_CHANGED_EVENT,
      handleOrdersChanged
    );

    return () =>
      window.removeEventListener(
        ORDERS_CHANGED_EVENT,
        handleOrdersChanged
      );
  }, [loadOrders]);

  return {
    orders,
    filters,
    loading,
    error,

    setFilters,
    reload: loadOrders,
  };
}
