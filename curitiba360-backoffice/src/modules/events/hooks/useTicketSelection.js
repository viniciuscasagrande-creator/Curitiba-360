import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventService } from '../services/EventService';
import { CartService } from '../services/CartService';

export function useTicketSelection(eventId) {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [lots, setLots] = useState([]);
  const [selected, setSelected] = useState({}); // { lotId: quantity }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!eventId) return;
      setLoading(true);
      try {
        const res = await EventService.getEventById(eventId);
        setEvent(res.data);
        setLots(res.data.lotes || []);
      } catch (err) {
        setError(err.message || 'Erro ao carregar lotes do evento.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [eventId]);

  const add = (lotId) => {
    const lot = lots.find((l) => l.id === lotId);
    if (!lot) return;

    if (lot.status !== 'ativo') {
      alert('Este lote não está ativo para venda.');
      return;
    }

    const available = lot.qtdTotal - lot.qtdVendida;
    const currentQtd = selected[lotId] || 0;
    const limitPerCpf = event?.limitePorComprador || 6;

    if (currentQtd >= available) {
      alert(`Quantidade indisponível no estoque (restantes: ${available}).`);
      return;
    }

    const totalSelectedCount = Object.values(selected).reduce((acc, qty) => acc + qty, 0);
    if (totalSelectedCount >= limitPerCpf) {
      alert(`Limite máximo de ${limitPerCpf} ingressos por comprador atingido.`);
      return;
    }

    setSelected((prev) => ({
      ...prev,
      [lotId]: (prev[lotId] || 0) + 1
    }));
  };

  const remove = (lotId) => {
    setSelected((prev) => {
      const current = prev[lotId] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[lotId];
        return updated;
      }
      return { ...prev, [lotId]: current - 1 };
    });
  };

  const subtotal = useMemo(() => {
    return Object.entries(selected).reduce((acc, [lotId, qty]) => {
      const lot = lots.find((l) => l.id === lotId);
      return acc + (lot ? lot.preco * qty : 0);
    }, 0);
  }, [selected, lots]);

  const serviceFeePct = event?.taxaServicoPct || 10;
  const taxes = useMemo(() => {
    return CartService.calculateFees(subtotal, serviceFeePct);
  }, [subtotal, serviceFeePct]);

  const total = useMemo(() => {
    return subtotal + taxes;
  }, [subtotal, taxes]);

  const handleContinue = () => {
    const selectedEntries = Object.entries(selected).filter(([, qty]) => qty > 0);
    if (selectedEntries.length === 0) {
      alert('Selecione pelo menos um ingresso para continuar.');
      return;
    }

    const cartItems = selectedEntries.map(([lotId, qty]) => {
      const lot = lots.find((l) => l.id === lotId);
      return {
        eventId: event.id,
        eventName: event.nome,
        eventDate: event.dataInicio,
        eventVenue: event.venue,
        eventAddress: event.endereco,
        lotId: lot.id,
        lotName: lot.nome,
        price: lot.preco,
        quantity: qty,
        taxaServicoPct: serviceFeePct,
        limitPerBuyer: event.limitePorComprador || 6
      };
    });

    const currentCart = CartService.loadCart();
    CartService.saveCart({
      ...currentCart,
      items: cartItems
    });

    navigate('/events/cart');
  };

  return {
    event,
    lots,
    selected,
    subtotal,
    taxes,
    total,
    loading,
    error,
    add,
    remove,
    continue: handleContinue
  };
}
