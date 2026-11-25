import { useState, useEffect } from 'react';
import { getExecutiveBoardAgents } from '../../../services/businessOperatingSystemService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Bot, UserCheck } from 'lucide-react';

export default function ExecutiveAiBoardPage() {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getExecutiveBoardAgents();
      setBoard(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Conselho Executivo de IA (Executive AI Board)...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Executive AI Board (Conselho C-Level) 👔
        </h1>
        <p className="mt-2 text-gray-500">Agentes de IA executivos especializados: CEO, CFO, COO, CTO, CMO, CRO, CHRO e CLO.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {board.map(member => (
          <Card key={member.role} className="p-6 space-y-3 flex flex-col justify-between border-l-4 border-l-purple-600">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="purple">{member.role}</Badge>
                <StatusBadge status={member.status} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-2">{member.name}</h2>
              <p className="text-xs text-gray-500 font-semibold mt-1">Foco: {member.focus}</p>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl text-xs font-semibold text-purple-900">
              💡 <strong>Recomendação C-Level:</strong> {member.keyRecommendation}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
