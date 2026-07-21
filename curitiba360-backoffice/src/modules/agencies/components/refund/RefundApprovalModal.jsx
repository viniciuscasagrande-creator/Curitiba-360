import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle2, XCircle, DollarSign, AlertTriangle } from 'lucide-react';

export default function RefundApprovalModal({ isOpen, onClose, request = {}, onApprove, onReject }) {
  const [actionType, setActionType] = useState('approve'); // approve, reject
  const [papel, setPapel] = useState('Financeiro Curitiba360');
  const [motivo, setMotivo] = useState('');
  const [valorReembolsado, setValorReembolsado] = useState(request.valorTotal || 0);
  const [usuario, setUsuario] = useState('Maria Oliveira');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !request) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (actionType === 'approve') {
        await onApprove(request.id, {
          papel,
          motivo: motivo || 'Reembolso homologado pela equipe financeira',
          valorReembolsado: Number(valorReembolsado),
          usuario
        });
      } else {
        await onReject(request.id, {
          papel,
          motivo: motivo || 'Solicitação rejeitada conforme regras de compra',
          usuario
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" /> Análise Financeira — {request.id}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl space-y-1">
          <div className="font-bold text-slate-900">{request.eventoNome}</div>
          <div className="text-[11px] text-slate-500">
            Cliente: <span className="font-semibold text-slate-800">{request.clienteNome}</span> | Pedido: <span className="font-mono text-slate-800">{request.pedidoId}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Valor Total do Pedido: <span className="font-bold text-slate-900">R$ {request.valorTotal?.toFixed(2)}</span> ({request.formaPagamento})
          </div>
        </div>

        {/* Alternador Aprovar / Negar */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActionType('approve')}
            className={`p-2.5 rounded-xl border font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
              actionType === 'approve'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Aprovar Reembolso
          </button>
          <button
            type="button"
            onClick={() => setActionType('reject')}
            className={`p-2.5 rounded-xl border font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
              actionType === 'reject'
                ? 'bg-red-600 text-white border-red-600 shadow-md'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <XCircle className="w-4 h-4" /> Negar Solicitação
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Papel Responsável</label>
            <select
              value={papel}
              onChange={(e) => setPapel(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium"
            >
              <option value="Financeiro Curitiba360">Financeiro / Tesouraria</option>
              <option value="Administrador Sistema">Administrador Geral</option>
              <option value="Produtor do Evento">Produtor do Evento</option>
              <option value="Supervisão Comercial">Supervisão Comercial</option>
            </select>
          </div>

          {actionType === 'approve' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Valor a Reembolsar (R$)</label>
              <input
                type="number"
                step="5"
                max={request.valorTotal}
                value={valorReembolsado}
                onChange={(e) => setValorReembolsado(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-700 text-sm"
              />
              {Number(valorReembolsado) < request.valorTotal && (
                <p className="text-[10px] text-amber-700 font-semibold mt-1">
                  ⚠️ Reembolso Parcial: Retenção de R$ {(request.valorTotal - Number(valorReembolsado)).toFixed(2)} de taxa operacional.
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {actionType === 'approve' ? 'Observações da Aprovação' : 'Motivo da Rejeição (Obrigatório)'}
            </label>
            <textarea
              rows={3}
              required={actionType === 'reject'}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder={actionType === 'approve' ? 'Aprovado conforme regulamento...' : 'Infração de regra do evento...'}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={processing}
              className={`px-5 py-2 text-white font-bold rounded-xl shadow-md ${
                actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {processing ? 'Processando...' : actionType === 'approve' ? 'Confirmar Aprovação' : 'Confirmar Rejeição'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
