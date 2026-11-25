import { CartProvider } from './modules/cart'
import { CartProvider as LegacyCartProvider } from './contexts/CartContext'
import { CheckoutProvider } from './modules/checkout'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <CartProvider>
      <LegacyCartProvider>
        <CheckoutProvider>
          <AppRoutes />
        </CheckoutProvider>
      </LegacyCartProvider>
    </CartProvider>
  )
}
