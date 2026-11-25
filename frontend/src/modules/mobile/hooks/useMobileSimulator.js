import { useState, useEffect, useCallback } from "react";
import {
  getMobileDevicesRepository,
  getMobileTicketsRepository,
  registerMobileDeviceRepository,
  revokeMobileDeviceRepository,
  checkInOfflineTicketRepository,
  MOBILE_CHANGED_EVENT
} from "../repositories/mobileRepository";

export function useMobileSimulator() {
  const [devices, setDevices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const devList = await getMobileDevicesRepository();
      const tktList = await getMobileTicketsRepository();
      setDevices(devList);
      setTickets(tktList);
    } catch (e) {
      setError("Erro ao carregar dados do simulador mobile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function handleChange() {
      load();
    }
    window.addEventListener(MOBILE_CHANGED_EVENT, handleChange);
    return () => window.removeEventListener(MOBILE_CHANGED_EVENT, handleChange);
  }, [load]);

  const registerDevice = async (name, platform, appVersion) => {
    const dev = await registerMobileDeviceRepository({ name, platform, appVersion });
    await load();
    return dev;
  };

  const revokeDevice = async (deviceId) => {
    await revokeMobileDeviceRepository(deviceId);
    await load();
  };

  const checkInOffline = async (ticketCode, overrideReason = "") => {
    try {
      const tkt = await checkInOfflineTicketRepository(ticketCode, overrideReason);
      await load();
      return { success: true, ticket: tkt };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    devices,
    tickets,
    loading,
    error,
    registerDevice,
    revokeDevice,
    checkInOffline,
    reload: load
  };
}
export default useMobileSimulator;
