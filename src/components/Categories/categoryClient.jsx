"use client";
import React, { useState } from "react";

import CategoryGrid from "./categoryGrid";

export default function CategoryClient({ intialCategories = [] }) {
  // Accept either an array or an object containing a categories array.
  const categories = Array.isArray(intialCategories) ? intialCategories: (intialCategories?.categories ?? []);

  // const [categories, setCategories] = useState(initial);

  return (
    <div className="w-full">
    <div className="hidden lg:flex gap-5 overflow-hidden"> 
      <div className="lg:w-full p-5 h-full overflow-y-auto lg:p-2">
        <CategoryGrid categories={Array.isArray(categories) ? categories : []} />        
      </div>
    </div>
    <div className="lg:hidden flex gap-5 overflow-hidden"> 
      <div className="lg:w-full p-5 h-full overflow-y-auto lg:p-2">
        <CategoryGrid categories={Array.isArray(categories) ? categories : []} view= {true} />        
      </div>
    </div>
    </div>
  );
}