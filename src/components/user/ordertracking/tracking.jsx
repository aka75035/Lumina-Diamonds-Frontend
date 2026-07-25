import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getOrderTracking } from "../../../lib/order";
import TrackingHeader from "./trackingheader";
import TrackingTimeline from "./trackingtimeline.jsx";
import ShipmentInfo from "./trackingstatus.jsx";

export default function Tracking({ order, goBack }) {
    const [tracking, setTracking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTracking() {
            try {
                const data = await getOrderTracking(order._id);
                setTracking(data.tracking || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchTracking();
    }, [order]);

    if (loading) {
        return <div>Loading tracking...</div>;
    }

    return (
        <div className="space-y-6">

            <button
                onClick={goBack}
                className="flex items-center gap-2 border rounded-md px-4 py-2 hover:bg-gray-100"
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <TrackingHeader order={order} />

            <ShipmentInfo order={order} />

            <TrackingTimeline tracking={tracking} />

        </div>
    );
}