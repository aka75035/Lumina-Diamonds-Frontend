import TrackingStatus from "./trackingstatus";

export default function TrackingHeader({ order }) {
    return (
        <div className="border rounded-lg p-5">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold">
                        Order #{order.orderNumber}
                    </h2>

                    <p className="text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                    </p>

                </div>

                <TrackingStatus status={order.orderStatus} />

            </div>

        </div>
    );
}