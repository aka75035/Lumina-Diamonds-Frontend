"use client";
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], metalData = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
      {products && products.length ? (
        products.map((product, index) => (
          <ProductCard key={product.id ?? product._id ?? index} product={product} metalData={metalData} />
        ))
      ) : (
        <div className="p-6 text-center">No products found.</div>
      )}
    </div>
  );
}
