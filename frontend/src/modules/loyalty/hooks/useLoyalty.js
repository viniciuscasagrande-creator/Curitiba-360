import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  LOYALTY_CHANGED_EVENT,
} from "../repositories/loyaltyRepository";

import {
  getLoyaltyAccount,
} from "../services/loyaltyService";

export function useLoyalty() {
  const [account, setAccount] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadAccount =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        setAccount(
          await getLoyaltyAccount()
        );
      } catch (requestError) {
        setError(
          requestError.message ||
            "Não foi possível carregar o Clube Curitiba 360."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  useEffect(() => {
    function handleChange(
      event
    ) {
      setAccount(
        event.detail
      );
    }

    window.addEventListener(
      LOYALTY_CHANGED_EVENT,
      handleChange
    );

    return () =>
      window.removeEventListener(
        LOYALTY_CHANGED_EVENT,
        handleChange
      );
  }, []);

  return {
    account,
    loading,
    error,
    reload: loadAccount,
  };
}
