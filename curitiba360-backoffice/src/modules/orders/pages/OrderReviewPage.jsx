import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquarePlus, Star } from "lucide-react";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import { useOrderDetail } from "../hooks/useOrderDetail";

export default function OrderReviewPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    order,
    loading,
    saving,
    error,
    successMessage,
    submitReview,
  } = useOrderDetail(orderId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview({ rating, comment });
      window.setTimeout(() => {
        navigate(`/perfil/pedidos/${orderId}`);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 select-none text-left">
        {/* Top bar */}
        <div className="flex items-start gap-4">
          <Link
            to={`/perfil/pedidos/${orderId}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 text-decoration-none"
            aria-label="Voltar para o pedido"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <MessageSquarePlus size={18} />
              <span className="text-xs uppercase tracking-wider">
                Nova Avaliação
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
              Avaliar Experiência
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 my-0">
              Sua opinião ajuda a melhorar as atrações e experiências de Curitiba.
            </p>
          </div>
        </div>

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
          <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={order?.items[0]?.image}
                alt={order?.items[0]?.title}
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900 my-0">
                  {order?.items[0]?.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 my-0">
                  Realizado em {order?.items[0]?.date ? new Date(order.items[0].date).toLocaleDateString("pt-BR") : ""}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Star Rating selector */}
              <div className="flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sua Nota
                </label>
                <div className="flex items-center gap-1.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const filled = hoverRating ? star <= hoverRating : star <= rating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-slate-300 hover:text-amber-400 hover:scale-110 transition cursor-pointer border-none bg-transparent"
                      >
                        <Star
                          size={32}
                          className={filled ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comment text area */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="comment" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Seu Comentário (opcional)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escreva como foi sua experiência, o que gostou ou sugestões..."
                  rows={4}
                  className="rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <Link
                  to={`/perfil/pedidos/${orderId}`}
                  className="inline-flex h-11 items-center justify-center px-5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition text-decoration-none"
                >
                  Voltar
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center justify-center px-6 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 transition cursor-pointer border-none"
                >
                  {saving ? "Enviando..." : "Enviar Avaliação"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </HomeLayout>
  );
}
