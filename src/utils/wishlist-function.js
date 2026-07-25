export function updatewishlist(updatedWishlist, setWishlist) {

  setWishlist([...updatedWishlist]);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  window.dispatchEvent(
    new Event("wishlistUpdated")
  );

}

export function handleDelete(
  wishlist,
  setWishlist,
  indexToDelete
) {

  const updatedWishlist = wishlist.filter(
    (_, index) => index !== indexToDelete
  );

  updateWishlist(updatedWishlist, setWishlist);

}

export function handlePlus(
  wishlist,
  setWishlist,
  indexToPlus
) {

  const updatedWishlist = wishlist.map((item, index) => {

    if (index === indexToPlus) {

      return {
        ...item,
        quantity: (item.quantity || 1) + 1,
      };

    }

    return item;

  });

  updateWishlist(updatedWishlist, setWishlist);

}

export function handleMinus(
  wishlist,
  setWishlist,
  indexToMinus
) {

  const updatedWishlist = wishlist.map((item, index) => {

    if (index === indexToMinus) {

      return {
        ...item,
        quantity: Math.max(
          1,
          (item.quantity || 1) - 1
        ),
      };

    }

    return item;

  });

  updateWishlist(updatedWishlist, setWishlist);

}

export function handleAddToWishlist(product) {

  const existingWishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const existingProduct =
    existingWishlist.find(
      (item) => item.id === product.id
    );
  let updatedWishlist;

  if (existingProduct) {

    updatedWishlist = existingWishlist.map((item) => {

      if (item.id === product.id) {

        return {
          ...item,
          quantity: (item.quantity || 1) + 1
        };

      }

      return item;

    });

  } else {

    updatedWishlist = [
      ...existingWishlist,
      {
        ...product,
        quantity: 1
      }
    ];

  }

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  window.dispatchEvent(
    new Event("wishlistUpdated")
  );

}