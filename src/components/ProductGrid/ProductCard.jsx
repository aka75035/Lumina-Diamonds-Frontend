import React, { useMemo, useState } from "react";
import wishlist from "../../assets/wishlist.png";
import { handleAddToCart } from "../../utils/cart-functions";
import { pricedetails } from "../../utils/functions";
import useAuth from "../../hooks/useAuth";

function ProductCard({ product, metalData }) {
  const { loggedIn, user } = useAuth();
  console.log(loggedIn, user);

  const [formData] = useState({
    selectedMaterial:
      product?.customizationFields?.materials?.[0] ||
      product?.metalType ||
      "Gold",

    selectedPurity:
      product?.customizationFields?.purities?.[0] ||
      product?.purity ||
      "18K",
  });
  
  const pricing = useMemo(() => {
    return pricedetails(formData, metalData, product);
  }, [formData, metalData, product]);
  console.log('Pricing',pricing)

  const {
    selectedMaterialNotNormalize,
    selectedPurity,
    subtotal,
    gst,
    total,
  } = pricing;

  const image =
    product?.images?.[0] || "/placeholder-product.jpg";

  const price =
    total != null
      ? `₹ ${Math.round(total).toLocaleString("en-IN")}`
      : "Price on Request";

  return (
    <div className="relative w-full bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <a
        href={`/jewellery/${product?._id}`}
        className="block"
      >
        <img
          src={image}
          alt={product?.title || "Jewellery"}
          className="w-full aspect-square object-cover"
        />

        <div className="px-5 py-3">
          <span className="block truncate text-black">
            {product?.title}
          </span>

          <div className="mt-4">
            <span className="text-xl font-bold">
              {price}
            </span>
          </div>
        </div>
      </a>

      <button className="absolute top-2 left-2 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition">
        <img
          src={wishlist}
          alt="Wishlist"
          className="w-4 h-4"
        />
      </button>

      <div className="px-5 pb-5">
        <button
          className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          onClick={async () => {
            const result = await handleAddToCart(
              product,
              selectedMaterialNotNormalize,
              selectedPurity,
              subtotal,
              gst,
              loggedIn,
              user
            );
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;