import React from "react";
import {
  Star,
} from "lucide-react";

function RatingStars({
  rating,
}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <Star
          key={index}
          size={15}
          className={
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300"
          }
        />
      ))}
    </div>
  );
}

export default function DetailReviews({
  rating,
  reviewsCount,
  reviews = [],
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left select-none">
      <h2 className="text-xl font-bold text-slate-950 my-0">
        Avaliações
      </h2>

      <div className="mt-5 flex items-center gap-5 rounded-2xl bg-slate-50 p-5">
        <p className="text-4xl font-bold text-slate-950 my-0">
          {rating}
        </p>

        <div>
          <RatingStars
            rating={Math.round(rating)}
          />

          <p className="mt-2 text-sm text-slate-500 my-0">
            {reviewsCount} avaliações
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="border-b border-slate-100 pb-5 last:border-none last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-slate-950 my-0">
                  {review.author}
                </p>

                <p className="mt-1 text-xs text-slate-500 my-0">
                  {review.date}
                </p>
              </div>

              <RatingStars
                rating={review.rating}
              />
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600 my-0">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
