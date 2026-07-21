import { Ticket } from 'lucide-react'
import Button from '../ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCart } from '../../contexts/CartContext'

export default function TicketCard({ ticket }) {
  const { addToCart } = useCart()

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Ticket size={20} className="text-blue-700" />
            <h3 className="font-bold text-gray-900">{ticket.name}</h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">{ticket.description || 'Ingresso oficial com validação digital e suporte em tempo real.'}</p>
        </div>

        <strong className="text-xl text-blue-700 font-bold whitespace-nowrap ml-4">
          {formatCurrency(ticket.price)}
        </strong>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-gray-500 font-medium">
          {ticket.availableQuantity || ticket.available_quantity || 100} disponíveis
        </span>

        <Button onClick={() => addToCart(ticket)}>
          Adicionar
        </Button>
      </div>
    </div>
  )
}
