import React, { useEffect, useState } from "react";

import {
    fetchAllProductsCategoryCollectionsMetalRates
} from "../../lib/api";

import AllProducts from "../../components/allProducts";

export default function JewelleryPage() {
    const renderCount = React.useRef(0);

    renderCount.current++;

    console.log("JewelleryPage Render:", renderCount.current);

    const [products, setProducts] = useState([]);

    const [collections, setCollections] = useState([]);

    const [categories, setCategories] = useState([]);

    const [metalData, setMetalData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadData() {

            try {

                const {

                    products,

                    collections,

                    categories,

                    metalRates

                } =
                    await fetchAllProductsCategoryCollectionsMetalRates();

                setProducts(products.products);

                setCollections(collections);

                setCategories(categories);

                setMetalData(metalRates);

            }

            catch (err) {

                console.log(err);

            }

            finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);

    if (loading) {

        return (

            <div className="py-10 text-center">

                Loading Products...

            </div>

        );

    }

    return (

        <AllProducts

            initialProducts={products}

            collections={collections}

            categories={categories}

            metalData={metalData}

        />

    );

}