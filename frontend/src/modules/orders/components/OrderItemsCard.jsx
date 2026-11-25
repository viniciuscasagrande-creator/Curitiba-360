import React from "react";
import OrderItemList from "./OrderItemList";

export default function OrderItemsCard({ items = [] }) {
  return <OrderItemList items={items} />;
}
