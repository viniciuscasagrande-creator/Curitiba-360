import React, { createContext, useState, useEffect, useMemo } from "react";
import { getCheckout, saveCheckout, createCheckoutOrder } from "../services/checkoutService";
import { useCart } from "../../cart";
import { useAuth } from "../../auth/hooks/useAuth";

export const CheckoutContext = createContext(null);

export default function CheckoutProvider({ children }) {
  const { cart } = useCart();
  const { user } = useAuth();

  const [checkoutState, setCheckoutState] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createdOrder, setCreatedOrder] = useState(null);

  // Load checkout state from service
  useEffect(() => {
    async function load() {
      try {
        const state = await getCheckout();
        
        // Auto-fill buyer fields if user is authenticated and buyer fields are blank
        if (user && state) {
          const filledState = { ...state };
          if (!filledState.buyer.name) filledState.buyer.name = user.name || "";
          if (!filledState.buyer.surname) filledState.buyer.surname = user.surname || "";
          if (!filledState.buyer.email) filledState.buyer.email = user.email || "";
          setCheckoutState(filledState);
        } else {
          setCheckoutState(state);
        }
      } catch (err) {
        setError("Não foi possível carregar o checkout.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  // Update checkout state handler
  async function updateCheckoutState(updater) {
    setError("");
    setSuccessMessage("");
    try {
      const nextState = typeof updater === "function" ? updater(checkoutState) : updater;
      setCheckoutState(nextState);
      await saveCheckout(nextState);
    } catch {
      setError("Não foi possível salvar os dados.");
    }
  }

  // Go to next step
  function nextStep() {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  }

  // Go to previous step
  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  // Confirm and place order
  async function confirmOrder() {
    setSaving(true);
    setError("");
    try {
      const order = await createCheckoutOrder(checkoutState, cart);
      setCreatedOrder(order);
      setSuccessMessage("Pedido criado com sucesso!");
      setCurrentStep(5);
      return order;
    } catch (err) {
      setError(err.message || "Não foi possível finalizar sua compra.");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  const value = useMemo(
    () => ({
      checkoutState,
      currentStep,
      loading,
      saving,
      error,
      successMessage,
      createdOrder,
      setCurrentStep,
      updateCheckoutState,
      nextStep,
      prevStep,
      confirmOrder,
    }),
    [checkoutState, currentStep, loading, saving, error, successMessage, createdOrder]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
