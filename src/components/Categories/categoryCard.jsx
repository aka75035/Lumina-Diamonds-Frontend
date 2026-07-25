import React from "react";

export default function CategoryCard({ category = {} }) {

  const img = category?.image || "";
  const name = category?.name || "";

  return (
    <div>
    <div className="w-full bg-white overflow-hidden rounded-md ">
      <a href={`/jewellery?category=${category?.slug}`} className="block">
      <img src={img} alt={name} className=" w-full aspect-square object-cover transition-all duration-100 hover:opacity-85" />
      </a>

    </div>  
      <div className=" flex text-center justify-center text-black text-lg froont-medium">
        {name}
      </div>
    </div>

  );
}