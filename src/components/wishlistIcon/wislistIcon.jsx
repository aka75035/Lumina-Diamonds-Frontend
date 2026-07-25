"use client";

import wishlistIcon from "../../assets/wishlist.png";

export default function WishlistIcon() {
  const wishCount = 0
  return (
    <>
      <a href="/cart" className="relative">

        <img className="w-5" src={wishlistIcon} alt="wishlist" />

        {wishCount > 0 && (
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
            {wishCount}
          </span>
        )}

      </a>
    </>
  );
}