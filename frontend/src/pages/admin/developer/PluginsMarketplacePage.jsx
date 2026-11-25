import { useState, useEffect } from 'react';
import { getPlugins } from '../../../services/developerPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Store, Layers } from 'lucide-react';

export default function PluginsMarketplacePage() {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getPlugins();
      setPlugins(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Marketplace de Plugins...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Marketplace de Plugins 🛍️
        </h1>
        <p className="mt-2 text-gray-500">Módulos de extensão para CRM, ERP, Chatbot, Fiscal, BI, Marketing e Automação.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {plugins.map(plug => (
          <Card key={plug.id} className="p-6 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="blue">{plug.category}</Badge>
                <span className="text-xs font-bold text-amber-500">{plug.rating}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-2">{plug.name}</h2>
              <p className="text-xs text-gray-500 mt-1">Autor: {plug.author} • {plug.version}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600">Status: {plug.status}</span>
              <button className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition">
                {plug.status === 'instalado' ? 'Configurar' : 'Instalar Plugin'}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
