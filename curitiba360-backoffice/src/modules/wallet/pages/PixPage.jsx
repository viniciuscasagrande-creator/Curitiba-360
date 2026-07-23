import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import PixQRCode from '../components/PixQRCode';
import { ArrowLeft, QrCode, DollarSign, CheckCircle2 } from 'lucide-react';

export function PixPage() {
  const navigate = useNavigate();
  const { addBalancePix, confirmPixRecharge } = useWallet();
  const [amount, setAmount] = useState(50);
  const [pixData, setPixData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleGeneratePix = async () => {
    if (!amount || amount <= 0) return;
    setLoading(true);
    try {
      const data = await addBalancePix(amount);
      setPixData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPix = async () => {
    try {
      await confirmPixRecharge(amount);
      setSuccessMsg(`Recarga de R$ ${amount.toFixed(2)} efetuada com sucesso via PIX!`);
      setTimeout(() => navigate('/carteira'), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/carteira')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para a Carteira
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Recarga Instantânea</span>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <QrCode size={24} className="text-amber-400" />
          Adicionar Saldo via PIX
        </h1>
      </div>

      {successMsg ? (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-3xl text-center space-y-2 font-bold">
          <CheckCircle2 size={36} className="mx-auto" />
          <p>{successMsg}</p>
        </div>
      ) : !pixData ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white">Selecione ou digite o valor da recarga</h3>

          {/* Valores Rápidos */}
          <div className="grid grid-cols-4 gap-3">
            {[20, 50, 100, 200].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`py-3 rounded-2xl border text-center font-bold text-sm transition-all ${
                  amount === val
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                R$ {val}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-semibold block">Ou digite outro valor (R$)</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-lg font-bold text-amber-400 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleGeneratePix}
            disabled={loading || !amount || amount <= 0}
            className="w-full py-4 font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-base"
          >
            <QrCode size={20} />
            Gerar QR Code PIX
          </button>
        </div>
      ) : (
        <PixQRCode pixData={pixData} onConfirmSimulated={handleConfirmPix} />
      )}
    </div>
  );
}
export default PixPage;
