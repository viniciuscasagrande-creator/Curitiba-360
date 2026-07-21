import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { createRefund } from '../../services/refundService';

export default function RefundRequest() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('ORD-10452-8821');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(180.00);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRefund({
      orderId,
      reason,
      amount,
      userName: 'Ana Paula'
    });
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/my-tickets')} className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Solicitar Reembolso ↩️</h1>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-bold text-gray-900">Solicitação Enviada!</h2>
            <p className="text-sm text-gray-600">
              Sua solicitação referente ao pedido <strong>#{orderId.slice(0, 8)}</strong> foi enviada para análise da equipe comercial.
            </p>
            <Button onClick={() => navigate('/my-tickets')} className="w-full">
              Voltar à Carteira
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-gray-500">
              Solicite o reembolso total ou parcial de ingressos dentro do prazo estabelecido na política do evento.
            </p>

            <Input
              label="Número do Pedido"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              required
            />

            <Input
              label="Valor a Reembolsar (R$)"
              type="number"
              step="0.01"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              required
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Motivo da Solicitação</label>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                placeholder="Explique o motivo do cancelamento ou impossibilidade de comparecimento..."
                value={reason}
                onChange={e => setReason(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <RotateCcw size={18} />
              Enviar Solicitação de Reembolso
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
