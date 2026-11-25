import {
  SearchX,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderEmpty({
  hasFilters,
}) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center select-none">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        {hasFilters ? (
          <SearchX size={28} />
        ) : (
          <ShoppingBag size={28} />
        )}
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-950 my-0">
        {hasFilters
          ? "Nenhum pedido encontrado"
          : "Você ainda não possui pedidos"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 my-0">
        {hasFilters
          ? "Ajuste os filtros ou tente outro termo de busca."
          : "Explore eventos, experiências e lugares disponíveis no Curitiba 360."}
      </p>

      {!hasFilters && (
        <Link
          to="/buscar"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white text-decoration-none cursor-pointer border-none"
        >
          Explorar Curitiba
        </Link>
      )}
    </section>
  );
}
