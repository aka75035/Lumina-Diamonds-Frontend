export default function TrackingStep({ step, isLast }) {

    return (

        <div className="flex">

            <div className="flex flex-col items-center mr-4">

                <div className="w-4 h-4 rounded-full bg-green-600" />

                {!isLast && (
                    <div className="w-1 flex-1 bg-green-300" />
                )}

            </div>

            <div className="pb-8">

                <h3 className="font-semibold">
                    {step.status}
                </h3>

                <p className="text-gray-600">
                    {step.location}
                </p>

                <p className="text-sm text-gray-500">
                    {step.message}
                </p>

                <p className="text-xs mt-2 text-gray-400">
                    {new Date(step.date).toLocaleString()}
                </p>

            </div>

        </div>

    );

}