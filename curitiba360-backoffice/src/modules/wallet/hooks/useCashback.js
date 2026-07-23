import { useState, useEffect } from 'react';
import { CashbackService } from '../services/CashbackService';

export function useCashback() {
  const [cashback, setCashback] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const bal = await CashbackService.getCashbackBalance();
        const hist = await CashbackService.getCashbackHistory();
        setCashback(bal);
        setHistory(hist);
      } catch (e) {
        console.error('Erro ao carregar cashback:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { cashback, history, loading };
}
