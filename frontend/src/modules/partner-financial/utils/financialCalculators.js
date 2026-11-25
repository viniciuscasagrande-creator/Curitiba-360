export function roundMoney(value) {
  return Math.round(
    (Number(value || 0) +
      Number.EPSILON) *
      100
  ) / 100;
}

export function calculateSaleFinancials({
  ticketAmount,
  serviceFeeCharged = 0,
  discountAmount = 0,
  cashbackAmount = 0,
  platformFeeRate = 0,
  paymentFeeRate = 0,
  paymentFixedFee = 0,
  reserveRate = 0,
  withholdingRate = 0,
}) {
  const grossTicketAmount =
    roundMoney(ticketAmount);

  const customerPaidAmount =
    roundMoney(
      grossTicketAmount +
        serviceFeeCharged -
        discountAmount -
        cashbackAmount
    );

  const platformFee =
    roundMoney(
      grossTicketAmount *
        platformFeeRate
    );

  const paymentFee =
    roundMoney(
      customerPaidAmount *
        paymentFeeRate +
        paymentFixedFee
    );

  const reserveAmount =
    roundMoney(
      grossTicketAmount *
        reserveRate
    );

  const withholdingAmount =
    roundMoney(
      grossTicketAmount *
        withholdingRate
    );

  const partnerNetAmount =
    roundMoney(
      grossTicketAmount -
        platformFee -
        paymentFee -
        reserveAmount -
        withholdingAmount -
        discountAmount
    );

  return {
    ticketAmount:
      grossTicketAmount,

    serviceFeeCharged:
      roundMoney(
        serviceFeeCharged
      ),

    discountAmount:
      roundMoney(
        discountAmount
      ),

    cashbackAmount:
      roundMoney(
        cashbackAmount
      ),

    customerPaidAmount,

    platformFee,
    paymentFee,
    reserveAmount,
    withholdingAmount,
    partnerNetAmount,
  };
}
