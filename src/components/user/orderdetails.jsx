import { ArrowLeft, Truck } from "lucide-react";

export default function OrderDetails({ order, goBack, track }) {
    if (!order) return null;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">

                <button
                    onClick={goBack}
                    className="flex items-center gap-2 border rounded-md px-4 py-2 hover:bg-gray-100"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <button
                    onClick={track}
                    className="flex items-center gap-2 bg-black text-white rounded-md px-4 py-2"
                >
                    <Truck size={18} />
                    Track Order
                </button>

            </div>

            {/* Order Info */}
            <div className="border rounded-lg p-5">

                <h2 className="text-xl font-semibold mb-4">
                    Order Information
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <p className="text-gray-500">Order Number</p>
                        <p className="font-semibold">{order.orderNumber}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Order Status</p>
                        <p className="font-semibold">{order.orderStatus}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Payment Status</p>
                        <p className="font-semibold">{order.paymentStatus}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Payment Method</p>
                        <p className="font-semibold">
                            {order.paymentMethod}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Order Date</p>
                        <p>
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Total Amount</p>
                        <p className="font-semibold">
                            ₹{order.amount}
                        </p>
                    </div>

                </div>

            </div>

            {/* Products */}
            <div className="border rounded-lg p-5">

                <h2 className="text-xl font-semibold mb-4">
                    Ordered Products
                </h2>

                <div className="space-y-5">

                    {order.products?.map((item) => (

                        <div
                            key={item._id}
                            className="flex gap-5 border-b pb-4"
                        >

                            <img
                                src={item.product_id?.images?.[0]}
                                alt={item.product_id?.title}
                                className="w-24 h-24 rounded object-cover border"
                            />

                            <div className="flex-1">

                                <h3 className="font-semibold">
                                    {item.product_id?.title}
                                </h3>

                                <p>
                                    Quantity : {item.quantity}
                                </p>

                                <p>
                                    Price : ₹{item.salePrice}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* Shipping Address */}
            <div className="border rounded-lg p-5">

                <h2 className="text-xl font-semibold mb-4">
                    Shipping Address
                </h2>

                <div className="space-y-1">

                    <p>
                        {order.shippingAddress?.firstName}{" "}
                        {order.shippingAddress?.lastName}
                    </p>

                    <p>{order.shippingAddress?.address}</p>

                    <p>
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}
                    </p>

                    <p>{order.shippingAddress?.country}</p>

                    <p>{order.shippingAddress?.pinCode}</p>

                    <p>{order.shippingAddress?.mobile}</p>

                </div>

            </div>

        </div>
    );
}