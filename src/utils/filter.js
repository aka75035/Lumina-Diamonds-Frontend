import { sampleProduct } from "./product";
import { categories } from "./categories";
import { collections } from "./collections";

export function getCategory(slug) {

  return categories.find(
    (category) => category.slug === slug
  );

}

export function getProductsByCategory(slug) {

  return sampleProduct.filter(
    (product) => product.category === slug
  );

}

export function getAllProducts() {

  return sampleProduct;

}

export function getAllCategories() {

  return categories;

}
export function getAllCollections(){

    return collections;
}
export function getProductsByCollection(slug) {

  return sampleProduct.filter(
    (product) =>
      product.collections.includes(slug)
  );

}