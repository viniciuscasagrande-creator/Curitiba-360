import { useState, useEffect, useCallback } from "react";
import { walletService } from "../services/walletService";

export function useSuperWallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWallet = useCallback(async () => {
    setLoading(true);
    const res = await walletService.getWallet();
    if (res.success) setWallet(res.data);
    setLoading(false);
  }, []);

  const addFunds = async (amount) => {
    const res = await walletService.addFunds(amount);
    if (res.success) setWallet(res.data);
    return res;
  };

  const payWithWallet = async (amount, description) => {
    const res = await walletService.payWithWallet(amount, description);
    if (res.success) setWallet(res.data);
    return res;
  };

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return { wallet, loading, addFunds, payWithWallet, reload: fetchWallet };
}
