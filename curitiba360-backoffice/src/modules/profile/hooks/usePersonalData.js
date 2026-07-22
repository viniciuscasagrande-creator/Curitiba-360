import { useState, useEffect, useCallback } from "react";
import { getPersonalData, savePersonalData, lookupAddress } from "../services/personalDataService";

export function usePersonalData() {
  const [personalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const data = await getPersonalData();
      setPersonalData(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar as informações pessoais.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateData = async (formData) => {
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const updated = await savePersonalData(formData);
      setPersonalData(updated);
      setSuccess(true);
      return updated;
    } catch (err) {
      console.error(err);
      setError(err?.message || "Erro ao salvar dados pessoais.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const getAddressByCep = async (cep) => {
    try {
      const address = await lookupAddress(cep);
      return address;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    personalData,
    loading,
    saving,
    error,
    success,
    updateData,
    getAddressByCep,
    reload: loadData,
    setError,
    setSuccess,
  };
}
