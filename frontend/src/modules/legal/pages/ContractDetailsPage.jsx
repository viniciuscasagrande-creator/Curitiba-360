import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Eye, FileSignature } from "lucide-react";

export default function ContractDetailsPage() {
  const { contractId } = useParams();
  const { contracts, templates, signers, saveContract, loading } = useLegalDashboard();
  const navigate = useNavigate();

  const isNew = !contractId || contractId === "new";
  const existingContract = contracts.find(c => c.id === contractId);

  // States
  const [title, setTitle] = useState(existingContract ? existingContract.title : "");
  const [type, setType] = useState(existingContract ? existingContract.type : "prestação_serviço");
  const [value, setValue] = useState(existingContract ? existingContract.value : 10000);
  const [effectiveDate, setEffectiveDate] = useState(existingContract ? existingContract.effectiveDate : "");
  const [expirationDate, setExpirationDate] = useState(existingContract ? existingContract.expirationDate : "");
  const [renewalType, setRenewalType] = useState(existingContract ? existingContract.renewalType : "automatic");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    saveContract({
      id: isNew ? `con-${Date.now()}` : contractId,
      title,
      type,
      value: Number(value),
      effectiveDate,
      expirationDate,
      renewalType,
      currency: "BRL"
    });
    navigate("/admin/legal/contracts");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando informações do documento...
        </div>
      </AdminLayout>
    );
  }

  const relatedSigners = signers.filter(s => s.contractId === contractId);

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-2xl">
        <Link to="/admin/legal/contracts" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à lista
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">
            {isNew ? "Elaborar Novo Contrato" : `Editar Termo: ${title}`}
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre os termos jurídicos, configure o cronograma de vigência e as assinaturas certificadas do contrato.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Título do Contrato / Acordo</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Contrato de Fornecimento de Servidores Cloud"
              className="h-9 px-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Tipo de Documento</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="prestação_serviço">Prestação de Serviços</option>
                <option value="patrocínio">Patrocínio</option>
                <option value="parceria">Acordo de Parceria</option>
                <option value="NDA">NDA (Confidencialidade)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Valor Estimado (BRL)</label>
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Início da Vigência</label>
              <input
                type="date"
                required
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl bg-slate-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Fim da Vigência</label>
              <input
                type="date"
                required
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl bg-slate-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Regra de Renovação</label>
            <select value={renewalType} onChange={(e) => setRenewalType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
              <option value="automatic">Renovação Automática</option>
              <option value="manual">Exigir Revisão Manual</option>
            </select>
          </div>

          {/* Signers workflow */}
          {!isNew && relatedSigners.length > 0 && (
            <div className="border-t border-slate-50 pt-4 space-y-3">
              <strong className="text-slate-900 text-sm block flex items-center gap-1">
                <FileSignature size={16} className="text-purple-700" /> Fluxo de Assinaturas Associado
              </strong>
              
              <div className="divide-y divide-slate-100 font-mono text-[10px]">
                {relatedSigners.map(sig => (
                  <div key={sig.id} className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800">{sig.name} ({sig.role})</strong>
                      <span className="text-slate-400 block text-[9px]">{sig.email}</span>
                    </div>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${sig.status === "signed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}>
                      {sig.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
              Publicar Contrato / Enviar Fluxo
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
