export async function handleCategoryFilter(slug, searchParams) {
  const base = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

  const url = `${base}/product/category/${slug}?${searchParams.toString()}`;

  console.log(url);

  const response = await fetch(url);

  return await response.json();
}

export async function handleCategoryFilterData(slug) {
  const base = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

  const url = `${base}/category/filter/${slug}`;

  console.log(url);

  const response = await fetch(url);

  return await response.json();
}