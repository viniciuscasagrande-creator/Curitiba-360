import { formatCurrency } from '../utils/formatCurrency';

const mockAIKnowledge = [
  {
    keywords: ['hoje', 'noite', 'hoje a noite', 'diferente', 'sair'],
    response: `Encontrei 3 excelentes opções para você aproveitar em Curitiba hoje à noite:\n\n🎭 **Teatro Guaira - Espetáculo de Dança** (19h30 - Centro) — ${formatCurrency(45)}\n🍽️ **Jantar no Restaurante Madalosso** (20h - Santa Felicidade) — ${formatCurrency(89)}\n🎵 **Show de Jazz na Ópera de Arame** (21h - Pedreira) — ${formatCurrency(60)}\n\n💡 *Você possui R$ 32,50 de cashback acumulado na sua carteira digital!*`
  },
  {
    keywords: ['roteiro', 'familia', '3 dias', 'dias'],
    response: `Aqui está um Roteiro Familiar Sugerido de 3 Dias em Curitiba:\n\n📍 **DIA 1: Centro Histórico & Cultura**\n- 09h: Passeio no Jardim Botânico\n- 12h: Almoço no Mercado Municipal\n- 14h: Visita ao Museu Oscar Niemeyer (MON)\n\n📍 **DIA 2: Parques & Gastronomia**\n- 10h: Parque Tanguá & Mirante\n- 13h: Almoço em Santa Felicidade\n- 16h: Tarde na Ópera de Arame\n\n📍 **DIA 3: Panorâmica & Compras**\n- 10h: Vista 360º na Torre Panorâmica\n- 12h: Feira da Ordem / Souvenirs\n\n⭐ *Todas essas atrações possuem desconto exclusivo com o seu Pass Curitiba 360!*`
  },
  {
    keywords: ['pouco', 'barato', 'gratis', 'economizar', 'pass'],
    response: `Para aproveitar economizando hoje, utilize as vantagens do seu **Pass Curitiba 360**:\n\n🏞️ **Jardim Botânico & Parque Tanguá** — Gratuito (Entrada Livre)\n🏛️ **Museu Oscar Niemeyer (MON)** — Incluso no seu Pass Explorer\n🍽️ **Almoço Parceiro** — 15% de Desconto + 5% de Cashback\n\n💰 *Custo Total Estimado: R$ 38,00 | Após Cashback: R$ 5,50!*`
  }
];

export async function askCuritibaAI(promptText, userContext = {}) {
  await new Promise(r => setTimeout(r, 600)); // Simulação de latência natural da IA

  const lower = String(promptText || '').toLowerCase();

  const matched = mockAIKnowledge.find(k =>
    k.keywords.some(kw => lower.includes(kw))
  );

  if (matched) {
    return {
      success: true,
      reply: matched.response,
      timestamp: new Date().toISOString()
    };
  }

  return {
    success: true,
    reply: `Entendi a sua dúvida! Com base nas preferências do seu perfil e na sua localização em Curitiba, recomendo explorar os eventos no **Jardim Botânico** ou aproveitar um café no **Centro Histórico**. Deseja que eu crie um roteiro personalizado com ingressos com desconto?`,
    timestamp: new Date().toISOString()
  };
}
