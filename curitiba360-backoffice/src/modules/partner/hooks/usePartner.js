import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  PARTNER_CHANGED_EVENT,
} from "../repositories/partnerRepository";

import {
  getCurrentPartner,
} from "../services/partnerService";

export function usePartner() {
  const [partner, setPartner] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadPartner =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        setPartner(
          await getCurrentPartner()
        );
      } catch (requestError) {
        setError(
          requestError.message ||
            "Não foi possível carregar os dados do parceiro."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadPartner();
  }, [loadPartner]);

  useEffect(() => {
    function handlePartnerChanged(
      event
    ) {
      setPartner(event.detail);
    }

    window.addEventListener(
      PARTNER_CHANGED_EVENT,
      handlePartnerChanged
    );

    return () =>
      window.removeEventListener(
        PARTNER_CHANGED_EVENT,
        handlePartnerChanged
      );
  }, []);

  return {
    partner,
    loading,
    error,
    reload: loadPartner,
  };
}
export default usePartner;
