import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'

export default function Cart() {
  const navigate = useNavigate()
  const { items, total, removeFromCart, updateQuantity } = useCart()

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">Seu carrinho está vazio 🛒</h1>
        <p className="mt-3 text-gray-500">Escolha um evento ou atração para começar.</p>
        <Link
          to="/portal"
          className="mt-6 inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
        >
          Ver atrações e eventos
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold text-gray-900">Seu carrinho 🛒</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(item => (
            <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500 font-semibold">{formatCurrency(item.price)} cada</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm font-semibold text-red-600 hover:text-red-700 transition"
                >
                  Remover
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 font-bold hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-bold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 font-bold hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <span className="font-bold text-gray-900 text-base">
                  Subtotal: {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Resumo da Compra</h2>

          <div className="mt-6 flex justify-between border-t border-gray-100 pt-4 text-lg">
            <span className="font-medium text-gray-600">Total</span>
            <strong className="font-bold text-blue-700">{formatCurrency(total)}</strong>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
          >
            Ir para Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
