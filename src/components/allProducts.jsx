import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import BreadCrumbs from "./breadcrumbs";
import Filters from "./Filter/filters";
import ProductGrid from "./ProductGrid/product-grid";

import { getFilteredProducts } from "../lib/api";

export default function AllProducts({
    initialProducts = [],
    collections = [],
    categories = [],
    metalData = [],
    forBreadCrumbs = []
}) {

    // Original products (never changes)
    const [allProducts, setAllProducts] = useState(initialProducts);

    // Products currently displayed
    const [products, setProducts] = useState(initialProducts);

    const [searchParams, setSearchParams] = useSearchParams();

    // Update when page loads new data
    useEffect(() => {
        setAllProducts(initialProducts);
        setProducts(initialProducts);
    }, [initialProducts]);

    // Fetch only when URL filters change
    useEffect(() => {

        async function loadProducts() {

            const query = searchParams.toString();

            // No filters → show original products
            if (!query) {
                setProducts(allProducts);
                return;
            }

            const filters = {};

            searchParams.forEach((value, key) => {

                if (filters[key]) {

                    if (Array.isArray(filters[key])) {
                        filters[key].push(value);
                    } else {
                        filters[key] = [filters[key], value];
                    }

                } else {

                    filters[key] = value;

                }

            });

            try {

                const data = await getFilteredProducts(filters);

                setProducts(data.products || []);

            } catch (err) {

                console.error(err);

            }

        }

        loadProducts();

    }, [searchParams.toString(), allProducts]);

    return (

        <div className="w-full">

            <BreadCrumbs
                forBreadCrumbs={forBreadCrumbs}
            />

            <div className="flex">

                <div className="hidden lg:block w-72 border-r">

                    <Filters
                        sidebar={true}
                        products={allProducts}
                        collections={collections}
                        categories={categories}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />

                </div>

                <div className="flex-1">

                    <div className="lg:hidden">

                        <Filters
                            sidebar={false}
                            products={allProducts}
                            collections={collections}
                            categories={categories}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                        />

                    </div>

                    <ProductGrid
                        products={products}
                        metalData={metalData}
                    />

                </div>

            </div>

        </div>

    );

}