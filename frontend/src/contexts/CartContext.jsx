import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('curitiba360_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('curitiba360_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (ticket) => {
    setItems(current => {
      const existing = current.find(item => item.id === ticket.id)

      if (existing) {
        return current.map(item =>
          item.id === ticket.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...current,
        {
          ...ticket,
          quantity: 1
        }
      ]
    })
  }

  const removeFromCart = (ticketId) => {
    setItems(current => current.filter(item => item.id !== ticketId))
  }

  const updateQuantity = (ticketId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(ticketId)
      return
    }

    setItems(current =>
      current.map(item =>
        item.id === ticketId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
