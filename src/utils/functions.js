export const normalizeMetal = (material = "") => {
  const lower = String(material).toLowerCase();

  if (lower.includes("gold")) return "Gold";
  if (lower.includes("silver")) return "Silver";
  if (lower.includes("platinum")) return "Platinum";

  return material;
};

const num = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export function pricedetails(
  formData = {},
  metalData = [],
  product = {}
) {
  // ----------------------------------
  // Safe Defaults
  // ----------------------------------

  formData = formData || {};
  product = product || {};
  metalData = Array.isArray(metalData) ? metalData : [];

  const pricing = product.pricing || {};

  // ----------------------------------
  // Selected Material / Purity
  // ----------------------------------

  const selectedMaterialNotNormalize =
    formData.Material ||
    product.metalType ||
    "";

  const selectedMaterial =
    normalizeMetal(selectedMaterialNotNormalize);

  const selectedPurity =
    formData["Gold Purity"] ||
    product.purity ||
    "";

  // ----------------------------------
  // Metal Rate
  // ----------------------------------

  const metalRateObj =
    metalData
      .filter((item) => item != null)
      .find(
        (item) =>
          item.metalType === selectedMaterial &&
          item.purity === selectedPurity
      ) || {};

  const metalRate = num(metalRateObj.amount);

  // ----------------------------------
  // Metal Price
  // ----------------------------------

  let metalPrice = 0;

  if (pricing.dynamicMetal) {
    metalPrice =
      num(product.metalWeight) *
      metalRate;
  }

  // ----------------------------------
  // Stone Price
  // ----------------------------------

  let stonePrice = 0;

  const stones = Array.isArray(product.stones)
    ? product.stones
    : [];

  for (const stone of stones) {

    if (!stone) continue;

    if (!pricing.dynamicStone) {

      stonePrice += num(stone.price);

      continue;

    }

    if (stone.pricingType === "perCarat") {

      stonePrice +=
        num(stone.weight) *
        num(stone.price);

    } else {

      stonePrice +=
        num(stone.price);

    }

  }

  // ----------------------------------
  // Making Charges
  // ----------------------------------

  let makingCharges = 0;

  const making = product.makingCharges || {};

  if (pricing.dynamicMakingCharges) {

    switch (making.type) {

      case "percentage":

        makingCharges =
          metalPrice *
          (num(making.value) / 100);

        break;

      case "perGram":

        makingCharges =
          num(making.value) *
          num(product.metalWeight);

        break;

      case "fixed":
      default:

        makingCharges =
          num(making.value);

    }

  } else {

    makingCharges =
      num(making.value);

  }

  // ----------------------------------
  // Dynamic Subtotal
  // ----------------------------------

  const dynamicSubtotal =
    metalPrice +
    stonePrice +
    makingCharges;

  // ----------------------------------
  // Pricing Mode
  // ----------------------------------

  let subtotal = dynamicSubtotal;

  switch (pricing.mode) {

    case "fixed":

      subtotal =
        num(pricing.fixedPrice);

      break;

    case "manual":

      subtotal =
        num(product.salePrice) ||
        num(product.mrp) ||
        dynamicSubtotal;

      break;

    case "dynamic":
    default:

      subtotal =
        dynamicSubtotal;

      break;

  }

  // ----------------------------------
  // GST
  // ----------------------------------

  const gst =
    subtotal * 0.03;

  // ----------------------------------
  // Total
  // ----------------------------------

  const total =
    subtotal + gst;

  // ----------------------------------
  // Return
  // ----------------------------------

  return {

    selectedMaterialNotNormalize,

    selectedMaterial,

    selectedPurity,

    metalRate,

    metalPrice,

    stonePrice,

    makingCharges,

    subtotal,

    gst,

    total,

  };

}