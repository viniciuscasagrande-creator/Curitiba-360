import { useState, useEffect, useCallback } from 'react';
import { WalletService } from '../services/WalletService';

export function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const w = await WalletService.getWallet();
      const txs = await WalletService.getTransactions();
      const crds = await WalletService.getCards();

      setWallet(w);
      setTransactions(txs);
      setCards(crds);
    } catch (err) {
      console.error('Erro ao carregar carteira:', err);
      setError(err.message || 'Erro ao carregar dados da carteira.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const addBalancePix = async (amount) => {
    return WalletService.createPixRecharge(amount);
  };

  const confirmPixRecharge = async (amount) => {
    const res = await WalletService.confirmPixRecharge(amount);
    await fetchWallet();
    return res;
  };

  const saveCard = async (cardData) => {
    const card = await WalletService.saveCard(cardData);
    await fetchWallet();
    return card;
  };

  return {
    wallet,
    transactions,
    cards,
    loading,
    error,
    addBalancePix,
    confirmPixRecharge,
    saveCard,
    refetch: fetchWallet
  };
}
