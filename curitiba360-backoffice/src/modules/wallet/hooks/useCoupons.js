import { useState, useEffect } from 'react';
import { WalletService } from '../services/WalletService';

export function useCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await WalletService.getCoupons();
        setCoupons(data);
      } catch (e) {
        console.error('Erro ao carregar cupons:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { coupons, loading };
}
