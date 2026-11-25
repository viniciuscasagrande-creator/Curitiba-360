import React, { useState, useEffect } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import ProtocolCard from "../components/ProtocolCard";
import { useProtocols } from "../hooks/useProtocols";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Plus, Send, ClipboardList, CheckCircle } from "lucide-react";

export default function ProtocolsPage() {
  const { protocols, loading, createProtocol } = useProtocols();
  const location = useLocation();

  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [serviceId, setServiceId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (location.state && location.state.serviceId) {
      setServiceId(location.state.serviceId);
      setSubject(location.state.serviceName || "");
      setCreating(true);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !description) return;

    const res = await createProtocol({
      serviceId: serviceId || "custom-srv",
      subject,
      description
    });

    if (res.success) {
      setSuccess(true);
      setSubject("");
      setDescription("");
      setCreating(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/services" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Serviços
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 m-0">Protocolos & Chamados</h2>
            <p className="text-[10px] text-slate-500 m-0">Acompanhe o andamento dos seus chamados de zeladoria municipal.</p>
          </div>
          {!creating && (
            <button
              onClick={() => setCreating(true)}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs border-none cursor-pointer flex items-center gap-1 text-[9px] font-bold transition"
            >
              <Plus size={12} /> Novo Chamado
            </button>
          )}
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-3xl text-center space-y-1.5 animate-fadeIn">
            <CheckCircle size={32} className="text-emerald-600 mx-auto" />
            <h3 className="text-xs font-bold my-0">Chamado Aberto!</h3>
            <p className="text-[10px] my-0">O protocolo foi gerado e enviado ao setor técnico municipal responsável.</p>
          </div>
        )}

        {creating ? (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3 animate-fadeIn">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Nova Solicitação</h3>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 block uppercase">Assunto / Título</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Lâmpada queimada na Rua XV"
                required
                className="w-full pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 block uppercase">Descrição Detalhada</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o problema com referências de localização..."
                rows={3}
                required
                className="w-full pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl border-none shadow-2xs transition cursor-pointer flex items-center justify-center gap-1"
              >
                <Send size={11} /> Enviar Protocolo
              </button>
              <button
                type="button"
                onClick={() => setCreating(false)}
                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded-xl border-none transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-6 text-slate-400">Consultando chamados...</div>
            ) : protocols.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <ClipboardList size={32} className="mx-auto text-slate-300" />
                <p className="text-xs">Nenhum protocolo aberto recentemente.</p>
              </div>
            ) : (
              protocols.map((p) => (
                <ProtocolCard key={p.id} protocol={p} />
              ))
            )}
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
