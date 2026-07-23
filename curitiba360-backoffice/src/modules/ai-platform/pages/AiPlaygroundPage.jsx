import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Send, RefreshCw } from "lucide-react";

export default function AiPlaygroundPage() {
  const { models, loading } = useAiDashboard();
  const [selectedModel, setSelectedModel] = useState("Google Gemini 1.5 Pro");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [generating, setGenerating] = useState(false);
  const [latency, setLatency] = useState(null);
  const [cost, setCost] = useState(null);

  const handleTest = (e) => {
    e.preventDefault();
    if (!prompt) return;
    setGenerating(true);
    setResponse("");
    
    // Simulate generation latency
    setTimeout(() => {
      setResponse(
        `Olá! Eu sou o assistente do Curitiba 360 rodando com o modelo ${selectedModel}.\n\nPara a sua solicitação ("${prompt}"), recomendo visitar o Jardim Botânico no início da manhã para evitar aglomerações e depois seguir para a Ópera de Arame. O custo estimado de deslocamento de ônibus da linha turismo é de R$ 50,00.`
      );
      setLatency(1420);
      setCost(0.0012);
      setGenerating(false);
    }, 1200);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando playground...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/ai" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">AI Playground</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Experimente instruções, verifique o comportamento do modelo em tempo real e teste conexões RAG com base em fontes de arquivos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Controls form */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0">Painel de Parâmetros</h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-707">Escolher Modelo</label>
              <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50 w-full">
                <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro</option>
                <option value="Google Gemini 1.5 Flash">Google Gemini 1.5 Flash</option>
                <option value="OpenAI GPT-4o">OpenAI GPT-4o</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-707">Temperatura</label>
              <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full accent-purple-700 cursor-pointer bg-slate-100 h-1.5 rounded-lg" />
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <strong className="text-slate-700 block">Indicadores do Teste:</strong>
              {latency && <div className="text-[10px] text-slate-500 font-mono">Latência: {latency} ms</div>}
              {cost && <div className="text-[10px] text-slate-500 font-mono">Custo Estimado: R$ {cost.toFixed(4)}</div>}
              {!latency && <span className="text-[10px] text-slate-400 font-italic">Nenhum teste executado.</span>}
            </div>
          </div>

          {/* Prompt/Response Workspace */}
          <div className="md:col-span-2 space-y-4">
            <form onSubmit={handleTest} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 my-0">Prompt Sandbox</h3>
              
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Sua Mensagem / Pergunta</label>
                <textarea
                  rows={4}
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Planeje um roteiro de 1 dia em Curitiba com orçamento baixo..."
                  className="p-3 border border-slate-200 rounded-xl w-full"
                />
              </div>

              <button
                type="submit"
                disabled={generating}
                className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1.5 disabled:opacity-50"
              >
                {generating ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                Enviar Prompt
              </button>
            </form>

            {response && (
              <section className="bg-slate-900 text-slate-100 rounded-3xl p-6 shadow-sm space-y-2 font-mono">
                <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider block">Resposta do Modelo:</span>
                <p className="text-xs leading-relaxed whitespace-pre-wrap">{response}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
