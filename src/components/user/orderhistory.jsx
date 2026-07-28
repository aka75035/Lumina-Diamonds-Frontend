import { useEffect, useState } from "react";
import { getMyOrders } from "../../lib/order";
import OrderCard from "./ordercard";
import OrderDetails from "./orderdetails";
import Tracking from "./ordertracking/tracking";

export default function OrderHistory({
    selectedOrder,
    setSelectedOrder,
}) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("list");

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#E5DED3] border-t-[#B88A44]" />
                    <p className="mt-5 text-gray-500">
                        Loading your jewellery orders...
                    </p>
                </div>
            </div>
        );
    }

    if (view === "details") {
        return (
            <OrderDetails
                selectedOrder={selectedOrder}
                goBack={() => setView("list")}
                track={() => setView("tracking")}
            />
        );
    }

    if (view === "tracking") {
        return (
            <Tracking
                order={selectedOrder}
                goBack={() => setView("details")}
            />
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2] p-8">

                <p className="text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">
                    MIASHKA
                </p>

                <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="font-serif text-3xl text-[#181818]">
                            My Orders
                        </h1>

                        <p className="mt-2 text-gray-600">
                            View your purchase history and track every order.
                        </p>
                    </div>

                    <div className="rounded-full border border-[#D8C8A8] bg-white px-6 py-3">
                        <span className="font-semibold text-[#B88A44]">
                            {orders.length}
                        </span>{" "}
                        {orders.length === 1 ? "Order" : "Orders"}
                    </div>

                </div>

            </div>

            {/* Empty State */}
            {orders.length === 0 ? (
                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-16 text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F5F2] text-3xl">
                        💎
                    </div>

                    <h2 className="mt-6 font-serif text-2xl text-[#181818]">
                        Your Jewellery Collection Starts Here
                    </h2>

                    <p className="mx-auto mt-3 max-w-md text-gray-500">
                        You haven't placed an order yet. Once you purchase a
                        MIASHKA piece, it will appear here.
                    </p>

                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            setView={setView}
                            setSelectedOrder={setSelectedOrder}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}