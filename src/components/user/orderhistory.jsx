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
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();

    }, []);

    if (loading) {

        return <div>Loading...</div>;

    }

    if (view === "details") {

        return (
            <OrderDetails
                order={selectedOrder}
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

        <div>

            <h1 className="text-2xl font-bold mb-6">
                My Orders
            </h1>

            {orders.length === 0 ? (

                <p>No Orders Found.</p>

            ) : (

                orders.map((order) => (

                    <OrderCard
                        key={order._id}
                        order={order}
                        setView={setView}
                        setSelectedOrder={setSelectedOrder}
                    />

                ))

            )}

        </div>

    );
}