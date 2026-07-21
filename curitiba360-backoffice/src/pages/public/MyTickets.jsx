import { useNavigate } from 'react-router-dom';
import { Ticket, Send, RotateCcw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function MyTickets() {
  const navigate = useNavigate();

  const tickets = [
    {
      id: 'CTB360-ABCD1234',
      event: 'Festival Curitiba 360',
      date: '20/08/2026',
      type: 'Ingresso Inteira - Pista Premium'
    },
    {
      id: 'CTB360-OPERA991',
      event: 'Noite de Gala na Ópera de Arame',
      date: '10/08/2026',
      type: 'Plateia VIP Frontal'
    }
  ];

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Ingressos 🎟️</h1>
          <p className="mt-1 text-gray-500">Sua carteira digital com validação por QR Code na entrada dos eventos.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {tickets.map(ticket => (
          <div key={ticket.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="bg-blue-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <Ticket size={24} />
                  <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">VÁLIDO</span>
                </div>
                <h2 className="mt-4 text-xl font-bold">{ticket.event}</h2>
                <p className="mt-1 text-sm text-blue-100">Data: {ticket.date}</p>
              </div>

              <div className="p-6 text-center">
                <p className="text-sm font-semibold text-gray-600">{ticket.type}</p>

                <div className="mt-6 flex justify-center p-3 bg-gray-50 rounded-2xl border border-gray-100 w-fit mx-auto">
                  <QRCodeSVG value={ticket.id} size={180} />
                </div>

                <p className="mt-4 font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {ticket.id}
                </p>
              </div>
            </div>

            {/* Quick Participant Actions */}
            <div className="grid grid-cols-2 border-t border-gray-100 bg-gray-50/50 p-3 gap-2">
              <button
                onClick={() => navigate('/ticket-transfer')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
              >
                <Send size={14} className="text-blue-600" />
                Transferir
              </button>
              <button
                onClick={() => navigate('/refund-request')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
              >
                <RotateCcw size={14} className="text-amber-600" />
                Reembolsar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
