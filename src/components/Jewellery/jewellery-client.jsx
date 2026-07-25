// components/Jewellery/jewellery-client.jsx

"use client";

import {useState,} from "react";

import Filters from "../Filter/filters";

import ProductGrid from "../ProductGrid/product-grid";

import BreadCrumbs from "../breadcrumbs";


export default function JewelleryClient({ initialProducts = [], metalData= [], forBreadCrumbs=[], filterData=[], searchParams, setSearchParams}) {

  const [products, setProducts] = useState(initialProducts);

  return (

    <div className="w-full">

      {/* DESKTOP */}

      <div className=" hidden lg:flex gap-5 h-screen overflow-hidden">

        {/* SIDEBAR */}

        <div className=" w-1/5 h-full overflow-y-auto border-r p-2">

          <Filters onApply={setProducts} products={products} forFilter={filterData} searchParams={searchParams} setSearchParams={setSearchParams} />

        </div>

        {/* PRODUCTS */}

        <div className=" w-4/5 h-full overflow-y-auto p-2 ">

          <div className="p-2"> <BreadCrumbs forBreadCrumbs={forBreadCrumbs} /> </div>

          <ProductGrid products={products} products={products} metalData={metalData}/>

        </div>

      </div>

      {/* MOBILE */}

      <div className=" lg:hidden p-5 ">

        {/* <Filters onApply={setProducts} /> */}

        <div className="p-2"> <BreadCrumbs forBreadCrumbs={forBreadCrumbs}/> </div>

        <ProductGrid products={products} metalData={metalData}/>

      </div>

    </div>

  );
}