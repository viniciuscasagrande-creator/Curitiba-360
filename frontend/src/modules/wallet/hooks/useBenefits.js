import { useState, useEffect } from 'react';
import { WalletService } from '../services/WalletService';

export function useBenefits() {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await WalletService.getBenefits();
        setBenefits(data);
      } catch (e) {
        console.error('Erro ao carregar benefícios:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { benefits, loading };
}
