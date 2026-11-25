import { useState, useEffect, useCallback } from "react";
import { partnersB2bService } from "../services/partnersB2bService";

export function usePartnersB2b() {
  const [kpis, setKpis] = useState(null);
  const [partners, setPartners] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await partnersB2bService.getDashboard();
    if (res.success && res.data) {
      setKpis(res.data.kpis);
      setPartners(res.data.partners || []);
      setContracts(res.data.contracts || []);
      setBookings(res.data.bookings || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const signContract = async (contractId) => {
    const res = await partnersB2bService.updateContract(contractId, "signed");
    if (res.success && res.data) {
      setContracts(res.data.contracts || []);
    }
  };

  const addBooking = async (booking) => {
    const res = await partnersB2bService.createBooking(booking);
    if (res.success && res.data) {
      setBookings(res.data.bookings || []);
    }
  };

  return {
    kpis,
    partners,
    contracts,
    bookings,
    loading,
    signContract,
    addBooking,
    reload: loadData
  };
}
