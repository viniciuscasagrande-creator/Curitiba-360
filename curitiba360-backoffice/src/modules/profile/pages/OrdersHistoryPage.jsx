import React, { useState } from "react";
import { ArrowLeft, Calendar, Ticket, CreditCard, ChevronRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

const MOCK_ORDERS = [
  {
    id: "order-1",
    code: "CTB360-1024",
    status: "confirmed",
    statusLabel: "Confirmado",
    createdAt: "2026-07-22T10:00:00.000Z",
    eventDate: "18 de agosto de 2026",
    paymentMethod: "Pix",
    items: [
      {
        itemId: "festival-gastronomico",
        title: "Festival Gastronômico de Curitiba",
        image: "/centro_historico.jpg",
        quantity: 2,
        unitPrice: 39.90,
      },
    ],
    total: 79.80,
  },
  {
    id: "order-2",
    code: "CTB360-0982",
    status: "completed",
    statusLabel: "Concluído",
    createdAt: "2026-06-12T15:30:00.000Z",
    eventDate: "15 de junho de 2026",
    paymentMethod: "Cartão de Crédito",
    items: [
      {
        itemId: "tour-historico",
        title: "Tour Histórico pelo Centro",
        image: "/centro_historico.jpg",
        quantity: 1,
        unitPrice: 29.90,
      },
    ],
    total: 29.90,
  },
  {
    id: "order-3",
    code: "CTB360-0873",
    status: "cancelled",
    statusLabel: "Cancelado",
    createdAt: "2026-05-05T09:12:00.000Z",
    eventDate: "10 de maio de 2026",
    paymentMethod: "Google Pay",
    items: [
      {
        itemId: "jardim-botanico-guiado",
        title: "Jardim Botânico (Tour Guiado)",
        image: "/jardim_botanico.jpg",
        quantity: 4,
        unitPrice: 15.00,
      },
    ],
    total: 60.00,
  },
];

const STATUS_FILTERS = [
  { value: "all", label: "Todos" },
  { value: "confirmed", label: "Confirmados" },
  { value: "pending", label: "Pendentes" },
  { value: "cancelled", label: "Cancelados" },
  { value: "completed", label: "Concluídos" },
];

export default function OrdersHistoryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeFilter === "all") return true;
    return order.status === activeFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const handleActionClick = (action, code) => {
    alert(`Ação "${action}" para o pedido #${code} simulada com sucesso!`);
  };

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        <div className="flex items-center gap-3">
          <Link
            to="/perfil"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition text-decoration-none"
            aria-label="Voltar para o perfil"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-950 my-0">
            Meus Pedidos
          </h1>
        </div>

        {/* Abas de Filtro */}
        <section className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={[
                "h-9 shrink-0 rounded-xl px-4 text-xs font-semibold border transition cursor-pointer",
                activeFilter === filter.value
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
              ].join(" ")}
            >
              {filter.label}
            </button>
          ))}
        </section>

        {/* Lista de Pedidos */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-slate-500 my-0">
              Nenhum pedido encontrado para o status selecionado.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Header do Card */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-3 text-xs font-semibold text-slate-500">
                  <span>Pedido #{order.code}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getStatusColor(order.status)}`}>
                    {order.statusLabel}
                  </span>
                </div>

                {/* Corpo do Card */}
                <div className="p-5 flex flex-col md:flex-row gap-4 items-start">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 flex-1">
                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-slate-950 my-0 line-clamp-1">
                          {item.title}
                        </h3>
                        
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={13} />
                            {order.eventDate}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Ticket size={13} />
                            {item.quantity} ingresso{item.quantity > 1 ? "s" : ""}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <CreditCard size={13} />
                            {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Preço e Ações */}
                  <div className="w-full md:w-auto md:text-right flex md:flex-col justify-between items-center md:items-end border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 my-0">
                        Total Pago
                      </p>
                      <p className="mt-0.5 text-lg font-black text-slate-950 my-0">
                        R$ {order.total.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer do Card */}
                <div className="flex border-t border-slate-100 bg-slate-50/20">
                  <button
                    type="button"
                    onClick={() => handleActionClick("Ver pedido", order.code)}
                    className="flex-1 h-10 text-xs font-semibold text-slate-600 hover:bg-slate-50 border-none bg-transparent border-r border-slate-100 cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    <FileText size={14} />
                    Ver pedido
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActionClick("Acessar ingresso", order.code)}
                    className="flex-1 h-10 text-xs font-semibold text-emerald-700 hover:bg-slate-50 border-none bg-transparent cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    <Ticket size={14} />
                    Acessar ingresso
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
