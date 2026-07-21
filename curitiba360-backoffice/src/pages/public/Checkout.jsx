import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    setLoading(true)

    setTimeout(() => {
      clearCart()
      setLoading(false)
      navigate('/my-tickets')
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold text-gray-900">Checkout 💳</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Forma de Pagamento</h2>

          <div className="space-y-3">
            {[
              ['pix', 'PIX (Aprovação Instantânea)'],
              ['credit_card', 'Cartão de crédito'],
              ['boleto', 'Boleto bancário']
            ].map(option => (
              <label
                key={option[0]}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  paymentMethod === option[0] ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option[0]}
                  checked={paymentMethod === option[0]}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-gray-800">{option[1]}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? 'Processando pedido...' : 'Finalizar Pedido e Emitir Ingressos'}
          </button>
        </div>

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 text-lg">Resumo do Pedido</h2>

          <div className="mt-5 space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <div className="flex justify-between text-base font-bold">
              <span className="text-gray-700">Total a Pagar</span>
              <span className="text-blue-700 text-xl">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
