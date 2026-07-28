import { MapPinned } from "lucide-react";
import TrackingStep from "./trackingstep";

export default function TrackingTimeline({ tracking }) {
    return (
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

            {/* Header */}

            <div className="border-b border-[#ECE6DE] bg-[#F8F5F2] px-4 py-5 sm:px-8 sm:py-6">

                <div className="flex items-start sm:items-center gap-3">

                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">

                        <MapPinned
                            size={18}
                            className="text-[#B88A44] sm:h-[22px] sm:w-[22px]"
                        />

                    </div>

                    <div className="min-w-0">

                        <h2 className="font-serif text-xl sm:text-2xl text-[#181818] break-words">
                            Shipment Journey
                        </h2>

                        <p className="mt-1 text-xs sm:text-sm leading-6 text-gray-500">
                            Track every milestone of your jewellery order.
                        </p>

                    </div>

                </div>

            </div>

            {/* Timeline */}

            <div className="p-4 sm:p-8">

                {tracking.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-10 sm:py-14">

                        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#F8F5F2]">

                            <MapPinned
                                size={28}
                                className="text-[#B88A44] sm:h-[34px] sm:w-[34px]"
                            />

                        </div>

                        <h3 className="mt-5 text-center font-serif text-xl sm:text-2xl text-[#181818]">
                            No Tracking Updates Yet
                        </h3>

                        <p className="mt-3 max-w-md text-center text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 px-2">
                            Your jewellery hasn't entered the courier network
                            yet. Tracking updates will automatically appear
                            here once your shipment begins its journey.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-5 sm:space-y-8">

                        {tracking.map((step, index) => (

                            <TrackingStep
                                key={index}
                                step={step}
                                isLast={index === tracking.length - 1}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}