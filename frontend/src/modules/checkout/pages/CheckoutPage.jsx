import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../home/layouts/HomeLayout";
import HomeHeader from "../../home/components/HomeHeader";
import BottomNavigation from "../../home/components/BottomNavigation";

import CheckoutStepper from "../components/CheckoutStepper";
import CheckoutSummary from "../components/CheckoutSummary";
import BuyerForm from "../components/BuyerForm";
import ParticipantsForm from "../components/ParticipantsForm";
import BillingAddressForm from "../components/BillingAddressForm";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import CreditCardForm from "../components/CreditCardForm";
import InstallmentsSelector from "../components/InstallmentsSelector";
import TermsAcceptance from "../components/TermsAcceptance";
import PixPaymentCard from "../components/PixPaymentCard";
import CheckoutSuccessCard from "../components/CheckoutSuccessCard";
import CheckoutLoading from "../components/CheckoutLoading";
import CheckoutError from "../components/CheckoutError";

import { useCheckout } from "../hooks/useCheckout";
import { useCart } from "../../cart";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const {
    checkoutState,
    currentStep,
    loading,
    saving,
    error,
    createdOrder,
    updateCheckoutState,
    nextStep,
    prevStep,
    confirmOrder,
  } = useCheckout();

  const [cardErrors, setCardErrors] = useState({});

  if (loading || !checkoutState) {
    return (
      <HomeLayout header={<HomeHeader />} bottomNavigation={<BottomNavigation />}>
        <div className="mx-auto max-w-7xl px-4 py-12 select-none text-center">
          <CheckoutLoading message="Carregando checkout..." />
        </div>
      </HomeLayout>
    );
  }

  // Handle forms submit
  const handleBuyerSubmit = (data) => {
    updateCheckoutState((prev) => ({ ...prev, buyer: data }));
    nextStep();
  };

  const handleParticipantsSubmit = (data) => {
    updateCheckoutState((prev) => ({ ...prev, participants: data }));
    nextStep();
  };

  const handleBillingSubmit = (data) => {
    updateCheckoutState((prev) => ({ ...prev, billingAddress: data }));
    nextStep();
  };

  const handleCardChange = (field, value) => {
    updateCheckoutState((prev) => {
      const next = { ...prev };
      next.payment.creditCard = {
        ...next.payment.creditCard,
        [field]: value,
      };
      return next;
    });
  };

  const handlePaymentForward = async () => {
    if (checkoutState.payment.method === "credit_card") {
      const card = checkoutState.payment.creditCard || {};
      const errors = {};
      if (!card.cardNumber || card.cardNumber.length < 19) errors.cardNumber = "Número do cartão inválido.";
      if (!card.holderName || card.holderName.length < 3) errors.holderName = "Nome no cartão é obrigatório.";
      if (!card.expiry || card.expiry.length < 5) errors.expiry = "Validade inválida (MM/AA).";
      if (!card.cvv || card.cvv.length < 3) errors.cvv = "CVV inválido.";

      if (Object.keys(errors).length > 0) {
        setCardErrors(errors);
        return;
      }
    }
    setCardErrors({});
    nextStep();
  };

  const handleFinishPurchase = async () => {
    if (!checkoutState.termsAccepted) {
      window.alert("Você deve aceitar os Termos de Uso e Política de Privacidade.");
      return;
    }
    try {
      const order = await confirmOrder();
      if (order && order.id) {
        navigate(`/checkout/resultado/${order.id}`, { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 select-none text-left">
        <CheckoutStepper currentStep={currentStep} />

        {error && (
          <div className="mb-5">
            <CheckoutError message={error} />
          </div>
        )}

        {saving && (
          <div className="py-12 bg-white rounded-3xl border border-slate-200">
            <CheckoutLoading />
          </div>
        )}

        {!saving && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Form Column */}
            <div className="space-y-6 lg:col-span-2">
              {currentStep === 1 && (
                <BuyerForm
                  initialValues={checkoutState.buyer}
                  onSubmit={handleBuyerSubmit}
                />
              )}

              {currentStep === 2 && (
                <ParticipantsForm
                  cart={cart}
                  buyer={checkoutState.buyer}
                  initialValues={checkoutState.participants}
                  onBack={prevStep}
                  onSubmit={handleParticipantsSubmit}
                />
              )}

              {currentStep === 3 && (
                <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-955 my-0 pb-2 border-b border-slate-100">
                    Forma de Pagamento
                  </h3>

                  <PaymentMethodSelector
                    selectedMethod={checkoutState.payment.method}
                    onChange={(method) =>
                      updateCheckoutState((prev) => {
                        const next = { ...prev };
                        next.payment.method = method;
                        return next;
                      })
                    }
                  />

                  {checkoutState.payment.method === "credit_card" && (
                    <div className="border-t border-slate-100 pt-4 space-y-4">
                      <CreditCardForm
                        values={checkoutState.payment.creditCard}
                        errors={cardErrors}
                        onChange={handleCardChange}
                      />
                      <InstallmentsSelector
                        total={cart?.pricing?.total || 0}
                        selectedValue={checkoutState.payment.creditCard.installments}
                        onChange={(inst) => handleCardChange("installments", inst)}
                      />
                    </div>
                  )}

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 text-sm font-semibold text-slate-700 transition cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={handlePaymentForward}
                      className="h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-6 text-sm font-bold text-white transition border-none cursor-pointer"
                    >
                      Avançar
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-955 my-0 pb-2 border-b border-slate-100">
                    Revisão do Pedido
                  </h3>

                  {/* Review details */}
                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="font-bold text-slate-800 my-0 mb-1">Comprador</h4>
                      <p className="my-0">
                        {checkoutState.buyer.name} {checkoutState.buyer.surname} ({checkoutState.buyer.cpf})<br />
                        E-mail: {checkoutState.buyer.email} • Tel: {checkoutState.buyer.phone}
                      </p>
                    </div>

                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="font-bold text-slate-800 my-0 mb-1">Pagamento</h4>
                      <p className="my-0 uppercase font-mono">
                        {checkoutState.payment.method === "pix" ? "Pix (Aprovação Instantânea)" : "Cartão de Crédito"}
                      </p>
                    </div>

                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="font-bold text-slate-800 my-0 mb-1">Endereço de Cobrança</h4>
                      <p className="my-0">
                        {checkoutState.billingAddress.street}, {checkoutState.billingAddress.number}{" "}
                        {checkoutState.billingAddress.complement && `(${checkoutState.billingAddress.complement})`} -{" "}
                        {checkoutState.billingAddress.neighborhood}, {checkoutState.billingAddress.city} -{" "}
                        {checkoutState.billingAddress.state} (CEP: {checkoutState.billingAddress.cep})
                      </p>
                    </div>
                  </div>

                  <TermsAcceptance
                    checked={checkoutState.termsAccepted}
                    onChange={(checked) =>
                      updateCheckoutState((prev) => ({ ...prev, termsAccepted: checked }))
                    }
                  />

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 text-sm font-semibold text-slate-700 transition cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      disabled={!checkoutState.termsAccepted}
                      onClick={handleFinishPurchase}
                      className="h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-55 px-6 text-sm font-bold text-white transition border-none cursor-pointer"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 5 && createdOrder && (
                <div>
                  {createdOrder.payment.method === "pix" ? (
                    <div className="space-y-6">
                      <PixPaymentCard order={createdOrder} />
                      <div className="pt-2">
                        <CheckoutSuccessCard order={createdOrder} />
                      </div>
                    </div>
                  ) : (
                    <CheckoutSuccessCard order={createdOrder} />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Pricing Review Column */}
            {currentStep < 5 && (
              <div className="lg:col-span-1">
                <CheckoutSummary />
              </div>
            )}
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
