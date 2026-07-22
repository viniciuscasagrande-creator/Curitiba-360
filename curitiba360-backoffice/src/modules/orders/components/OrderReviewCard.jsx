import React from "react";
import { Link } from "react-router-dom";
import { Star, MessageSquare } from "lucide-react";

export default function OrderReviewCard({ order = {} }) {
  const review = order.review || {};

  if (!review.allowed && !review.submitted) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
          <Star size={18} className="fill-amber-500 text-amber-500" />
        </div>
        <h2 className="text-base font-bold text-slate-900 my-0">
          Avaliação da Experiência
        </h2>
      </div>

      {review.submitted ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                size={16}
                className={idx < (review.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
              />
            ))}
            <span className="ml-2 text-xs font-bold text-slate-500">
              {review.rating} / 5
            </span>
          </div>
          {review.comment && (
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic my-0">
              "{review.comment}"
            </p>
          )}
        </div>
      ) : (
        <div>
          <p className="text-xs text-slate-500 my-0 leading-5">
            Você já participou desta experiência. Deixe sua avaliação para ajudar outros turistas!
          </p>
          <Link
            to={`/perfil/pedidos/${order.id}/avaliar`}
            className="mt-3.5 w-full inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white transition text-decoration-none"
          >
            <MessageSquare size={14} />
            Avaliar Agora
          </Link>
        </div>
      )}
    </section>
  );
}
