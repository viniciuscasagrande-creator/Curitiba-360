import React from "react";
import OrderPaymentInfo from "./OrderPaymentInfo";

export default function OrderPaymentCard({ payment = {}, pricing = {} }) {
  return <OrderPaymentInfo payment={payment} pricing={pricing} />;
}
