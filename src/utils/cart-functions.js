import {
  handlefetchCart,
  handleMergeCart,
  handleAddCartItem,
  handleDeleteCartItem,
  handleUpdateCartItem,
} from "../lib/cart";

/*
==========================================
Guest Cart
==========================================
*/

export function updateGuestCart(updatedCart, setCart) {
  setCart(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  window.dispatchEvent(
    new Event("cartUpdated")
  );
}

/*
==========================================
Delete Item
==========================================
*/

export async function handleDelete(
  cart,
  setCart,
  index,
  loggedIn,
  user
) {
  // ---------------- Guest ----------------

  if (!loggedIn) {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    updateGuestCart(updatedCart, setCart);

    return;
  }

  // ---------------- Logged In ----------------

  const item = cart[index];

  if (!item?._id) return;

  try {
    await handleDeleteCartItem(item._id);

    const backendCart =
      await handlefetchCart(user);

    setCart(backendCart);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  } catch (err) {
    console.error(err);
  }
}

/*
==========================================
Increase Quantity
==========================================
*/

export async function handlePlus(
  cart,
  setCart,
  index,
  loggedIn,
  user
) {
  // ---------------- Guest ----------------

  if (!loggedIn) {
    const updatedCart = cart.map(
      (item, i) =>
        i === index
          ? {
              ...item,
              quantity:
                (item.quantity || 1) + 1,
            }
          : item
    );

    updateGuestCart(updatedCart, setCart);

    return;
  }

  // ---------------- Logged In ----------------

  const item = cart[index];

  if (!item?._id) return;

  try {
    await handleUpdateCartItem(
      item._id,
      item.quantity + 1
    );

    const backendCart =
      await handlefetchCart(user);

    setCart(backendCart);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  } catch (err) {
    console.error(err);
  }
}

/*
==========================================
Decrease Quantity
==========================================
*/

export async function handleMinus(
  cart,
  setCart,
  index,
  loggedIn,
  user
) {
  // ---------------- Guest ----------------

  if (!loggedIn) {
    const updatedCart = cart.map(
      (item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.max(
                1,
                (item.quantity || 1) - 1
              ),
            }
          : item
    );

    updateGuestCart(updatedCart, setCart);

    return;
  }

  // ---------------- Logged In ----------------

  const item = cart[index];

  if (!item?._id) return;

  try {
    await handleUpdateCartItem(
      item._id,
      Math.max(
        1,
        item.quantity - 1
      )
    );

    const backendCart =
      await handlefetchCart(user);

    setCart(backendCart);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  } catch (err) {
    console.error(err);
  }
}

/*
==========================================
Merge Guest Cart with Backend Cart
==========================================
*/

function mergeCarts(
  backendCart = [],
  guestCart = [],
  user
) {
  const merged = [...backendCart];

  guestCart.forEach((guestItem) => {
    const existing = merged.find(
      (item) =>
        String(item.product_id) ===
          String(guestItem.product_id) &&
        item.customizations?.Material ===
          guestItem.customizations?.Material &&
        item.customizations?.Purity ===
          guestItem.customizations?.Purity
    );

    if (existing) {
      existing.quantity +=
        Number(guestItem.quantity || 1);
    } else {
      merged.push({
        ...guestItem,

        user_id: user._id,

        title:
          guestItem.title || "",

        sku:
          guestItem.sku || "",

        image:
          guestItem.image || "",

        quantity:
          Number(guestItem.quantity) || 1,

        salePrice:
          Number(guestItem.salePrice) || 0,

        gst:
          Number(guestItem.gst) || 0,

        customizations: {
          Material:
            guestItem.customizations
              ?.Material || "",

          Purity:
            guestItem.customizations
              ?.Purity || "",
        },
      });
    }
  });

  return merged;
}

/*
==========================================
Add To Cart
==========================================
*/

export async function handleAddToCart(
  product,
  selectedMaterial,
  selectedPurity,
  subtotal,
  gst,
  loggedIn,
  user
) {

  const cartItem = {
    product_id: product._id,

    title: product.title,

    sku: product.sku || "",

    image: product.images?.[0] || "",

    quantity: 1,

    // IMPORTANT:
    // Store subtotal only.
    // GST is stored separately.
    salePrice: Number(subtotal) || 0,

    gst: Number(gst) || 0,

    customizations: {
      Material: selectedMaterial,
      Purity: selectedPurity,
    },
  };

  /*
  ==========================================
  Guest User
  ==========================================
  */

  if (!loggedIn) {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) =>
        String(item.product_id) ===
          String(cartItem.product_id) &&
        item.customizations?.Material ===
          cartItem.customizations.Material &&
        item.customizations?.Purity ===
          cartItem.customizations.Purity
    );

    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push(cartItem);

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    return {
      success: true,
      guest: true,
    };
  }
  else{

  /*
  ==========================================
  Logged In User
  ==========================================
  */

  try {

    await handleAddCartItem({

      user_id: user._id,

      ...cartItem,

    });

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    return {

      success: true,

      guest: false,

    };

  } catch (err) {

    console.error(err);

    return {

      success: false,

      error: err,

    };

  }
}
}


/*
==========================================
Sync Guest Cart After Login
==========================================
*/

export async function afterLoginSync(user) {
  try {

    if (!user?._id) return;

    // Guest cart
    const guestCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    // Nothing to merge
    if (guestCart.length === 0) {
      return;
    }

    // Backend cart
    const backendCart =
      await handlefetchCart(user);

    // Merge
    const mergedCart =
      mergeCarts(
        backendCart,
        guestCart,
        user
      );

    // Save merged cart
    await handleMergeCart(
      user,
      mergedCart
    );

    // Clear guest cart only after successful merge
    localStorage.removeItem("cart");

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    return {
      success: true,
    };

  } catch (err) {

    console.error(
      "Cart Sync Error:",
      err
    );

    return {
      success: false,
      error: err,
    };
  }
}
