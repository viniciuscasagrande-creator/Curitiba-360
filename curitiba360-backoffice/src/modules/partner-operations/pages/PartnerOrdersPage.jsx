import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Eye } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { getOperationsRepository } from "../repositories/partnerOperationsRepository";
import { PARTNER_ORDER_STATUS } from "../constants/orderStatus";

export default function PartnerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getOperationsRepository();
      // Emulate simple order matching from tickets list
      const grouped = (data.tickets || []).reduce((acc, tkt) => {
        if (!acc[tkt.orderId]) {
          acc[tkt.orderId] = {
            id: tkt.orderId,
            code: tkt.orderId.toUpperCase().replace("-", ""),
            customer: {
              name: tkt.holder.name,
              email: tkt.holder.email,
              phone: "(41) 99999-9999",
            },
            pricing: {
              total: 95.0,
            },
            status: "confirmed",
            createdAt: tkt.createdAt,
          };
        }
        return acc;
      }, {});
      setOrders(Object.values(grouped));
    }
    load();
  }, []);

  const filtered = orders.filter((o) =>
    o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-6xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Operações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Pedidos dos Clientes
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore o status dos pedidos e detalhes dos compradores.
          </p>
        </header>

        <section className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por comprador ou código do pedido..."
            className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
          />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Pedido</th>
                  <th className="px-6 py-4">Comprador</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-bold text-slate-950">{order.code}</td>
                    <td className="px-6 py-4">
                      <div>{order.customer.name}</div>
                      <div className="text-xs text-slate-450 mt-0.5">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4">R$ {order.pricing.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/parceiro/pedidos/${order.id}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-decoration-none transition cursor-pointer"
                      >
                        <Eye size={14} />
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
