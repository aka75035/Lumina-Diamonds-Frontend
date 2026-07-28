import { useEffect, useState } from "react";
import { handlefetchCart } from "../lib/cart";
import useAuth from "./useAuth";

export default function useCartCount() {
  const { loggedIn, user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const syncCart = async () => {
      // Guest cart
      if (!loggedIn) {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        const quantity = localCart.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );

        setCount(quantity);
        return;
      }

      // Wait until user information is available after login.
      if (!user._id) {
        return;
      }

      try {
        const updatedCart = await handlefetchCart(user);

        const quantity = updatedCart.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );

        setCount(quantity);
      } catch (error) {
        console.error("Unable to load cart count:", error);
        setCount(0);
      }
    };

    syncCart();

    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, [loggedIn, user?._id]);

  return count;
}