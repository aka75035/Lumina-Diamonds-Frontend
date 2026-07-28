"use client";

import { useEffect, useState } from "react";
import { getMetalRates } from "../lib/api";
import {  pricedetails } from "../utils/functions";

export default function PriceBreakup({pricing, product, }) {

  const {

    selectedMaterial,

    selectedPurity,

    metalPrice,

    stonePrice,

    makingCharges,

    subtotal,

    gst,

    total,

  } = pricing;

  return (

  <div className="mt-6 border overflow-hidden">

    {/* HEADER */}

    <div className="px-6 py-4 border-b bg-gray-50">
      <h2 className="text-2xl font-semibold">Price Breakup</h2>
      <p className="text-sm text-gray-500 mt-1">Detailed pricing information</p>
    </div>

    {/* BODY */}

    <div className="p-6 space-y-4">

      {/* METAL */}
      {metalPrice  > 0 && (
      <div className="flex items-center justify-between pb-3 border-b">
        <div>
          <p className="text-sm text-gray-500">Metal Price</p>
          <h3 className="font-medium text-lg">{selectedMaterial} {" "} ({selectedPurity})</h3>
        </div>
        <span className="font-semibold text-lg">₹ {Math.round(metalPrice)}</span>
      </div>
      )}

      {/* STONE */}
      {product?.stoneType && Number(stonePrice) > 0 && (
        <div className="flex items-center justify-between pb-3 border-b">
          <div>
            <p className="text-sm text-gray-500">Stone Charges</p>
            <h3 className="font-medium">{product?.stoneType}</h3>
          </div>

          <span className="font-semibold">
            ₹ {Math.round(Number(stonePrice)).toLocaleString("en-IN")}
          </span>
        </div>
      )}
      {/* MAKING */}

      {makingCharges > 0 && (
      <div className="flex items-center justify-between pb-3 border-b">
        <div>
          <p className="text-sm text-gray-500">Labour & Craftsmanship</p>
          <h3 className="font-medium">Making Charges</h3>
        </div>
        <span className="font-semibold">₹ {Math.round(makingCharges)}</span>
      </div>
      )}

      <div className="flex items-center justify-between pb-3 border-b">
        <div>
            <p className="text-sm text-gray-500">
                {metalPrice && (`Subtotal`) || ` Product Price `}
            </p>
            <h3 className="font-medium">
                {metalPrice>0 && (`Metal +`)}{stonePrice>0 && (`Stone + `)}{makingCharges>0 && (`Making`)}
            </h3>
        </div>

        <span className="font-semibold">
            ₹ {Math.round(subtotal).toLocaleString("en-IN")}
        </span>
    </div>

      {/* GST */}

      <div className="flex items-center justify-between pb-3 border-b">
        <div>
          <p className="text-sm text-gray-500">Tax Included</p>
          <h3 className="font-medium">GST</h3>
        </div>
        <span className="font-semibold">₹{gst}</span>
      </div>

      {/* TOTAL */}

      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-gray-500">Final Payable Amount</p>
          <h2 className="text-2xl font-bold">Total</h2>
        </div>
        <span className="text-3xl font-bold">₹ {Math.round(total)}</span>
      </div>

    </div>

  </div>

);

}