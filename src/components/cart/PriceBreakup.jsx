"use client";

import { useMemo, useState } from "react";

export default function PriceBreakup({ cart = [], user }) {
  const [paying, setPaying] = useState(false);

  const pricing = useMemo(() => {
    let subtotal = 0;
    let gst = 0;
    
    cart.forEach((item) => {
        const qty = Number(item.quantity) || 1;
        
        subtotal += Math.round((Number(item.salePrice) || 0) * qty);
      gst += (Number(item.gst) || 0) * qty;
    });

    return {
      subtotal,
      gst,
      total: subtotal + gst,
    };
  }, [cart]);

  const formatPrice = (value) =>
    `₹ ${Math.round(Number(value || 0)).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  async function handlePayment() {
    if (!cart.length) {
      alert("Your cart is empty");
      return;
    }

    const shippingAddress = {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      company: user?.company || "",
      country: user?.country || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      pinCode: user?.pinCode || "",
      mobile: user?.mobile || "",
    };

    if (!shippingAddress.firstName || !shippingAddress.mobile) {
      alert("Please save your shipping address first.");
      return;
    }

    setPaying(true);

    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        throw new Error("Unable to load Razorpay");
      }

      const BASE =
        import.meta.env.VITE_BACKEND_API_URL ||
        "http://localhost:8000";

      const response = await fetch(
        `${BASE}/payment/create-order`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shippingAddress,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to create order"
        );
      }

      console.log(data.amount);

      const razorpay = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        name: "Miashka Diamonds",
        description: "Secure Payment",

        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`.trim(),
          contact: shippingAddress.mobile,
          email: user?.email || "",
        },

        theme: {
          color: "#000000",
        },

        handler: async (payment) => {
          const verify = await fetch(
            `${BASE}/payment/verify`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...payment,
                dbOrderId: data.dbOrderId,
              }),
            }
          );

          const verified = await verify.json();

          if (!verify.ok || !verified.success) {
            alert(
              verified.message ||
                "Payment verification failed."
            );
            return;
          }

          alert("Payment Successful");
          window.location.href = "/";
        },

        modal: {
          ondismiss: async () => {
            await fetch(
              `${BASE}/payment/failed`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  dbOrderId: data.dbOrderId,
                }),
              }
            );
          },
        },
      });

      razorpay.open();
    } catch (err) {
      console.error(err);
      alert(err.message || "Payment failed.");
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 border p-6">

      <h2 className="text-xl font-semibold">
        Order Summary
      </h2>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatPrice(pricing.subtotal)}</span>
      </div>

      <div className="flex justify-between">
        <span>GST (3%)</span>
        <span>{formatPrice(pricing.gst)}</span>
      </div>

      <hr />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{formatPrice(pricing.total)}</span>
      </div>

      <button
        onClick={handlePayment}
        disabled={!cart.length || paying}
        className="mt-5 bg-black text-white py-3 hover:bg-gray-800 disabled:opacity-50"
      >
        {paying ? "Opening Razorpay..." : "Place Order"}
      </button>

    </div>
  );
}