"use client";

import React from "react";
import CategoryCard from "./categoryCard";

export default function CategoryGrid({
  categories = [],
  view = false
}) {

  const large = `
    grid
    grid-cols-2
    sm:grid-cols-4
    lg:grid-cols-6
    gap-6
  `;

  const mobileView = ` grid grid-rows-2 grid-flow-col auto-cols-[140px] gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 `;

  return (

    <div className="w-full px-4 overflow-hidden">

      <div className={view ? mobileView : large}>

        {categories.map((category, index) => (

          <div
            key={category.id ?? category._id ?? index}
            className="snap-start"
          >

            <CategoryCard category={category} />

          </div>

        ))}

      </div>

    </div>

  );
}