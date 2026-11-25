import { QRCodeSVG } from 'qrcode.react'

export default function DigitalTicket({ ticket }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
      <div className="bg-blue-700 p-6 text-white">
        <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">
          Curitiba 360
        </span>

        <h2 className="mt-3 text-2xl font-bold">
          {ticket.eventName || 'Festival Curitiba 360'}
        </h2>

        <p className="mt-2 text-blue-100 font-medium">
          {ticket.ticketTypeName || 'Ingresso Digital'}
        </p>
      </div>

      <div className="p-6">
        <div className="flex justify-center p-3 bg-gray-50 rounded-2xl border border-gray-100 w-fit mx-auto">
          <QRCodeSVG value={ticket.code} size={200} />
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Código do Ingresso
          </p>

          <p className="mt-1 font-mono text-lg font-bold text-gray-800">
            {ticket.code}
          </p>
        </div>

        <div className="mt-5 flex justify-between text-sm items-center border-t border-gray-100 pt-4">
          <span className="text-gray-500 font-medium">Status</span>

          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            ticket.status === 'used'
              ? 'bg-amber-100 text-amber-700'
              : ticket.status === 'cancelled'
              ? 'bg-red-100 text-red-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}>
            {ticket.status === 'used' ? 'Utilizado' : ticket.status === 'active' ? 'Válido' : ticket.status}
          </span>
        </div>
      </div>
    </div>
  )
}
