import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartService } from '../services/CartService';
import { OrderService } from '../services/OrderService';

export function useCheckout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => CartService.loadCart());
  const [currentStep, setCurrentStep] = useState(1); // 1: Identificação, 2: Participantes, 3: Pagamento, 4: Revisão
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Comprador
  const [buyer, setBuyer] = useState({
    name: 'Vinicius Casagrande',
    cpf: '123.456.789-00',
    email: 'vinicius@curitiba360.com.br',
    phone: '(41) 99999-8888'
  });

  // Participantes por ingresso
  const [attendees, setAttendees] = useState([]);

  // Formas de pagamento
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix', 'card', 'wallet'
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: 1
  });

  useEffect(() => {
    // Inicializar lista de participantes baseada nos ingressos do carrinho
    if (cart.items && cart.items.length > 0) {
      const initialAttendees = [];
      cart.items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          initialAttendees.push({
            lotId: item.lotId,
            lotName: item.lotName,
            nome: i === 0 ? buyer.name : '',
            cpf: i === 0 ? buyer.cpf : '',
            birthDate: '',
            email: i === 0 ? buyer.email : ''
          });
        }
      });
      setAttendees(initialAttendees);
    }
  }, [cart.items]);

  const updateAttendee = (index, field, value) => {
    setAttendees((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!buyer.name || !buyer.cpf || !buyer.email) {
        setError('Por favor, preencha todos os campos obrigatórios do comprador.');
        return;
      }
    }
    if (currentStep === 2) {
      // Validar se dados exigidos foram preenchidos
      const invalid = attendees.some((a) => !a.nome || !a.cpf);
      if (invalid) {
        setError('Preencha o Nome e CPF de todos os participantes dos ingressos.');
        return;
      }
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const submitCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      // Associar participantes formatados aos itens do carrinho
      let attendeeIndex = 0;
      const formattedItems = cart.items.map((item) => {
        const itemAttendees = attendees.slice(attendeeIndex, attendeeIndex + item.quantity);
        attendeeIndex += item.quantity;
        return {
          ...item,
          attendees: itemAttendees
        };
      });

      const result = await OrderService.checkoutOrder({
        buyer,
        items: formattedItems,
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null,
        coupon: cart.coupon,
        cashbackUsed: cart.cashbackUsed
      });

      if (result.success) {
        navigate(`/events/orders/${result.order.id}`);
      } else {
        setError('Falha ao processar pedido. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro no checkout:', err);
      setError(err.message || 'Erro inesperado ao finalizar pedido.');
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    currentStep,
    loading,
    error,
    buyer,
    setBuyer,
    attendees,
    updateAttendee,
    paymentMethod,
    setPaymentMethod,
    cardDetails,
    setCardDetails,
    handleNextStep,
    handlePrevStep,
    submitCheckout
  };
}
