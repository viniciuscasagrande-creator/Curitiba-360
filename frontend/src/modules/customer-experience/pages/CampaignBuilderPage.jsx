import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Sparkles } from "lucide-react";

export default function CampaignBuilderPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [testSent, setTestSent] = useState(false);

  const handleSendTest = (e) => {
    e.preventDefault();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience/campaigns" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar às Campanhas
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Criador de Templates & Campanhas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Escreva e configure réguas de relacionamento com editores de templates dinâmicos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <form onSubmit={handleSendTest} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 md:col-span-2">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Sparkles size={14} className="text-purple-755" /> Novo Layout de Mensagem
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Assunto do E-mail ou WhatsApp Principal</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Seu Guia de Final de Semana em Curitiba!"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Conteúdo da Mensagem (Rich Text/Markdown)</label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Olá {{name}}, preparamos recomendações incríveis para sua visita..."
                rows={6}
                className="p-3 border border-slate-200 rounded-xl font-mono text-[10px]"
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1.5">
                <Send size={12} /> Disparar Teste
              </button>
              {testSent && <span className="text-emerald-700 font-bold block pt-1.5">Mensagem de teste enviada!</span>}
            </div>
          </form>

          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit font-mono text-[10px]">
            <h4 className="text-xs font-bold text-slate-900 my-0 font-sans">Variáveis Habilitadas</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-505">
              <li><code>{"{{name}}"}</code>: Nome do visitante</li>
              <li><code>{"{{loyaltyPoints}}"}</code>: Saldo de pontos</li>
              <li><code>{"{{couponCode}}"}</code>: Cupom de desconto</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
