import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Ticket } from "lucide-react";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import TicketCard from "../components/TicketCard";
import TicketQRCodeModal from "../components/TicketQRCodeModal";
import TicketTransferDialog from "../components/TicketTransferDialog";

import { useOrderDetail } from "../hooks/useOrderDetail";
import { transferTicket } from "../services/ordersService";

export default function OrderTicketsPage() {
  const { orderId } = useParams();
  const { order, loading, error, reload } = useOrderDetail(orderId);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [transferringTicket, setTransferringTicket] = useState(null);

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleOpenTransfer = (ticket) => {
    setTransferringTicket(ticket);
  };

  const handleTransferSubmit = async (recipient) => {
    try {
      await transferTicket({
        orderId,
        ticketId: transferringTicket.id,
        recipient,
      });
      window.alert("Ingresso transferido com sucesso!");
      setTransferringTicket(null);
      reload();
    } catch (err) {
      window.alert(err.message || "Erro ao transferir ingresso.");
    }
  };

  // Maps order tickets to include event info
  const ticketsList = order?.tickets?.map((t) => ({
    ...t,
    event: t.event || {
      title: order.items[0]?.title || "Experiência",
      image: order.items[0]?.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      date: order.items[0]?.date || "2026-08-18",
      time: order.items[0]?.time || "18:00",
      location: order.items[0]?.location || "Centro de Eventos Positivo",
    },
  })) || [];

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        <div className="flex items-start gap-4">
          <Link
            to={`/perfil/pedidos/${orderId}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-705 text-decoration-none hover:bg-slate-50 transition"
            aria-label="Voltar para o pedido"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Ticket size={18} />
              <span className="text-xs uppercase tracking-wider">
                Acesso aos Ingressos
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Seus Ingressos
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 my-0">
              Apresente o QR Code impresso ou na tela do celular na entrada da atração.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
            <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
          </div>
        ) : ticketsList.length === 0 ? (
          <div className="text-center py-10 rounded-3xl border border-slate-200 bg-white">
            <p className="text-slate-500 font-semibold my-0">
              Nenhum ingresso disponível para este pedido.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {ticketsList.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onOpen={handleOpenTicket}
                onTransfer={handleOpenTransfer}
              />
            ))}
          </div>
        )}

        {selectedTicket && (
          <TicketQRCodeModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}

        {transferringTicket && (
          <TicketTransferDialog
            ticket={transferringTicket}
            onClose={() => setTransferringTicket(null)}
            onSubmit={handleTransferSubmit}
          />
        )}
      </div>
    </HomeLayout>
  );
}
