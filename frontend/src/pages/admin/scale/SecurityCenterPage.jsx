import { useState, useEffect } from 'react';
import { getSecurityScore } from '../../../services/securityService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function SecurityCenterPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getSecurityScore();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Security Center...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Security Center & Arquitetura Zero Trust 🛡️
        </h1>
        <p className="mt-2 text-gray-500">MFA administrativo, LGPD por design, gestão de segredos e achados de segurança.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Security Score</span>
          <span className="text-4xl font-black text-emerald-400">{data?.score} / 100</span>
          <span className="text-xs font-semibold text-emerald-300 block mt-1">{data?.status}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">MFA Administrativo</span>
          <span className="text-3xl font-bold text-blue-600">{data?.mfaEnabledAdmins}</span>
          <span className="text-xs text-gray-500 block mt-1">Obrigatório para SUPER_ADMIN</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Conformidade LGPD</span>
          <span className="text-3xl font-bold text-emerald-600">{data?.lgpdCompliance}</span>
          <span className="text-xs text-gray-500 block mt-1">Privacidade por Design</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Achados e Verificações de Segurança</h2>
        <div className="divide-y divide-gray-100">
          {data?.findings?.map(f => (
            <div key={f.id} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <div>
                  <span className="font-bold text-gray-900 block">{f.title}</span>
                  <span className="text-xs text-gray-500">{f.detail}</span>
                </div>
              </div>
              <Badge variant="green">Conforme 🟢</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
