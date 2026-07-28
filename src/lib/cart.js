const BASE =
  import.meta.env.VITE_BACKEND_API_URL ||
  "http://localhost:8000";

/*
==========================================
Common Fetch Helper
==========================================
*/

async function request(url, options = {}) {
  const response = await fetch(`${BASE}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");

  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();

    console.error("Non-JSON Response:", {
      url: `${BASE}${url}`,
      status: response.status,
      body: text,
    });

    throw new Error(
      `Server returned ${response.status} instead of JSON`
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Request Failed");
  }

  return data;
}

/*
==========================================
Get Cart
==========================================
*/

export async function handlefetchCart(
  user
) {
  
  
  if (!user?._id) return [];

  return await request(
    `/cart/${user._id}`
  );
}

/*
==========================================
Add Item
==========================================
*/

export async function handleAddCartItem(
  item
) {
  
  return await request("/cart", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

/*
==========================================
Merge Cart
==========================================
*/

export async function handleMergeCart(
  user,
  carts
) {
  return await request(
    "/cart/merge",
    {
      method: "POST",

      body: JSON.stringify({
        id: user._id,
        carts,
      }),
    }
  );
}

/*
==========================================
Update Quantity
==========================================
*/

export async function handleUpdateCartItem(
  id,
  quantity
) {
  return await request(
    `/cart/${id}`,
    {
      method: "PUT",

      body: JSON.stringify({
        quantity,
      }),
    }
  );
}

/*
==========================================
Delete Item
==========================================
*/

export async function handleDeleteCartItem(
  id
) {
  return await request(
    `/cart/${id}`,
    {
      method: "DELETE",
    }
  );
}