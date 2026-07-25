import { useState } from "react";
import FilterPanel from "./filterpanel";

export default function Filters({
    sidebar,
    onApply,
    products = [],
    collections = [],
    categories = [],
    searchParams,
    setSearchParams
}) {

    const [open, setOpen] = useState(false);

    const filterData = {
        collections: collections.map(item => item.slug),
        category: categories.map(item => item.slug)
    };

    if (sidebar) {

        return (
            <FilterPanel
                sidebar
                onApply={onApply}
                intialproducts={products}
                forFilterData={filterData}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        );

    }

    return (
        <>
            <div className="flex border border-black lg:hidden w-full">

                <button className="flex-1 py-2">
                    Sort
                </button>

                <button
                    className="flex-1 py-2"
                    onClick={() => setOpen(true)}
                >
                    Filter
                </button>

            </div>

            <FilterPanel
                open={open}
                setOpen={setOpen}
                sidebar={false}
                onApply={onApply}
                intialproducts={products}
                forFilterData={filterData}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        </>
    );
}