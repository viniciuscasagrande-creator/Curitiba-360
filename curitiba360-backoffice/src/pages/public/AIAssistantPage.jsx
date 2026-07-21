import AIChat from '../../components/ai/AIChat';
import BottomNavigation from '../../components/layout/BottomNavigation';
import { Sparkles } from 'lucide-react';

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pb-24 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Assistente Inteligente Curitiba 360 🤖</h1>
          <p className="text-xs text-slate-400">Recomendações e roteiros personalizados em tempo real para o seu dia.</p>
        </div>
      </div>

      <AIChat />

      <BottomNavigation />
    </div>
  );
}
