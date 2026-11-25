import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Plus, Trash2, CheckCircle } from "lucide-react";
import { useSuperWallet } from "../hooks/useSuperWallet";

export default function MarketplacePage() {
  const { wallet, payWithWallet } = useSuperWallet();
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  const products = [
    { id: "prod-1", name: "Minha Capivara de Pelúcia", price: 45.0, partner: "Artesanatos CWB" },
    { id: "prod-2", name: "Caneca Vidro Ópera de Arame", price: 25.0, partner: "CWB Souvenirs" },
    { id: "prod-3", name: "Roteiro Completo Linha Turismo", price: 50.0, partner: "URBS Oficial" }
  ];

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const total = cart.reduce((acc, p) => acc + p.price, 0);

  const handleCheckout = async () => {
    if (total === 0) return;
    const res = await payWithWallet(total, `Compra Marketplace C360`);
    if (res.success) {
      setSuccess(true);
      setCart([]);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert(res.message || "Erro no pagamento.");
    }
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Mercado Local</h2>
          <p className="text-[10px] text-slate-500 m-0">Compre lembranças, pacotes e produtos locais com split de pagamento.</p>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-3xl text-center space-y-1.5 animate-fadeIn">
            <CheckCircle size={32} className="text-emerald-600 mx-auto" />
            <h3 className="text-xs font-bold my-0">Compra Concluída!</h3>
            <p className="text-[10px] my-0">Seu pagamento foi aprovado e o split de repasse foi enviado ao parceiro.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-3xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[8px] text-slate-400 font-bold font-mono block">{p.partner}</span>
                <strong className="text-xs text-slate-800 block leading-tight">{p.name}</strong>
                <span className="text-xs font-extrabold text-slate-900 font-mono">R$ {p.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => addToCart(p)}
                className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-2xl border border-emerald-100 transition cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Carrinho Flutuante */}
        {cart.length > 0 && (
          <div className="bg-slate-900 text-white p-4 rounded-3xl space-y-3 animate-fadeIn">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider my-0 flex items-center gap-1.5">
              <ShoppingBag size={14} /> Carrinho Unificado ({cart.length})
            </h3>
            <div className="divide-y divide-slate-800 max-h-24 overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0 flex justify-between items-center text-[10px]">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span>R$ {item.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-transparent border-none text-red-400 cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-slate-800 pt-2 font-mono text-xs">
              <span>Total</span>
              <strong className="text-emerald-400">R$ {total.toFixed(2)}</strong>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl border-none shadow-2xs transition cursor-pointer"
            >
              Confirmar Pagamento via Wallet
            </button>
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
