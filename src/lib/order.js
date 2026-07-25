const BASE_URL =
    import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

export async function getMyOrders() {
    const res = await fetch(`${BASE_URL}/order/my-orders`, {
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch orders");
    }

    return data.orders;
}

export async function getOrderTracking(id) {
    const res = await fetch(`${BASE_URL}/order/${id}/tracking`, {
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tracking");
    }

    return data;
}