import TrackingStep from "./trackingstep";

export default function TrackingTimeline({ tracking }) {

    return (

        <div className="border rounded-lg p-5">

            <h2 className="text-xl font-semibold mb-5">
                Tracking Timeline
            </h2>

            {tracking.length === 0 ? (

                <p>No tracking updates yet.</p>

            ) : (

                tracking.map((step, index) => (

                    <TrackingStep
                        key={index}
                        step={step}
                        isLast={index === tracking.length - 1}
                    />

                ))

            )}

        </div>

    );

}