// components/cart/MobileCart.jsx

"use client";

import {
  handleDelete,
  handleMinus,
  handlePlus,
} from "../../utils/cart-functions";

export default function MobileCartItem({
  product,
  index,
  cart,
  setCart,
  loggedIn,
  user,
}) {
  console.log(user);
  return (
    <div className="lg:hidden flex flex-col text-sm sm:text-base md:text-lg transition-all">

      <div className="border border-gray-200 mb-2">

        <div className="mb-2 flex flex-row gap-2">

          <div className="w-1/3">
            <img
              className="w-full aspect-square object-cover"
              src={product.image || ""}
              alt={product.title}
            />
          </div>

          <div className="flex-1">

            <div className="w-full flex flex-col">

              <span className="text-xl sm:text-2xl md:text-3xl font-semibold">
                {product.title}
              </span>

              <div className="mt-1">
                <span className="mr-2">Product Id:</span>
                <span>{product.sku}</span>
              </div>

              <div className="flex-1 mt-4">

                <div className="text-xl sm:text-2xl md:text-3xl font-bold">

                  ₹
                  {(
                    (Number(product.salePrice) || 0) *
                    (product.quantity ?? 1)
                  ).toLocaleString()}

                </div>

                <div className="text-sm text-gray-500">

                  ₹{Number(product.salePrice || 0).toLocaleString()} each

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="flex pt-1">

          <div className="flex bg-gray-200 py-1 px-2 items-center">

            Metal

          </div>

          <div className="flex-1 flex items-center justify-center text-center px-2">

            <span>

              {product.customizations?.Material || "-"}{" "}
              {product.customizations?.Purity || ""}

            </span>

          </div>

          <div className="w-[140px] flex gap-2">

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

            <div className="flex items-center justify-center px-2">

              {product.quantity ?? 1}

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

      </div>

      <div className="flex my-2 border-y border-gray-200">

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

        <button className="pl-2 flex-1 flex justify-center items-center text-sm">

          Add to Wishlist

          <span className="text-xs pl-1">

            (Need to Login)

          </span>

        </button>

      </div>

      <div className="flex bg-gray-200 p-4 border border-gray-400 my-2">

        <span className="flex-1 text-center">

          30-Day Returnable

        </span>

        <span className="flex-1 text-center">

          Free & Insured Delivery

        </span>

      </div>

    </div>
  );
}