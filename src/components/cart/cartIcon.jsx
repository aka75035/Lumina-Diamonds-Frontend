"use client";

import useCartCount from "../../hooks/useCartCount";
import cartIcon from "../../assets/cart.png";

import { handlefetchCart } from "../../lib/cart";
import { useEffect } from "react";

export default function CartIcon() {
  const cartCount = useCartCount();
  
  return (
    <>
      <a href="/cart" className="relative">

        <img className="w-5" src={cartIcon} alt="cart" />

        {cartCount > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              w-5
              h-5
              flex
              items-center
              justify-center
              rounded-full
            "
          >
            {cartCount}
          </span>
        )}

      </a>
    </>
  );
}