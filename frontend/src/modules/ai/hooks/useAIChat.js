import { useCallback, useEffect, useState } from "react";
import { getAiRepository, addAiMessageRepository, AI_CHANGED_EVENT } from "../repositories/aiRepository";

export function useAIChat() {
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! Sou o assistente de inteligência artificial do Curitiba 360. Como posso ajudar com insights, previsões de faturamento ou análise de dados hoje?" }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await getAiRepository());
    } catch (e) {
      setError(e.message || "Erro ao obter repositório de IA.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    
    // Simulate thinking and answer
    setTimeout(() => {
      const responseMsg = {
        role: "assistant",
        content: `Compreendi a sua dúvida sobre: "${text}". Analisando os dados consolidados, o faturamento da plataforma está operando 18% acima da meta esperada, com taxa de conversão média estável em 3.8%. Há sugestão de ajuste dinâmico de preço para o produto 'Parque Tanguá Sunset' para otimizar receita.`
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 800);
  };

  return {
    kpis: data?.kpis || null,
    insights: data?.insights || [],
    forecasts: data?.forecasts || [],
    recommendations: data?.recommendations || null,
    anomalies: data?.anomalies || [],
    frauds: data?.frauds || [],
    messages,
    sendMessage,
    loading,
    error,
    reload: load
  };
}
export default useAIChat;
