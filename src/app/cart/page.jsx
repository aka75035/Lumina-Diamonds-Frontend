// app/cart/page.jsx

"use client";

import { useEffect, useState } from "react";

import PriceBreakup from "../../components/cart/PriceBreakup";
import CartItem from "../../components/cart/DesktopCart";
import MobileCartItem from "../../components/cart/MobileCart";
import useAuth from "../../hooks/useAuth";
import { handlefetchCart } from "../../lib/cart";

export default function Cart() {
  const {loggedIn, user} = useAuth();
  
  const [cart, setCart] = useState([]);
  
  useEffect(() => {

  if (!loggedIn) {
    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);
    return;
  }

  if (!user) return;

  async function fetchCart() {
    const data = await handlefetchCart(user);

    setCart(data || []);
  }

  fetchCart();

  }, [loggedIn, user]);



  return (
    <div className="flex lg:flex-row flex-col">

      <div className="lg:w-2/3 lg:p-10 px-5 py-5 lg:border-r">

        <h1 className="text-3xl font-bold mb-5">
          My Cart
        </h1>

        <div className="flex flex-col gap-6">

          {cart.length === 0 ? (

            <p>Cart is empty</p>

          ) : (

            cart.map((product, index) => (
            <div key={`${product.product_id}-${index}`}>
              <CartItem
                product={product}
                index={index}
                cart={cart}
                setCart={setCart}
                loggedIn={loggedIn}
                user={user}
              />

              <MobileCartItem
                product={product}
                index={index}
                cart={cart}
                setCart={setCart}
                loggedIn={loggedIn}
                user={user}
              />
            </div>
            ))

          )}

        </div>

      </div>
      <div className="w-full lg:block lg:w-1/3 lg:p-10 px-5 py-5 border-t-1 lg:border-0">

        <PriceBreakup cart={cart} user={user} />

      </div>
      


    </div>
  );
}