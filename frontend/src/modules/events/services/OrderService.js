import { OrderRepository } from '../repositories/OrderRepository';
import { TicketRepository } from '../repositories/TicketRepository';
import { CartService } from './CartService';
import { PaymentService } from './PaymentService';

export const OrderService = {
  async checkoutOrder({ buyer, items, paymentMethod, cardDetails, coupon, cashbackUsed }) {
    const cartCalc = CartService.calculateTotal({ items, coupon, cashbackUsed });

    const orderData = {
      buyerName: buyer.name,
      buyerCpf: buyer.cpf,
      buyerEmail: buyer.email,
      buyerPhone: buyer.phone,
      items,
      subtotal: cartCalc.subtotal,
      taxes: cartCalc.taxes,
      discount: cartCalc.discount,
      cashbackUsed: cartCalc.cashbackUsed,
      total: cartCalc.total,
      paymentMethod,
      status: paymentMethod === 'pix' ? 'pending' : 'approved'
    };

    const order = await OrderRepository.create(orderData);

    let payment;
    if (paymentMethod === 'pix') {
      payment = await PaymentService.createPix({ amount: order.total, orderId: order.id });
    } else if (paymentMethod === 'card') {
      payment = await PaymentService.createCard({ amount: order.total, orderId: order.id, ...cardDetails });
    } else {
      payment = await PaymentService.createWallet({ amount: order.total, orderId: order.id });
    }

    order.paymentId = payment.id;
    order.paymentDetails = payment;

    let tickets = [];
    if (order.status === 'approved') {
      tickets = await TicketRepository.generate(order);
      order.tickets = tickets;
    }

    // Limpar o carrinho após finalizar o pedido com sucesso
    CartService.clearCart();

    return {
      success: true,
      order,
      payment,
      tickets
    };
  },

  async getOrderById(orderId) {
    const order = await OrderRepository.find(orderId);
    if (!order) {
      throw new Error('Pedido não encontrado.');
    }
    return { success: true, order };
  },

  async approveOrder(orderId) {
    const order = await OrderRepository.find(orderId);
    if (!order) throw new Error('Pedido não encontrado.');

    const updatedOrder = await OrderRepository.updateStatus(orderId, 'approved');
    const tickets = await TicketRepository.generate(updatedOrder);
    return { success: true, order: updatedOrder, tickets };
  },

  async cancelOrder(orderId) {
    const cancelled = await OrderRepository.cancel(orderId);
    return { success: true, order: cancelled };
  }
};
