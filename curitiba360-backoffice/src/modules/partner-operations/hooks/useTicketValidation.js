import {
  useCallback,
  useState,
} from "react";

import {
  validateTicket,
} from "../services/ticketValidationService";

export function useTicketValidation({
  productId,
  sessionId,
  operatorId,
  deviceId,
  gate,
}) {
  const [validation, setValidation] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const validate =
    useCallback(
      async (
        code,
        mode = "qr_code"
      ) => {
        setLoading(true);
        setError("");

        try {
          const result =
            await validateTicket({
              code,
              productId,
              sessionId,
              operatorId,
              deviceId,
              gate,
              mode,
            });

          setValidation(result);

          return result;
        } catch (requestError) {
          setError(
            requestError.message ||
              "Não foi possível validar o ingresso."
          );

          throw requestError;
        } finally {
          setLoading(false);
        }
      },
      [
        productId,
        sessionId,
        operatorId,
        deviceId,
        gate,
      ]
    );

  function clearValidation() {
    setValidation(null);
    setError("");
  }

  return {
    validation,
    loading,
    error,
    validate,
    clearValidation,
  };
}
export default useTicketValidation;
