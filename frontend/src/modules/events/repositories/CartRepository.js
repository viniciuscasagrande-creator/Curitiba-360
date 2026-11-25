const CART_KEY = 'curitiba360:cart';

export const CartRepository = {
  save(cartData) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error('Erro ao salvar CartRepository:', error);
    }
  },

  load() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : { items: [], coupon: null, cashbackUsed: 0 };
    } catch (error) {
      console.error('Erro ao carregar CartRepository:', error);
      return { items: [], coupon: null, cashbackUsed: 0 };
    }
  },

  remove() {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error('Erro ao remover CartRepository:', error);
    }
  },

  clear() {
    this.save({ items: [], coupon: null, cashbackUsed: 0 });
  }
};
