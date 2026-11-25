import { useState, useEffect } from 'react';
import { getPassPlans, createPass } from '../../services/passService';
import { formatCurrency } from '../../utils/formatCurrency';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Check, Ticket, Zap } from 'lucide-react';

export default function PassCatalog() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getPassPlans();
      setPlans(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleBuyPass = async (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    await createPass({
      userId: user.uid,
      planId: plan.planId,
      planName: plan.name,
      price: plan.price,
      validUntil: '2026-08-31'
    });

    navigate('/wallet');
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando planos do Pass Curitiba 360...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8 space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Zap size={14} /> Novo Produto Oficial
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">Pass Curitiba 360 🎫</h1>
        <p className="text-gray-500 text-base">
          Um passaporte digital completo para explorar os melhores pontos turísticos, museus, parques, shows e restaurantes de Curitiba com economia garantida.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 pt-4">
        {plans.map((plan, index) => {
          const isFeatured = index === 1;
          return (
            <div
              key={plan.planId}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                isFeatured
                  ? 'bg-blue-700 text-white shadow-2xl scale-105 border-2 border-blue-500'
                  : 'bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {isFeatured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  MAIS POPULAR
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Ticket size={20} className={isFeatured ? 'text-blue-200' : 'text-blue-700'} />
                    <h3 className="font-extrabold text-xl">{plan.name}</h3>
                  </div>
                  <p className={`mt-2 text-xs font-medium ${isFeatured ? 'text-blue-100' : 'text-gray-500'}`}>
                    Validade: {plan.duration}
                  </p>
                </div>

                <div>
                  <span className="text-4xl font-black">{formatCurrency(plan.price)}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-gray-100/20">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm font-medium">
                      <Check size={18} className={`shrink-0 mt-0.5 ${isFeatured ? 'text-emerald-300' : 'text-emerald-600'}`} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleBuyPass(plan)}
                className={`mt-8 w-full rounded-2xl py-3.5 font-bold transition shadow-md ${
                  isFeatured
                    ? 'bg-white text-blue-800 hover:bg-gray-100'
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                Garantir Meu Pass
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
