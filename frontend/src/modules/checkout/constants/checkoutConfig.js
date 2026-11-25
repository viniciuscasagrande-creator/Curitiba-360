export const CHECKOUT_STEPS = [
  { id: 1, label: "Comprador" },
  { id: 2, label: "Participantes" },
  { id: 3, label: "Pagamento" },
  { id: 4, label: "Revisão" },
  { id: 5, label: "Confirmação" },
];

export const PAYMENT_METHODS = [
  { id: "pix", label: "Pix", description: "Aprovação instantânea, 5% de desconto" },
  { id: "credit_card", label: "Cartão de Crédito", description: "Em até 12x (sem juros até 3x)" },
  { id: "debit_card", label: "Cartão de Débito (indisponível)", disabled: true },
  { id: "apple_pay", label: "Apple Pay (indisponível)", disabled: true },
  { id: "google_pay", label: "Google Pay (indisponível)", disabled: true },
];

export const INITIAL_CHECKOUT_STATE = {
  buyer: {
    name: "",
    surname: "",
    cpf: "",
    email: "",
    phone: "",
  },
  participants: [],
  billingAddress: {
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  },
  payment: {
    method: "pix",
    creditCard: {
      cardNumber: "",
      holderName: "",
      expiry: "",
      cvv: "",
      installments: 1,
    },
  },
  termsAccepted: false,
};
