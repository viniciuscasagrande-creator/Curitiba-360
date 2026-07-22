import React from "react";
import MapResultCard from "./MapResultCard";

export default function MapResultsPanel({
  items,
  selectedItem,
  onSelectItem,
}) {
  return (
    <aside className="space-y-3 lg:max-h-[calc(100vh-190px)] lg:overflow-y-auto lg:pr-2 select-none">
      {items.map((item) => (
        <MapResultCard
          key={item.id}
          item={item}
          selected={
            selectedItem?.id ===
            item.id
          }
          onSelect={onSelectItem}
        />
      ))}
    </aside>
  );
}
