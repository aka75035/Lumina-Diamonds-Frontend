import { useEffect, useState } from "react";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { getOrderTracking } from "../../../lib/order";
import TrackingHeader from "./trackingheader";
import TrackingTimeline from "./trackingtimeline";
import ShipmentInfo from "./shipmentinfo";

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
        return (
            <div className="rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white p-6 sm:p-14 shadow-sm">

                <div className="flex flex-col items-center justify-center text-center">

                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 animate-pulse items-center justify-center rounded-full bg-[#F8F5F2]">

                        <PackageCheck
                            className="text-[#B88A44]"
                            size={26}
                        />

                    </div>

                    <h2 className="mt-5 font-serif text-xl sm:text-2xl text-[#181818]">
                        Tracking Your Jewellery
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-gray-500">
                        Fetching the latest shipment updates...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="space-y-5 sm:space-y-8">

            {/* Back */}

            <button
                onClick={goBack}
                className="inline-flex w-fit items-center gap-2 sm:gap-3 rounded-full border border-[#181818] px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base transition-all duration-300 hover:bg-[#181818] hover:text-white"
            >
                <ArrowLeft size={18} />
                Back to Order
            </button>

            {/* Hero */}

            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2]">

                <div className="h-1 bg-[#B88A44]" />

                <div className="p-5 sm:p-10">

                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-[#B88A44]">
                        LUMINA
                    </p>

                    <h1 className="mt-3 font-serif text-3xl sm:text-4xl text-[#181818]">
                        Order Tracking
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
                        Follow every stage of your jewellery's journey from our
                        workshop to your doorstep. We keep you informed at every
                        milestone.
                    </p>

                </div>

            </div>

            {/* Order */}

            <TrackingHeader order={order} />

            {/* Shipment */}

            <ShipmentInfo order={order} />

            {/* Timeline */}

            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

                <div className="border-b border-[#ECE6DE] px-5 py-5 sm:px-8 sm:py-6">

                    <h2 className="font-serif text-xl sm:text-2xl text-[#181818]">
                        Shipment Journey
                    </h2>

                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                        Latest updates from our delivery partner.
                    </p>

                </div>

                <div className="p-4 sm:p-8">

                    {tracking.length > 0 ? (
                        <TrackingTimeline tracking={tracking} />
                    ) : (
                        <div className="flex flex-col items-center py-10 sm:py-14 text-center">

                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#F8F5F2]">

                                <PackageCheck
                                    className="text-[#B88A44]"
                                    size={30}
                                />

                            </div>

                            <h3 className="mt-5 font-serif text-xl sm:text-2xl text-[#181818]">
                                Tracking Not Available
                            </h3>

                            <p className="mt-3 max-w-md text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                                Tracking updates will appear here once the
                                courier begins processing your shipment.
                            </p>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}