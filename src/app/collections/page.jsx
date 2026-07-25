import React, { Suspense, useEffect, useState } from "react";
// import { fetchProductsWithRates } from "@/lib/api";
import CollectionClient from "../../components/Collections/collectionClient";

import BreadCrumbs from "../../components/breadcrumbs";
import { getAllCollections } from "../../lib/api";

export default function CollectionPage() {

  const [collections, setCollections] = useState();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
      async function fetch() {
  
        try {
  
          const data = await getAllCollections();
  
          setCollections(data);
  
        } catch (error) {
  
          console.log(error);
  
        } finally {
  
          setLoading(false);
  
        }
  
      }
  
      fetch();
  
    }, []);

    if (loading) {

      return (
        <div className="py-6">
          Loading products...
        </div>
      );

    }

  return (
    <>
      <div className="lg:pl-10 pl-[22px] pt-2">
        <BreadCrumbs />
      </div>
      <h1 className="text-4xl block text-center p-2 ">Our Collection</h1>
      <Suspense fallback={<div className="-py-6">Loading products...</div>}>
        <CollectionClient intialCollections={collections} />
      </Suspense>
    </>
  );
}
