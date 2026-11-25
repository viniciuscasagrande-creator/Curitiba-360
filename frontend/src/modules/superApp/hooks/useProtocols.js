import { useState, useEffect, useCallback } from "react";
import { protocolService } from "../services/protocolService";

export function useProtocols() {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProtocols = useCallback(async () => {
    setLoading(true);
    const res = await protocolService.getProtocols();
    if (res.success) setProtocols(res.data);
    setLoading(false);
  }, []);

  const createProtocol = async (protocolData) => {
    const res = await protocolService.createProtocol(protocolData);
    if (res.success) await fetchProtocols();
    return res;
  };

  useEffect(() => {
    fetchProtocols();
  }, [fetchProtocols]);

  return { protocols, loading, createProtocol, reload: fetchProtocols };
}
