import React from "react";
import { Compass } from "lucide-react";
import SearchResultCard from "../../search/components/SearchResultCard";

export default function DetailRelatedItems({ relatedItems = [] }) {
  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <section className="text-left select-none">
      <div className="flex items-center gap-2 mb-4">
        <Compass className="text-slate-500" size={20} />
        <h2 className="text-xl font-bold text-slate-950 my-0">Você também pode gostar</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {relatedItems.map((item) => (
          <SearchResultCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
