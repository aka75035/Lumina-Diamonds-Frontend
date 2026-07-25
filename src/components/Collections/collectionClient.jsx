"use client";
import React, { useState } from "react";

import CollectionGrid from "../Collections/collectionGrid";

export default function CollectionClient({ intialCollections = [] }) {
  // Accept either an array or an object containing a collections array.
  const collections = Array.isArray(intialCollections) ? intialCollections : (intialCollections?.collections ?? []);

  // const [collections, setCollections] = useState(initial);

  return (
    <div className="w-full">
    <div className="lg:flex gap-5 overflow-hidden"> 
      <div className="lg:w-full p-5 overflow-y-auto lg:p-2">
        <CollectionGrid collections={Array.isArray(collections) ? collections : []} />        
      </div>
    </div>   
    </div>
  );
}