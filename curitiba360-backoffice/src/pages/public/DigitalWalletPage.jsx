import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserWallet } from '../../services/walletService';
import { getUserPass } from '../../services/passService';
import { formatCurrency } from '../../utils/formatCurrency';
import { Wallet, Ticket, Award, DollarSign, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DigitalWalletPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [userPasses, setUserPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const walletData = await getUserWallet(user?.uid || 'user-001');
      const passData = await getUserPass(user?.uid || 'user-001');
      setWallet(walletData);
      setUserPasses(passData);
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando carteira digital...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Minha Carteira Digital 💳</h1>
        <p className="mt-1 text-gray-500">Seus pontos, cashback, passes e ingressos em um só lugar.</p>
      </div>

      {/* Wallet Balance Header */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 p-6 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">Saldo Cashback</span>
            <DollarSign size={22} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black">{formatCurrency(wallet?.cashbackBalance || 32.50)}</h2>
          <p className="text-xs text-blue-200">Disponível para abatimento em novas compras</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-900 p-6 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-200">Pontos de Fidelidade</span>
            <Award size={22} className="text-amber-400" />
          </div>
          <h2 className="text-3xl font-black">{wallet?.points || 2450} <span className="text-sm font-medium">pts</span></h2>
          <p className="text-xs text-purple-200">Nível atual: <strong>{wallet?.level || 'OURO ⭐'}</strong></p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-gray-500">Pass Curitiba 360</span>
            <Ticket size={22} className="text-blue-700" />
          </div>
          {userPasses.length ? (
            <div>
              <span className="text-lg font-bold text-gray-900 block">{userPasses[0].planName}</span>
              <span className="text-xs font-semibold text-emerald-600">Ativo até {userPasses[0].validUntil}</span>
            </div>
          ) : (
            <div>
              <span className="text-sm font-semibold text-gray-700 block">Nenhum Pass ativo</span>
              <span className="text-xs text-gray-500">Adquira o Pass e economize em mais de 15 atrações.</span>
            </div>
          )}
          <Link to="/pass" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800">
            Conhecer Planos Pass <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Active Pass section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Gift size={20} className="text-purple-600" />
          Benefícios e Descontos em Parceiros
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-5 space-y-2">
            <span className="text-xs font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">GASTRONOMIA</span>
            <h3 className="font-bold text-gray-900">15% de desconto no Restaurante Madalosso</h3>
            <p className="text-xs text-gray-500">Válido apresentando seu QR Code do Pass na mesa.</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-5 space-y-2">
            <span className="text-xs font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">PASSEIOS</span>
            <h3 className="font-bold text-gray-900">Ingresso Cortesia na Serra Verde Express</h3>
            <p className="text-xs text-gray-500">Desconto exclusivo de 20% na compra do trem de morretes.</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Wallet size={20} className="text-emerald-600" />
          Histórico da Carteira
        </h2>

        <div className="divide-y divide-gray-100">
          {wallet?.transactions?.map(tx => (
            <div key={tx.id} className="flex justify-between items-center py-3 text-sm">
              <div>
                <p className="font-semibold text-gray-800">{tx.source}</p>
                <span className="text-xs text-gray-400">{tx.date}</span>
              </div>
              <span className="font-bold text-emerald-600">+{formatCurrency(tx.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
