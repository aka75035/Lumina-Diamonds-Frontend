export default function ShipmentInfo({ order }) {

    if (!order.tracking?.courierName) {

        return (
            <div className="border rounded-lg p-5">

                <h2 className="font-semibold text-lg mb-2">
                    Shipment
                </h2>

                <p className="text-gray-500">
                    Shipment has not been created yet.
                </p>

            </div>
        );

    }

    return (

        <div className="border rounded-lg p-5">

            <h2 className="font-semibold text-lg mb-4">
                Shipment Information
            </h2>

            <div className="space-y-2">

                <p>
                    <strong>Courier:</strong> {order.tracking.courierName}
                </p>

                <p>
                    <strong>AWB:</strong> {order.tracking.awb}
                </p>

                <a
                    href={order.tracking.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                >
                    Track on Courier Website
                </a>

            </div>

        </div>

    );

}