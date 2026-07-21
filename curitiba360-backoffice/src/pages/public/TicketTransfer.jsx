import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Send, ArrowLeft } from 'lucide-react';

export default function TicketTransfer() {
  const navigate = useNavigate();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [ticketId, setTicketId] = useState('CTB360-ABCD1234');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/my-tickets')} className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Transferir Ingresso 🎟️</h1>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
        {sent ? (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-bold text-gray-900">Transferência Concluída!</h2>
            <p className="text-sm text-gray-600">
              O ingresso <strong>{ticketId}</strong> foi transferido com sucesso para <strong>{recipientEmail}</strong>.
            </p>
            <Button onClick={() => navigate('/my-tickets')} className="w-full">
              Voltar aos Meus Ingressos
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-gray-500">
              Informe o e-mail do destinatário. O ingresso será transferido e um novo QR Code exclusivo será gerado para a carteira dele.
            </p>

            <Input
              label="Código do Ingresso"
              value={ticketId}
              onChange={e => setTicketId(e.target.value)}
              required
            />

            <Input
              label="E-mail do Destinatário"
              type="email"
              placeholder="amigo@email.com"
              value={recipientEmail}
              onChange={e => setRecipientEmail(e.target.value)}
              required
            />

            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <Send size={18} />
              Confirmar Transferência
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
