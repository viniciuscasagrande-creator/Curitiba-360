import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function CompliancePrivacyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Compliance & Privacidade LGPD 🛡️
        </h1>
        <p className="mt-2 text-gray-500">Privacy by Design, matriz de controles de dados e evidências de auditoria.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Conformidade LGPD</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">100% Conforme</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Retenção de Dados</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">Política Ativa</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Direitos dos Titulares</span>
          <span className="text-3xl font-black text-purple-600 mt-1 block">Atendido 24h</span>
        </Card>
      </div>
    </div>
  );
}
