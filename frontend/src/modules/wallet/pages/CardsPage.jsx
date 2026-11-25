import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import WalletCard from '../components/WalletCard';
import { ArrowLeft, CreditCard, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function CardsPage() {
  const navigate = useNavigate();
  const { cards, saveCard } = useWallet();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    brand: 'Visa',
    number: '',
    holderName: '',
    expiry: ''
  });
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSaveCard = async (e) => {
    e.preventDefault();
    if (!newCard.number || newCard.number.length < 13) {
      alert('Número de cartão inválido.');
      return;
    }
    try {
      await saveCard(newCard);
      setSuccessMsg('Cartão de crédito tokenizado e salvo com segurança!');
      setShowAddForm(false);
      setNewCard({ brand: 'Visa', number: '', holderName: '', expiry: '' });
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/carteira')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para a Carteira
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Pagamentos Tokenizados</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <CreditCard size={28} className="text-amber-400" />
            Meus Cartões de Crédito
          </h1>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-2xl shadow-md transition-colors"
        >
          <Plus size={16} />
          {showAddForm ? 'Cancelar' : 'Adicionar Novo Cartão'}
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 size={18} />
          {successMsg}
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleSaveCard} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">Novo Cartão Tokenizado</h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={14} />
              Criptografia de Ponta a Ponta
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Bandeira</label>
              <select
                value={newCard.brand}
                onChange={(e) => setNewCard({ ...newCard, brand: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Elo">Elo</option>
                <option value="Amex">American Express</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Número do Cartão</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Nome no Cartão</label>
              <input
                type="text"
                placeholder="NOME IGUAL AO CARTAO"
                value={newCard.holderName}
                onChange={(e) => setNewCard({ ...newCard, holderName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 uppercase"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Validade (MM/AA)</label>
              <input
                type="text"
                placeholder="12/28"
                value={newCard.expiry}
                onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            🔒 O Curitiba 360 não armazena seu CVV ou número completo. Apenas um token seguro criptografado.
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Salvar Cartão Tokenizado
          </button>
        </form>
      )}

      {/* Lista de Cartões Salvos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <WalletCard key={c.id} card={c} />
        ))}
      </div>
    </div>
  );
}
export default CardsPage;
