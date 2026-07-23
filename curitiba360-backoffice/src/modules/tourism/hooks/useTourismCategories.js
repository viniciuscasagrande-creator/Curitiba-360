import { useState, useEffect } from 'react';
import { tourismService } from '../services/tourismService';

export function useTourismCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await tourismService.getCategories();
        setCategories(data);
      } catch (e) {
        console.error('Erro ao carregar categorias:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { categories, loading };
}
