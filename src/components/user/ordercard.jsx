import { Eye, Truck } from "lucide-react";

export default function OrderCard({
    order,
    setView,
    setSelectedOrder,
}) {
    return (
        <div className="border rounded-lg p-5 shadow-sm mb-5">

            <div className="flex justify-between">

                <div>
                    <h2 className="font-semibold text-lg">
                        #{order.orderNumber}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <p className="mt-2">
                        ₹{order.amount}
                    </p>

                    <p className="mt-1">
                        {order.orderStatus}
                    </p>
                </div>

                <div className="flex gap-3 items-center">

                    <button
                        onClick={() => {
                            setSelectedOrder(order);
                            setView("details");
                        }}
                        className="border rounded px-4 py-2 flex items-center gap-2"
                    >
                        <Eye size={18} />
                        Details
                    </button>

                    <button
                        onClick={() => {
                            setSelectedOrder(order);
                            setView("tracking");
                        }}
                        className="bg-black text-white rounded px-4 py-2 flex items-center gap-2"
                    >
                        <Truck size={18} />
                        Track
                    </button>

                </div>

            </div>

        </div>
    );
}