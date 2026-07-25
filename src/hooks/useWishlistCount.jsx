import { useEffect, useState } from "react";

export default function useWishlistCount() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    const syncWishlist = () => {

      const updatedWishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

      let q = 0;

      updatedWishlist.forEach((item) => {
        q += item.quantity || 1;
      });

      setCount(q);

    };

    syncWishlist();

    window.addEventListener(
      "wishlistUpdated",
      syncWishlist
    );

    return () => {

      window.removeEventListener(
        "wishlistUpdated",
        syncWishlist
      );

    };

  }, []);

  return count;
}