const colors = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PACKED: "bg-indigo-100 text-indigo-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
};

export default function TrackingStatus({ status }) {

    return (

        <span
            className={`px-4 py-2 rounded-full font-semibold ${
                colors[status] || "bg-gray-100 text-gray-700"
            }`}
        >
            {status}
        </span>

    );

}