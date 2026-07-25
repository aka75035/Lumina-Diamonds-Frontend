"use client";

import React from "react";
import CollectionCard from "./collectionCard";

export default function CollectionGrid({ collections = [] }) {

  return (

    <div className="w-full px-4 overflow-hidden">

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">

        {collections && collections.length ? (

          collections.map((collection, index) => (

            <CollectionCard
              key={collection.id ?? collection._id ?? index}
              collection={collection}
            />

          ))

        ) : (

          <div className="p-6 text-center">
            No Collections found.
          </div>

        )}

      </div>

    </div>

  );
}