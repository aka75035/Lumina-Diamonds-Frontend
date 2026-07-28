import React from "react";

export default function CollectionCard({ collection = {} }) {

  const img = collection?.image || "";
  const name = collection?.name || "";

  return (

    <div className=" w-full bg-white  overflow-hidden hover:shadow-xl transition-all duration-300 ">
      <a href={`/product?collection=${collection?.slug}`} className="block">

      <img src={img} alt={name} className=" w-full aspect-square object-cover " />

      <div className="px-4 py-3">

        <div className="text-black text-lg font-medium text-center">
          {name}
        </div>

      </div>
      </a>
    </div>

  );
}