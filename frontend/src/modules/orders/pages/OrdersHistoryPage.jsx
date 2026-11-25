import React from "react";
import {
  ArrowLeft,
  RefreshCcw,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import OrderCard from "../components/OrderCard";
import OrdersFilters from "../components/OrdersFilters";

import {
  useOrders,
} from "../hooks/useOrders";

export default function OrdersHistoryPage() {
  const {
    orders,
    filters,
    loading,
    error,
    setFilters,
    reload,
  } = useOrders();

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 select-none text-left">
        <header className="flex items-start gap-4">
          <Link
            to="/perfil"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <div className="flex items-center gap-2 text-emerald-700">
              <ShoppingBag size={18} />

              <span className="text-sm font-semibold uppercase tracking-[0.14em]">
                Minha conta
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
              Minhas compras
            </h1>

            <p className="mt-2 text-sm text-slate-600 my-0">
              Consulte pedidos, ingressos, comprovantes e solicitações.
            </p>
          </div>
        </header>

        <OrdersFilters
          filters={filters}
          onChange={setFilters}
        />

        {error && (
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-705 my-0">
              {error}
            </p>

            <button
              type="button"
              onClick={reload}
              className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white cursor-pointer border-none"
            >
              <RefreshCcw size={16} />
              Tentar novamente
            </button>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-3xl bg-slate-100"
                />
              )
            )}
          </div>
        )}

        {!loading &&
          orders.length === 0 && (
            <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <ShoppingBag size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-955 my-0">
                Nenhum pedido encontrado
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 my-0">
                Ajuste os filtros ou explore novas experiências em Curitiba.
              </p>

              <Link
                to="/buscar"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white text-decoration-none hover:bg-emerald-800 transition"
              >
                Explorar experiências
              </Link>
            </section>
          )}

        {!loading &&
          orders.length > 0 && (
            <section className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))}
            </section>
          )}
      </div>
    </HomeLayout>
  );
}
