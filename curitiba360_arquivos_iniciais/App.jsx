import { CartProvider } from './modules/cart'
import { CheckoutProvider } from './modules/checkout'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <CartProvider>
      <CheckoutProvider>
        <AppRoutes />
      </CheckoutProvider>
    </CartProvider>
  )
}
