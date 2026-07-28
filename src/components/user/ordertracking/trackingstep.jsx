import {
    MapPin,
    CalendarDays,
    CheckCircle2,
} from "lucide-react";

export default function TrackingStep({ step, isLast }) {
    const formattedDate = step?.date
        ? new Date(step.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
          }) +
          " • " +
          new Date(step.date).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    return (
        <div className="flex gap-3 sm:gap-5">

            {/* Timeline */}

            <div className="flex flex-col items-center flex-shrink-0">

                <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 sm:border-4 border-[#F8F5F2] bg-[#B88A44] shadow-md">

                    <CheckCircle2
                        size={18}
                        className="text-white sm:h-[22px] sm:w-[22px]"
                    />

                </div>

                {!isLast && (
                    <div className="mt-2 h-full min-h-16 sm:min-h-20 w-[2px] bg-[#E7D6B8]" />
                )}

            </div>

            {/* Card */}

            <div className="flex-1 min-w-0 rounded-3xl border border-[#ECE6DE] bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                {/* Header */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0">

                        <h3 className="font-serif text-lg sm:text-xl text-[#181818] break-words">
                            {step.status}
                        </h3>

                        {step.location && (
                            <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">

                                <MapPin
                                    size={16}
                                    className="mt-0.5 flex-shrink-0 text-[#B88A44]"
                                />

                                <span className="break-words">
                                    {step.location}
                                </span>

                            </div>
                        )}

                    </div>

                    {formattedDate && (
                        <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#F8F5F2] px-3 py-2 text-xs sm:text-sm text-gray-600">

                            <CalendarDays
                                size={16}
                                className="flex-shrink-0 text-[#B88A44]"
                            />

                            <span className="break-words">
                                {formattedDate}
                            </span>

                        </div>
                    )}

                </div>

                {/* Message */}

                {step.message && (
                    <div className="mt-5 rounded-2xl bg-[#F8F5F2] p-4">

                        <p className="break-words text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                            {step.message}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}