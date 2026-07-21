import { useState, useEffect } from 'react';
import { getMarketplaceProducts } from '../../../services/businessPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Store, Tag } from 'lucide-react';

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getMarketplaceProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Marketplace B2B/B2C...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Marketplace B2B / B2C 🛍️
        </h1>
        <p className="mt-2 text-gray-500">Patrocínios, serviços, seguros, equipamentos e hospedagem corporativa.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {products.map(item => (
          <Card key={item.id} className="p-6 space-y-3 flex flex-col justify-between">
            <div>
              <Badge variant="blue">{item.category}</Badge>
              <h2 className="text-lg font-bold text-gray-900 mt-2">{item.title || item.name}</h2>
              <p className="text-xs text-gray-500 mt-1">Fornecedor: {item.vendor}</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-lg font-black text-emerald-600">{item.price}</span>
              <button className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition">
                Contratar
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
