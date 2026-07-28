import { CalendarDays, PackageCheck } from "lucide-react";
import TrackingStatus from "./trackingstatus";

export default function TrackingHeader({ order }) {
    const formattedDate = order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
          }) +
          " • " +
          new Date(order.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    return (
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

            {/* Gold Accent */}

            <div className="h-1 w-full bg-[#B88A44]" />

            <div className="p-5 sm:p-8">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}

                    <div className="min-w-0 flex-1">

                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-[#B88A44]">
                            MIASHKA
                        </p>

                        <h1 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181818] break-words">
                            Order #{order.orderNumber}
                        </h1>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 text-sm text-gray-600">

                            <div className="flex items-start gap-2 min-w-0">

                                <CalendarDays
                                    size={18}
                                    className="mt-0.5 flex-shrink-0 text-[#B88A44]"
                                />

                                <span className="break-words">
                                    {formattedDate}
                                </span>

                            </div>

                            <div className="flex items-center gap-2">

                                <PackageCheck
                                    size={18}
                                    className="flex-shrink-0 text-[#B88A44]"
                                />

                                <span>
                                    Jewellery Order
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="flex w-full justify-start lg:w-auto lg:justify-end">
                        <TrackingStatus status={order.orderStatus} />
                    </div>

                </div>

            </div>

        </div>
    );
}