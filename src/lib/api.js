const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";



async function doFetch(path) {

    const url = `${BASE_URL.replace(/\/$/, "")}${path}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch: ${url}`);
    }

    return res.json();
}

let cache = null;
let pendingRequest = null;

export async function fetchAllProductsCategoryCollectionsMetalRates(forceRefresh = false) {

    if (cache && !forceRefresh) {
        console.log("✅ From Cache");
        return cache;
    }

    if (pendingRequest && !forceRefresh) {
        console.log("⏳ Waiting for existing request");
        return pendingRequest;
    }

    console.log("🌐 Fetching from API");

    pendingRequest = (async () => {
        const [
            products,
            collections,
            categories,
            metalRates
        ] = await Promise.all([
            doFetch("/product"),
            doFetch("/collection"),
            doFetch("/category"),
            doFetch("/metal")
        ]);

        cache = {
            products,
            collections,
            categories,
            metalRates
        };

        pendingRequest = null;

        return cache;
    })();

    try {
        return await pendingRequest;
    } catch (err) {
        pendingRequest = null;
        throw err;
    }
}
// export async function fetchAllProductsCategoryCollectionsMetalRates(forceRefresh = false) {

//     if (cache && !forceRefresh) {
//         return cache;
//     }

//     const [
//         products,
//         collections,
//         categories,
//         metalRates
//     ] = await Promise.all([
//         doFetch("/product"),
//         doFetch("/collection"),
//         doFetch("/category"),
//         doFetch("/metal")
//     ]);

//     cache = {
//         products,
//         collections,
//         categories,
//         metalRates
//     };
//     console.log(cache);

//     return cache;
// }

export async function fetchFilterData() {

    const {
        collections,
        categories,
        metalRates
    } = await fetchAllProductsCategoryCollectionsMetalRates();

    return {
        collections,
        categories,
        metalRates
    };
}

export async function getFilteredProducts(filters = {}) {

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
        } else {
            params.append(key, value);
        }

    });

    const query = params.toString();

    return doFetch(
        `/product${query ? `?${query}` : ""}`
    );

}

export async function getAllProducts() {

    const { products } =
        await fetchAllProductsCategoryCollectionsMetalRates();

    return products || [];

}

export async function getAllCollections() {

    const { collections } =
        await fetchAllProductsCategoryCollectionsMetalRates();

    return collections || [];

}

export async function getAllCategories() {
    

    const { categories } =
        await fetchAllProductsCategoryCollectionsMetalRates();

    return categories || [];

}

export async function getMetalRates() {

    const { metalRates } =
        await fetchAllProductsCategoryCollectionsMetalRates();

    return metalRates || [];

}

export async function getCategoryById(id) {

    const categories = await getAllCategories();

    return categories.find(
        category => category._id === id
    );

}

export async function getParentChildCategories() {

    const categories = await getAllCategories();

    return {

        parentCategories:
            categories.filter(
                category => !category.parentCategory
            ),

        childCategories:
            categories.filter(
                category => category.parentCategory
            )

    };

}

export async function getProductById(id) {

    const products = await getAllProducts();

    return products.products.find(
        product => product._id === id
    );

}

export async function getProductsByCategory(categoryId) {

    const products = await getAllProducts();

    return products.filter(product => {

        const id =
            product.category?._id || product.category;

        return id === categoryId;

    });

}

export function clearApiCache() {

    cache = null;

}