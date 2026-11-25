import React from "react";
import {
  ArrowLeft,
  Mail,
  RefreshCcw,
} from "lucide-react";
import {
  Link,
  useParams,
} from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import {
  CHECKOUT_RESULT_CONFIG,
} from "../constants/resultConfig";

import PixPendingPanel from "../components/PixPendingPanel";
import PurchaseActions from "../components/PurchaseActions";
import PurchaseOrderSummary from "../components/PurchaseOrderSummary";
import PurchasePaymentSummary from "../components/PurchasePaymentSummary";

import {
  useCheckoutResult,
} from "../hooks/useCheckoutResult";

export default function CheckoutResultPage() {
  const { orderId } = useParams();

  const {
    result,
    loading,
    error,
    reload,
  } = useCheckoutResult(orderId);

  if (loading) {
    return (
      <HomeLayout
        header={<HomeHeader />}
        bottomNavigation={
          <BottomNavigation />
        }
      >
        <div className="mx-auto max-w-5xl space-y-5 px-4 py-8 sm:px-6 select-none">
          <div className="h-56 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-72 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </HomeLayout>
    );
  }

  if (error || !result) {
    return (
      <HomeLayout
        header={<HomeHeader />}
        bottomNavigation={
          <BottomNavigation />
        }
      >
        <div className="mx-auto max-w-xl px-4 py-16 text-center select-none">
          <h1 className="text-2xl font-bold text-slate-950 my-0">
            Não foi possível carregar o pedido
          </h1>

          <p className="mt-3 text-sm text-slate-650 my-0">
            {error}
          </p>

          <button
            type="button"
            onClick={reload}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 text-sm font-semibold text-white border-none cursor-pointer"
          >
            <RefreshCcw size={17} />
            Tentar novamente
          </button>
        </div>
      </HomeLayout>
    );
  }

  const config =
    CHECKOUT_RESULT_CONFIG[
      result.payment.status
    ] ||
    CHECKOUT_RESULT_CONFIG.failed;

  const StatusIcon =
    config.icon;

  const isPixPending =
    result.payment.method === "pix" &&
    result.payment.status === "pending";

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-9 lg:px-8 select-none text-left">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 text-decoration-none"
        >
          <ArrowLeft size={17} />
          Voltar ao início
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-9">
          <div
            className={[
              "mx-auto flex h-20 w-20 items-center justify-center rounded-full",
              config.iconClassName,
            ].join(" ")}
          >
            <StatusIcon size={38} />
          </div>

          <span
            className={[
              "mt-5 inline-flex rounded-full border px-3 py-1 text-xs font-bold",
              config.badgeClassName,
            ].join(" ")}
          >
            {config.badgeLabel}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-955 sm:text-4xl my-0">
            {config.title}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base my-0">
            {config.description}
          </p>

          <div className="mx-auto mt-5 flex max-w-xl items-start justify-center gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <Mail
              size={18}
              className="mt-0.5 shrink-0 text-emerald-700"
            />

            <p className="my-0">
              As informações do pedido foram enviadas para{" "}
              <strong className="text-slate-800">
                {result.customer.email}
              </strong>
              .
            </p>
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            {isPixPending && (
              <PixPendingPanel
                payment={
                  result.payment
                }
                onExpire={reload}
              />
            )}

            <PurchaseOrderSummary
              result={result}
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <PurchasePaymentSummary
              payment={
                result.payment
              }
            />

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-955 my-0">
                Próximos passos
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-655 my-0">
                {result.payment.status ===
                "approved"
                  ? "Seus ingressos já estão disponíveis na área de pedidos."
                  : result.payment.status ===
                      "pending"
                    ? "Aguarde a confirmação do pagamento para acessar os ingressos."
                    : "Revise o pagamento e tente novamente."}
              </p>

              <div className="mt-5">
                <PurchaseActions
                  result={result}
                />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </HomeLayout>
  );
}
