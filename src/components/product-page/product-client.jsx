"use client";

import { useEffect, useMemo, useState } from "react";

import ImageSection from "./ProductImageLeft";
import ProductDetails from "./product-detail";
import CustomizationFields from "../customization-fields";

import { getMetalRates } from "../../lib/api";
import { pricedetails } from "../../utils/functions";
import { handleAddToCart } from "../../utils/cart-functions";

import useAuth from "../../hooks/useAuth";

export default function ProductClient({ initialProduct }) {

  const { loggedIn, user } = useAuth();

  const product = initialProduct;

  const [formData, setFormData] = useState({});

  const [metalData, setMetalData] = useState([]);

  /*
  =====================================
  Default Customization Values
  =====================================
  */

  useEffect(() => {

    if (!product) return;

    const defaults = {};

    product.customizationFields?.forEach((field) => {

      if (
        !field.dependsOn?.field &&
        field.type === "select" &&
        field.options?.length
      ) {

        defaults[field.name] = field.options[0];

      }

    });

    setFormData((prev) => ({
      ...defaults,
      ...prev,
    }));

  }, [product]);

  /*
  =====================================
  Metal Rates
  =====================================
  */

  useEffect(() => {

    async function loadRates() {

      try {

        const data = await getMetalRates();

        setMetalData(data);

      } catch (err) {

        console.error(err);

      }

    }

    loadRates();

  }, []);
  
  /*
  =====================================
  Single Pricing Engine
  =====================================
  */
    const pricing = useMemo(() => {
  
      return pricedetails(
        formData,
        metalData,
        product
      );
  
    }, [formData, metalData, product]);
    
    const {
   
      selectedMaterialNotNormalize,
   
      selectedPurity,
   
      subtotal,
   
      gst,
   
      total,
   
    } = pricing;
  /*
  =====================================
  Product Missing
  =====================================
  */

  if (!product) {

    return (
      <div className="p-6">
        Product not found.
      </div>
    );

  }



  /*
  =====================================
  Price Display
  =====================================
  */

  const formatPrice = (price) =>
    `₹ ${Math.round(Number(price || 0)).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;

  const displayPrice =
    formatPrice(total);

  /*
  =====================================
  Render
  =====================================
  */

  return (

    <div className="pt-0 pb-5">

      <div className="w-full lg:flex lg:items-start">

        {/* LEFT */}

        <ImageSection img={product.images} />

        {/* RIGHT */}

        <div className="lg:w-1/2 w-full px-4 sm:px-6 lg:pr-16 mt-10 lg:mt-0 lg:py-12">

          <span>

            SKU: {product.sku}

          </span>

          <h1 className="text-4xl mb-2">

            {product.title}

          </h1>

          <div className="mb-6">

            {Number(product.mrp) > Number(total) && (
              <div className="flex items-center gap-3 mb-1">

                <span className="text-gray-500 line-through text-lg">
                  ₹ {Number(product.mrp).toLocaleString("en-IN")}
                </span>

                <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded">
                  {Math.round(
                    ((Number(product.mrp) - Number(subtotal)) / Number(product.mrp)) * 100
                  )}
                  % OFF
                </span>

              </div>
            )}

  <p className="text-3xl font-bold text-stone-700">
    ₹ {Math.round(subtotal).toLocaleString("en-IN")}
  </p>

</div>

          <p className="text-gray-600 mb-4 border-b p-2">

            {product.shortDescription}

          </p>

          <div className="space-y-6">

            <h3 className="text-lg font-medium">

              Customization Options

            </h3>

            <CustomizationFields
              product={product}
              formData={formData}
              setFormData={setFormData}
            />

            <button

              onClick={() =>
                handleAddToCart(

                  product,

                  selectedMaterialNotNormalize,

                  selectedPurity,

                  subtotal,

                  gst,

                  loggedIn,

                  user

                )
              }

              className="w-full bg-black text-white py-3
              hover:opacity-80 active:scale-95
              transition"

            >

              Add To Cart

            </button>

          </div>

        </div>

      </div>

      <div className="p-10 w-2/3">

        <ProductDetails

          formData={formData}

          metalData={metalData}

          product={product}

          pricing={pricing}

        />

      </div>

    </div>

  );

}