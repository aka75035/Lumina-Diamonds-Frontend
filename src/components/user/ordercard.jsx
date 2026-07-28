import { Eye, Truck, CalendarDays, Receipt } from "lucide-react";

export default function OrderCard({
    order,
    setView,
    setSelectedOrder,
}) {
    const statusColor = {
        Delivered: "bg-green-100 text-green-700",
        Shipped: "bg-blue-100 text-blue-700",
        Processing: "bg-yellow-100 text-yellow-700",
        Cancelled: "bg-red-100 text-red-700",
        Pending: "bg-orange-100 text-orange-700",
    };

    return (
        <div className="group overflow-hidden rounded-3xl border border-[#ECE6DE] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Gold Accent */}
            <div className="h-1 w-full bg-[#B88A44]" />

            <div className="p-6 lg:p-8">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}
                    <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-xl font-semibold text-[#181818]">
                                Order #{order.orderNumber}
                            </h2>

                            <span
                                className={`rounded-full px-4 py-1 text-xs font-semibold ${
                                    statusColor[order.orderStatus] ||
                                    "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {order.orderStatus}
                            </span>

                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">

                            <div className="flex items-center gap-3">

                                <div className="rounded-full bg-[#F8F5F2] p-2">
                                    <CalendarDays size={18} className="text-[#B88A44]" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Order Date
                                    </p>

                                    <p className="font-medium">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="rounded-full bg-[#F8F5F2] p-2">
                                    <Receipt size={18} className="text-[#B88A44]" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Total Amount
                                    </p>

                                    <p className="text-xl font-bold text-[#181818]">
                                        ₹{order.amount}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            onClick={() => {
                                setSelectedOrder(order);
                                setView("details");
                            }}
                            className="flex items-center justify-center gap-2 rounded-full border border-[#181818] px-6 py-3 font-medium transition-all duration-300 hover:bg-[#181818] hover:text-white"
                        >
                            <Eye size={18} />
                            View Details
                        </button>

                        <button
                            onClick={() => {
                                setSelectedOrder(order);
                                setView("tracking");
                            }}
                            className="flex items-center justify-center gap-2 rounded-full bg-[#181818] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#B88A44]"
                        >
                            <Truck size={18} />
                            Track Order
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}