import { useState } from "react";
import { Home, MapPinned } from "lucide-react";
import BillingAddressForm from "./Addressform/billingaddress";
import ShippingAddressForm from "./Addressform/shippingaddress";

export default function Addresses({
    user,
    setUser,
    setFormData,
}) {
    const [address, setAddress] = useState("Billing Address");

    return (
        <div className="space-y-8">

            {/* Header */}

            <div className="rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2] p-8">

                <p className="text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">
                    LUMINA
                </p>

                <h1 className="mt-3 font-serif text-3xl md:text-4xl text-[#181818]">
                    Saved Addresses
                </h1>

                <p className="mt-3 max-w-2xl text-gray-600 leading-7">
                    Manage your billing and shipping addresses for a faster and
                    smoother checkout experience.
                </p>

            </div>

            {/* Address Switch */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <button
                    onClick={() => setAddress("Billing Address")}
                    className={`group rounded-3xl border p-6 text-left transition-all duration-300 ${
                        address === "Billing Address"
                            ? "border-[#B88A44] bg-[#181818] text-white shadow-xl"
                            : "border-[#ECE6DE] bg-white hover:-translate-y-1 hover:border-[#B88A44]"
                    }`}
                >
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full ${
                            address === "Billing Address"
                                ? "bg-white/10"
                                : "bg-[#F8F5F2]"
                        }`}
                    >
                        <Home
                            size={26}
                            className={
                                address === "Billing Address"
                                    ? "text-white"
                                    : "text-[#B88A44]"
                            }
                        />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold">
                        Billing Address
                    </h2>

                    <p
                        className={`mt-2 text-sm ${
                            address === "Billing Address"
                                ? "text-gray-300"
                                : "text-gray-500"
                        }`}
                    >
                        Used for invoices and billing information.
                    </p>
                </button>

                <button
                    onClick={() => setAddress("Shipping Address")}
                    className={`group rounded-3xl border p-6 text-left transition-all duration-300 ${
                        address === "Shipping Address"
                            ? "border-[#B88A44] bg-[#181818] text-white shadow-xl"
                            : "border-[#ECE6DE] bg-white hover:-translate-y-1 hover:border-[#B88A44]"
                    }`}
                >
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full ${
                            address === "Shipping Address"
                                ? "bg-white/10"
                                : "bg-[#F8F5F2]"
                        }`}
                    >
                        <MapPinned
                            size={26}
                            className={
                                address === "Shipping Address"
                                    ? "text-white"
                                    : "text-[#B88A44]"
                            }
                        />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold">
                        Shipping Address
                    </h2>

                    <p
                        className={`mt-2 text-sm ${
                            address === "Shipping Address"
                                ? "text-gray-300"
                                : "text-gray-500"
                        }`}
                    >
                        Used for secure delivery of your jewellery.
                    </p>
                </button>

            </div>

            {/* Form */}

            <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6 md:p-8 shadow-sm">

                {address === "Billing Address" && (
                    <BillingAddressForm
                        user={user}
                        setUser={setUser}
                        setFormData={setFormData}
                    />
                )}

                {address === "Shipping Address" && (
                    <ShippingAddressForm
                        user={user}
                        setUser={setUser}
                    />
                )}

            </div>

        </div>
    );
}