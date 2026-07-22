import React, { useState } from "react";
import { useParams } from "react-router-dom";

import HomeLayout from "../../home/layouts/HomeLayout";
import HomeHeader from "../../home/components/HomeHeader";
import BottomNavigation from "../../home/components/BottomNavigation";

import OrderHeader from "../components/OrderHeader";
import OrderHero from "../components/OrderHero";
import OrderInfoCard from "../components/OrderInfoCard";
import OrderItemsCard from "../components/OrderItemsCard";
import OrderPaymentCard from "../components/OrderPaymentCard";
import OrderCustomerCard from "../components/OrderCustomerCard";
import OrderTicketList from "../components/OrderTicketList";
import OrderTimeline from "../components/OrderTimeline";
import OrderActions from "../components/OrderActions";
import OrderShareButton from "../components/OrderShareButton";
import OrderDownloadButton from "../components/OrderDownloadButton";
import OrderCalendarButton from "../components/OrderCalendarButton";
import OrderRefundCard from "../components/OrderRefundCard";
import OrderReviewCard from "../components/OrderReviewCard";
import OrderCancelDialog from "../components/OrderCancelDialog";
import ProfileLoading from "../../profile/components/ProfileLoading";

import { useOrderDetail } from "../hooks/useOrderDetail";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [cancelOpen, setCancelOpen] = useState(false);

  const {
    order,
    loading,
    saving,
    error,
    successMessage,
    cancelOrder,
  } = useOrderDetail(orderId);

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        {order && <OrderHeader code={order.code} />}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700 animate-fade-in"
          >
            {successMessage}
          </div>
        )}

        {loading ? (
          <ProfileLoading />
        ) : !order ? (
          <div className="text-center py-12 rounded-3xl border border-slate-200 bg-white">
            <p className="text-slate-500 font-semibold my-0">Pedido não encontrado.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left/Main Column - Info, Items & Payments */}
            <div className="space-y-6 lg:col-span-2">
              <OrderHero order={order} />

              <OrderInfoCard order={order} />

              <OrderItemsCard items={order.items} />

              <OrderTicketList order={order} />

              <OrderPaymentCard payment={order.payment} pricing={order.pricing} />

              <OrderCustomerCard customer={order.customer} />
            </div>

            {/* Right Column - Status, Timeline & Extra buttons */}
            <div className="space-y-6 lg:col-span-1">
              <OrderActions
                order={order}
                onOpenCancel={() => setCancelOpen(true)}
              />

              {order.status === "refunded" && (
                <OrderRefundCard order={order} />
              )}

              <OrderReviewCard order={order} />

              {/* Utility Action Buttons */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 my-0 uppercase tracking-wider">
                  Utilitários
                </h3>
                <div className="space-y-2">
                  <OrderDownloadButton order={order} />
                  <OrderShareButton order={order} />
                  <OrderCalendarButton order={order} />
                </div>
              </section>

              <OrderTimeline
                status={order.status}
                createdAt={order.createdAt}
                payment={order.payment}
              />
            </div>
          </div>
        )}
      </div>

      {cancelOpen && (
        <OrderCancelDialog
          isOpen={cancelOpen}
          onClose={() => setCancelOpen(false)}
          onConfirm={cancelOrder}
          saving={saving}
        />
      )}
    </HomeLayout>
  );
}
