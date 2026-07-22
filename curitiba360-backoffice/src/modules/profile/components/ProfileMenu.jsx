import React from "react";
import {
  profileMenuSections,
} from "../constants/profileMenu";

import ProfileMenuItem from "./ProfileMenuItem";

export default function ProfileMenu() {
  return (
    <section className="space-y-5 select-none text-left">
      {profileMenuSections.map(
        (section) => (
          <div
            key={section.id}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <h2 className="px-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-500 my-0 mb-3">
              {section.title}
            </h2>

            <div className="mt-3 space-y-1">
              {section.items.map(
                (item) => (
                  <ProfileMenuItem
                    key={item.id}
                    item={item}
                  />
                )
              )}
            </div>
          </div>
        )
      )}
    </section>
  );
}
