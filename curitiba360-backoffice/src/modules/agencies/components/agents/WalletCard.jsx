import React, { useState } from 'react';
import { walletService } from '../../services/walletService';
import { Wallet, ArrowUpRight, CheckCircle2, DollarSign, Send, Clock, X } from 'lucide-react';

export default function WalletCard({ agentId, wallet = {}, onRequestSuccess }) {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(wallet.saldoDisponivel || 0);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRequestPayout = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setProcessing(true);

    try {
      await walletService.requestPayout(agentId, Number(payoutAmount));
      setShowPayoutModal(false);
      if (onRequestSuccess) onRequestSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao processar repasse.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Carteira Digital & Comissões</h3>
            <p className="text-[11px] text-slate-500 font-medium">Repasses automatizados via PIX.</p>
          </div>
        </div>

        <button
          disabled={wallet.saldoDisponivel <= 0}
          onClick={() => {
            setPayoutAmount(wallet.saldoDisponivel || 0);
            setShowPayoutModal(true);
          }}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" /> Resgatar PIX
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-emerald-50/60 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Saldo Disponível</span>
          <div className="text-lg font-extrabold text-emerald-700">
            R$ {(wallet.saldoDisponivel || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="p-3 bg-amber-50/60 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-amber-700 uppercase">A Liberar</span>
          <div className="text-lg font-extrabold text-amber-700">
            R$ {(wallet.saldoAguardando || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Total Resgatado</span>
          <div className="text-lg font-extrabold text-slate-800">
            R$ {(wallet.totalSacado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {wallet.pix && (
        <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between font-mono text-[11px]">
          <div>
            <span className="text-slate-400 font-sans block text-[9px] uppercase font-bold">Chave PIX Cadastrada</span>
            <span className="font-bold text-slate-800">{wallet.pix.tipo}: {wallet.pix.chave}</span>
          </div>
          <span className="text-[10px] font-sans text-slate-500">{wallet.pix.banco}</span>
        </div>
      )}

      {/* Modal de Solicitação de PIX */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600" /> Solicitar Transferência PIX
              </h3>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Valor do Resgate (R$)</label>
                <input
                  type="number"
                  step="10"
                  max={wallet.saldoDisponivel}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-700 text-sm"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Disponível: R$ {wallet.saldoDisponivel?.toFixed(2)}
                </span>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg font-semibold text-[11px]">
                  {errorMsg}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  {processing ? 'Processando...' : 'Confirmar Transferência PIX'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
