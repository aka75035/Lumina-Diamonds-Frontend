// components/cart/DesktopCart.jsx

"use client";

import {
  handleDelete,
  handleMinus,
  handlePlus,
} from "../../utils/cart-functions";

export default function CartItem({
  product,
  index,
  cart,
  setCart,
  loggedIn,
  user,
}) {
  const quantity = product.quantity ?? 1;
  const salePrice = Math.round(Number(product.salePrice)) || 0;
  const total = Math.round(salePrice * quantity);

  return (
    <div className="hidden lg:block">

      <div className="mb-4 flex flex-row gap-5">

        <div>
          <img
            className="w-[250px] h-[250px] object-cover"
            src={product.image ?? ""}
            alt={product.title}
          />
        </div>

        <div className="flex-1">

          <div className="flex flex-col">

            <div className="flex border border-gray-200 border-b-0">

              <div className="flex flex-col w-3/4 gap-3 pl-5 pt-2">

                <span className="text-4xl font-semibold">
                  {product.title}
                </span>

                <div>

                  <span className="mr-2 font-medium">
                    Product ID:
                  </span>

                  <span>{product.sku}</span>

                </div>

              </div>

              <div className="flex-1 text-2xl pl-5 pt-2">

                ₹{total.toLocaleString()}

                <div className="text-sm text-gray-500 mt-1">

                  ₹{salePrice.toLocaleString()} each

                </div>

              </div>

            </div>

            <div className="flex border border-gray-200 border-t-0 pt-3">

              <div className="bg-gray-200 p-2 px-5">
                Metal
              </div>

              <div className="flex-1 flex items-center justify-center">

                <span className="mx-2">

                  {product.customizations?.Material || "-"}

                </span>

                <span>

                  {product.customizations?.Purity || ""}

                </span>

              </div>

              <div className="w-[160px] flex gap-4">

                <button
                  onClick={() =>
                    handlePlus(
                      cart,
                      setCart,
                      index,
                      loggedIn,
                      user
                    )
                  }
                  className="p-2 px-5 flex-1 bg-gray-200 active:scale-90 transition"
                >
                  +
                </button>

                <div className="flex items-center px-2">

                  {quantity}

                </div>

                <button
                  onClick={() =>
                    handleMinus(
                      cart,
                      setCart,
                      index,
                      loggedIn,
                      user
                    )
                  }
                  className="p-2 px-5 flex-1 bg-gray-200 active:scale-90 transition"
                >
                  -
                </button>

              </div>

            </div>

            <div className="flex mt-10 border-y border-gray-200">

              <button
                onClick={() =>
                  handleDelete(
                    cart,
                    setCart,
                    index,
                    loggedIn,
                    user
                  )
                }
                className="w-[100px] border-r border-gray-200 py-2"
              >
                Remove
              </button>

              <button className="pl-2">

                Add to Wishlist

                <span className="text-xs pl-1">

                  (Need to Login)

                </span>

              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="flex bg-gray-200 p-4 border border-gray-400">

        <span className="flex-1 flex justify-center items-center">

          30-Day Returnable

        </span>

        <span className="flex-1 flex justify-center items-center">

          Free & Insured Delivery

        </span>

      </div>

    </div>
  );
}