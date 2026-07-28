import {
    Truck,
    Package,
    ExternalLink,
    ShieldCheck,
} from "lucide-react";

export default function ShipmentInfo({ order }) {
    if (!order.tracking?.courierName) {
        return (
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

                <div className="h-1 bg-[#B88A44]" />

                <div className="p-5 sm:p-8 text-center">

                    <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#F8F5F2]">
                        <Package
                            size={26}
                            className="text-[#B88A44] sm:h-[30px] sm:w-[30px]"
                        />
                    </div>

                    <h2 className="mt-5 font-serif text-xl sm:text-2xl text-[#181818]">
                        Shipment Not Created
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                        Your jewellery is currently being prepared by our team.
                        Tracking information will appear here once your shipment
                        has been dispatched.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

            {/* Gold Accent */}

            <div className="h-1 bg-[#B88A44]" />

            <div className="p-5 sm:p-8">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                    {/* Left */}

                    <div className="min-w-0 flex-1">

                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-[#B88A44]">
                            Shipment
                        </p>

                        <h2 className="mt-3 font-serif text-2xl sm:text-3xl text-[#181818] break-words">
                            Shipment Information
                        </h2>

                        <p className="mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                            Your jewellery has been handed over to our trusted
                            delivery partner.
                        </p>

                    </div>

                    {/* Badge */}

                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">

                        <ShieldCheck
                            size={18}
                            className="flex-shrink-0"
                        />

                        <span>Secure Delivery</span>

                    </div>

                </div>

                {/* Info Cards */}

                <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">

                    <div className="rounded-2xl bg-[#F8F5F2] p-4 sm:p-6">

                        <div className="mb-3 flex items-center gap-2 text-[#B88A44]">

                            <Truck
                                size={18}
                                className="flex-shrink-0"
                            />

                            <span className="font-semibold">
                                Courier Partner
                            </span>

                        </div>

                        <p className="break-words text-base sm:text-lg font-medium text-[#181818]">
                            {order.tracking.courierName}
                        </p>

                    </div>

                    <div className="rounded-2xl bg-[#F8F5F2] p-4 sm:p-6">

                        <div className="mb-3 flex items-center gap-2 text-[#B88A44]">

                            <Package
                                size={18}
                                className="flex-shrink-0"
                            />

                            <span className="font-semibold">
                                AWB Number
                            </span>

                        </div>

                        <p className="break-all text-sm sm:text-lg font-medium text-[#181818]">
                            {order.tracking.awb}
                        </p>

                    </div>

                </div>

                {/* Button */}

                {order.tracking.trackingUrl && (
                    <div className="mt-6 sm:mt-8">

                        <a
                            href={order.tracking.trackingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#181818] px-6 py-3 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:bg-[#B88A44] hover:shadow-lg"
                        >
                            <ExternalLink size={18} />

                            <span>Track on Courier Website</span>

                        </a>

                    </div>
                )}

            </div>

        </div>
    );
}