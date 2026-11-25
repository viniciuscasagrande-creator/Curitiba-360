import { useState, useEffect, useCallback } from "react";
import {
  getSecurityState,
  updatePassword as updatePasswordService,
  toggleTwoFactor as toggleTwoFactorService,
  terminateSession as terminateSessionService,
  terminateAllSessions as terminateAllSessionsService,
} from "../services/securityService";

export function useSecurity() {
  const [securityState, setSecurityState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadState = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getSecurityState();
      setSecurityState(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar as informações de segurança.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadState();
  }, [loadState]);

  const changePassword = async (passwordData) => {
    setSaving(true);
    setError("");
    setSuccessMessage("");
    try {
      const updated = await updatePasswordService();
      setSecurityState(updated);
      setSuccessMessage("Senha atualizada com sucesso!");
      return updated;
    } catch (err) {
      console.error(err);
      setError(err?.message || "Erro ao atualizar a senha.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    setSaving(true);
    setError("");
    setSuccessMessage("");
    try {
      const updated = await toggleTwoFactorService();
      setSecurityState(updated);
      setSuccessMessage(updated.twoFactor ? "Autenticação em duas etapas ativada!" : "Autenticação em duas etapas desativada.");
      return updated;
    } catch (err) {
      console.error(err);
      setError("Erro ao alterar autenticação em duas etapas.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleTerminateSession = async (sessionId) => {
    setError("");
    setSuccessMessage("");
    try {
      const updated = await terminateSessionService(sessionId);
      setSecurityState(updated);
      setSuccessMessage("Sessão encerrada com sucesso.");
      return updated;
    } catch (err) {
      console.error(err);
      setError("Erro ao encerrar a sessão.");
      throw err;
    }
  };

  const handleTerminateAllSessions = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const updated = await terminateAllSessionsService();
      setSecurityState(updated);
      setSuccessMessage("Todas as outras sessões foram encerradas.");
      return updated;
    } catch (err) {
      console.error(err);
      setError("Erro ao encerrar outras sessões.");
      throw err;
    }
  };

  return {
    securityState,
    loading,
    saving,
    error,
    successMessage,
    changePassword,
    toggleTwoFactor: handleToggleTwoFactor,
    terminateSession: handleTerminateSession,
    terminateAllSessions: handleTerminateAllSessions,
    reload: loadState,
    setError,
    setSuccessMessage,
  };
}
