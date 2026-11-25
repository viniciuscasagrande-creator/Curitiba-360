import React, { useState } from 'react';
import { Building2, Edit3, ShieldCheck, CreditCard, X, CheckCircle2 } from 'lucide-react';

export default function AgencyBankCard({ banco = {}, onUpdateBank }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bancoNome: banco.bancoNome || 'Banco do Brasil S.A. (001)',
    agencia: banco.agencia || '',
    contaCorrente: banco.contaCorrente || '',
    tipoConta: banco.tipoConta || 'PJ - Corrente',
    tipoChavePix: banco.tipoChavePix || 'CNPJ',
    chavePix: banco.chavePix || '',
    titular: banco.titular || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBank(formData);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Dados Bancários & Chave PIX para Liquidação</h3>
            <p className="text-[11px] text-slate-500 font-medium">Conta cadastrada para repasses de vendas B2B (Diagrama BO-07).</p>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({
              bancoNome: banco.bancoNome || 'Banco do Brasil S.A. (001)',
              agencia: banco.agencia || '',
              contaCorrente: banco.contaCorrente || '',
              tipoConta: banco.tipoConta || 'PJ - Corrente',
              tipoChavePix: banco.tipoChavePix || 'CNPJ',
              chavePix: banco.chavePix || '',
              titular: banco.titular || ''
            });
            setShowModal(true);
          }}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" /> Editar Conta
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <span className="text-slate-400 font-medium block">Instituição Financeira:</span>
          <p className="font-bold text-slate-900">{banco.bancoNome || 'Não cadastrado'}</p>
        </div>

        <div>
          <span className="text-slate-400 font-medium block">Agência & Conta:</span>
          <p className="font-mono font-bold text-slate-900">
            Ag: {banco.agencia || '—'} | C/C: {banco.contaCorrente || '—'}
          </p>
        </div>

        <div>
          <span className="text-slate-400 font-medium block">Chave PIX Cadastrada:</span>
          <p className="font-mono font-bold text-emerald-700">
            {banco.tipoChavePix}: {banco.chavePix || '—'}
          </p>
        </div>

        <div>
          <span className="text-slate-400 font-medium block">Titularidade:</span>
          <p className="font-semibold text-slate-800">{banco.titular || '—'}</p>
        </div>
      </div>

      {/* Modal de Edição */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" /> Editar Dados Bancários & PIX
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Banco / Código</label>
                <input
                  type="text"
                  required
                  value={formData.bancoNome}
                  onChange={(e) => setFormData({ ...formData, bancoNome: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Agência</label>
                  <input
                    type="text"
                    required
                    value={formData.agencia}
                    onChange={(e) => setFormData({ ...formData, agencia: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Conta Corrente</label>
                  <input
                    type="text"
                    required
                    value={formData.contaCorrente}
                    onChange={(e) => setFormData({ ...formData, contaCorrente: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Chave PIX</label>
                  <select
                    value={formData.tipoChavePix}
                    onChange={(e) => setFormData({ ...formData, tipoChavePix: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="CNPJ">CNPJ</option>
                    <option value="E-mail">E-mail</option>
                    <option value="Telefone">Telefone</option>
                    <option value="Aleatória">Aleatória</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chave PIX</label>
                  <input
                    type="text"
                    required
                    value={formData.chavePix}
                    onChange={(e) => setFormData({ ...formData, chavePix: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Titular da Conta</label>
                <input
                  type="text"
                  required
                  value={formData.titular}
                  onChange={(e) => setFormData({ ...formData, titular: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
