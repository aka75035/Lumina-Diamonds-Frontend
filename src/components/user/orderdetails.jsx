import {
    ArrowLeft,
    Truck,
    CalendarDays,
    CreditCard,
    BadgeCheck,
    Hash,
} from "lucide-react";
import { getOrder } from "../../lib/order";
import { useEffect, useState } from "react";

export default function OrderDetails({
    selectedOrder,
    goBack,
    track,
}) {
    const [order, setOrder] = useState(selectedOrder);

    useEffect(() => {
        if (!selectedOrder) return;

        async function fetchOrderDetails(id) {
            const res = await getOrder(id);

            setOrder({
                ...selectedOrder,
                products: res.order.items,
                shippingAddress: res.order.shippingAddress,
                paymentMethod: res.order.paymentMethod,
            });
        }

        fetchOrderDetails(selectedOrder._id);
    }, [selectedOrder]);

    if (!selectedOrder || !order) return null;

    const statusColor = {
        Delivered: "bg-green-100 text-green-700",
        Shipped: "bg-blue-100 text-blue-700",
        Processing: "bg-yellow-100 text-yellow-700",
        Pending: "bg-orange-100 text-orange-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    const formattedDate = new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    ) +
        " • " +
        new Date(order.createdAt).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="space-y-5 sm:space-y-8">

            {/* Header */}

            <div className="rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2] p-5 sm:p-8">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="min-w-0 flex-1">

                        <button
                            onClick={goBack}
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#181818] px-4 py-2 text-sm sm:px-5 sm:text-base transition hover:bg-[#181818] hover:text-white"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-[#B88A44]">
                            MIASHKA
                        </p>

                        <h1 className="mt-3 break-words font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181818]">
                            Order #{order.orderNumber}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">

                            <span
                                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold ${
                                    statusColor[order.orderStatus] ||
                                    "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {order.orderStatus}
                            </span>

                            <span className="rounded-full border border-[#ECE6DE] bg-white px-4 py-2 text-xs sm:text-sm">
                                ₹{order.amount}
                            </span>

                        </div>

                    </div>

                    <button
                        onClick={track}
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#181818] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-white transition hover:bg-[#B88A44]"
                    >
                        <Truck size={18} />
                        Track Order
                    </button>

                </div>

            </div>

            {/* Order Information */}

            <div className="rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white p-5 sm:p-8">

                <h2 className="mb-5 sm:mb-6 font-serif text-xl sm:text-2xl">
                    Order Information
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">

                    <InfoCard
                        icon={<Hash size={18} />}
                        label="Order Number"
                        value={order.orderNumber}
                    />

                    <InfoCard
                        icon={<BadgeCheck size={18} />}
                        label="Payment Status"
                        value={order.paymentStatus}
                    />

                    <InfoCard
                        icon={<CreditCard size={18} />}
                        label="Payment Method"
                        value={order.paymentMethod}
                    />

                    <InfoCard
                        icon={<CalendarDays size={18} />}
                        label="Order Date"
                        value={formattedDate}
                    />

                    <InfoCard
                        icon={<Truck size={18} />}
                        label="Order Status"
                        value={order.orderStatus}
                    />

                    <InfoCard
                        icon={<CreditCard size={18} />}
                        label="Total Amount"
                        value={`₹${order.amount}`}
                    />

                </div>

            </div>

            {/* Products */}

                        <div className="rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white p-5 sm:p-8">

                <h2 className="mb-5 sm:mb-6 font-serif text-xl sm:text-2xl">
                    Jewellery Purchased
                </h2>

                <div className="space-y-4 sm:space-y-6">

                    {order.products?.map((item) => (

                        <a
                            key={item?.product?._id}
                            href={`/jewellery/${item?.product?._id}`}
                            className="flex flex-col gap-4 sm:gap-6 rounded-2xl border border-[#ECE6DE] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row"
                        >

                            {/* Product Image */}

                            <div className="flex justify-center md:block">

                                <img
                                    src={item?.image}
                                    alt={item?.title}
                                    className="h-24 w-24 rounded-2xl border object-cover sm:h-32 sm:w-32"
                                />

                            </div>

                            {/* Product Details */}

                            <div className="min-w-0 flex-1">

                                <h3 className="break-words text-lg sm:text-xl font-semibold text-[#181818]">
                                    {item?.title}
                                </h3>

                                {item?.sku && (
                                    <p className="mt-2 text-xs sm:text-sm text-gray-500 break-all">
                                        SKU : {item.sku}
                                    </p>
                                )}

                                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    <Detail
                                        label="Quantity"
                                        value={item?.quantity}
                                    />

                                    <Detail
                                        label="Price"
                                        value={`₹${item?.price}`}
                                    />

                                    <Detail
                                        label="GST"
                                        value={`₹${item?.gst}`}
                                    />

                                    <Detail
                                        label="Total"
                                        value={`₹${item?.total}`}
                                    />

                                </div>

                            </div>

                        </a>

                    ))}

                </div>

            </div>

            {/* Shipping */}

            <div className="rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white p-5 sm:p-8">

                <h2 className="mb-5 sm:mb-6 font-serif text-xl sm:text-2xl">
                    Shipping Address
                </h2>

                <div className="rounded-2xl bg-[#F8F5F2] p-4 sm:p-6 text-sm sm:text-base leading-7 sm:leading-8">

                    <p className="text-base sm:text-lg font-semibold break-words">
                        {order.shippingAddress?.firstName}{" "}
                        {order.shippingAddress?.lastName}
                    </p>

                    <p className="break-words">
                        {order.shippingAddress?.address}
                    </p>

                    <p className="break-words">
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}
                    </p>

                    <p className="break-words">
                        {order.shippingAddress?.country}
                    </p>

                    <p>
                        {order.shippingAddress?.pinCode}
                    </p>

                    <p className="break-all">
                        {order.shippingAddress?.mobile}
                    </p>

                </div>

            </div>

        </div>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <div className="rounded-2xl bg-[#F8F5F2] p-4 sm:p-5 transition-all duration-300 hover:shadow-md">
            <div className="mb-3 flex items-center gap-2 text-[#B88A44]">
                {icon}
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
                {label}
            </p>

            <p className="mt-2 break-words text-sm sm:text-base font-semibold text-[#181818]">
                {value || "-"}
            </p>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="rounded-xl border border-[#ECE6DE] bg-white p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-500">
                {label}
            </p>

            <p className="mt-1 break-words text-sm sm:text-base font-semibold text-[#181818]">
                {value ?? "-"}
            </p>
        </div>
    );
}