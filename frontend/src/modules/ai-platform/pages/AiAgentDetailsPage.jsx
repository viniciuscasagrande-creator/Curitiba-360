import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Shield, HelpCircle } from "lucide-react";

export default function AiAgentDetailsPage() {
  const { agentId } = useParams();
  const { agents, models, prompts, knowledgeBases, saveAgent, loading } = useAiDashboard();
  const navigate = useNavigate();

  const isNew = !agentId || agentId === "new";
  const existingAgent = agents.find(a => a.id === agentId);

  // States
  const [name, setName] = useState(existingAgent ? existingAgent.name : "");
  const [type, setType] = useState(existingAgent ? existingAgent.type : "tourism");
  const [description, setDescription] = useState(existingAgent ? existingAgent.description : "");
  const [model, setModel] = useState(existingAgent ? existingAgent.model : "Google Gemini 1.5 Pro");
  const [temperature, setTemperature] = useState(existingAgent ? existingAgent.temperature : 0.7);
  const [maxTokens, setMaxTokens] = useState(existingAgent ? existingAgent.maxTokens : 2048);
  const [humanApproval, setHumanApproval] = useState(existingAgent ? existingAgent.humanApproval : false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveAgent({
      id: isNew ? `agent-${Date.now()}` : agentId,
      name,
      type,
      description,
      model,
      temperature: Number(temperature),
      maxTokens: Number(maxTokens),
      humanApproval,
      allowedTools: existingAgent?.allowedTools || ["buscar_atrativos"]
    });
    navigate("/admin/ai/agents");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando detalhes do agente...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-2xl">
        <Link to="/admin/ai/agents" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à lista
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">
            {isNew ? "Criar Novo Agente de IA" : `Configurações: ${name}`}
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ajuste permissões do agente, conecte com bases vetoriais de RAG e defina a temperatura de geração.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Nome do Agente</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Assistente Hoteleiro Curitiba"
              className="h-9 px-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Descrição do Escopo</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Responsável por tirar dúvidas de tarifas e check-in"
              className="h-9 px-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Tipo de Agente</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="tourism">Turismo & Roteiros</option>
                <option value="support">Suporte & FAQ</option>
                <option value="bi">BI & Analytics</option>
                <option value="marketing">Marketing & Growth</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Modelo Roteado Principal</label>
              <select value={model} onChange={(e) => setModel(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro</option>
                <option value="Google Gemini 1.5 Flash">Google Gemini 1.5 Flash</option>
                <option value="OpenAI GPT-4o">OpenAI GPT-4o</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Temperatura ({temperature})</label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 rounded-lg cursor-pointer accent-purple-700 bg-slate-100"
              />
              <span className="text-[10px] text-slate-450 block">Menor = mais determinístico. Maior = mais criativo.</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Max Tokens de Saída</label>
              <input
                type="number"
                required
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Human approval toggle */}
          <div className="flex items-center justify-between border-t border-slate-50 pt-4">
            <div>
              <strong className="text-slate-900 text-sm block flex items-center gap-1">
                <Shield size={16} className="text-purple-700" /> Exigir Aprovação Humana (Human-in-the-Loop)
              </strong>
              <span className="text-[10px] text-slate-455 block">Ações sensíveis como reembolsos e exclusão de cadastros exigirão crivo manual.</span>
            </div>
            <input
              type="checkbox"
              checked={humanApproval}
              onChange={(e) => setHumanApproval(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
              Salvar Configuração do Agente
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
