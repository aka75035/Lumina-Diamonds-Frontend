"use client";


import { useState,  } from "react";

import { filterdata }from "../../utils/FilterData";



export default function FilterPanel({ open, setOpen, onApply, sidebar = false, intialproducts = [], forFilterData = [],searchParams, setSearchParams}) {
  

  const updatedFilter = {

    Price: filterdata.Price,

    category:

        forFilterData.category || [],

    collection:

        forFilterData.collections || []

};

  console.log("FilterPanel", sidebar ? "Desktop" : "Mobile");
  

  const [slide, setSlide] = useState(null);

  // TOGGLE FILTER

  function getPriceRange(price) {

  if (price === "50000 and Above") {
      return { minPrice: 50000 };
    }

    const [minPrice, maxPrice] =
      price.split(" to ").map(Number);

    return { minPrice, maxPrice };
  }

  function toggleOption(key, option) {

  const params = new URLSearchParams(searchParams);

  // Special handling for Price
  if (key === "Price") {

    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("Price");

    const range = getPriceRange(option);

    params.set("minPrice", range.minPrice);

    if (range.maxPrice) {
      params.set("maxPrice", range.maxPrice);
    }

    setSearchParams(params);
    return;
  }

  const current = params.getAll(key);

  let updated = [];

  if (current.includes(option)) {
    updated = current.filter(item => item !== option);
  } else {
    updated = [...current, option];
  }

  params.delete(key);

  updated.forEach(value => {
    params.append(key, value);
  });

  setSearchParams(params);
}
  // CLEAR FILTERS

  function clearFilters() {

    setSearchParams({});

    if (!sidebar) {
        setOpen(false);
    }

  }


  function applyFilters() {

      if (!sidebar) {
          setOpen(false);
      }

  }

  const mobileClasses = `fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-300
    ${
      open
        ? "translate-x-0"
        : "translate-x-full"
    }
  `;

  const sidebarClasses = ` hidden lg:flex flex-col h-full `;

  return (

    <div className={sidebar ? sidebarClasses : mobileClasses}>

      {/* HEADER */}

      <div className="flex justify-between p-4 border-b">

        <h2 className="font-bold text-lg">
          Filters
        </h2>

        {!sidebar && (

          <button
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

        )}

      </div>

      {/* FILTERS */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {

          Object.keys(updatedFilter).map(key => (

              <div key={key} className="border-b pb-2">

                <button className="w-full flex justify-between items-center py-2 font-semibold hover:text-gray-600"

                  onClick={() => setSlide(slide === key ? null : key)}>

                  <span className="capitalize">
                    {key}
                  </span>

                  <span>
                    {
                      slide === key ? "-" : "+"
                    }
                  </span>

                </button>

                <div
                  className={`overflow-hidden transition-all duration-300

                    ${ slide === key ? "max-h-96 mt-2" : "max-h-0" }
                  `}
                >

                  {

                    updatedFilter[key]?.map(option => {

                        let checked = false;
                        if (key === "Price") {
                          const minPrice = searchParams?.get("minPrice");
                          const maxPrice = searchParams?.get("maxPrice");
                          if (option === "50000 and Above") {
                            checked = minPrice === "50000";
                          } else {
                            const range = getPriceRange(option);
                            checked = minPrice === String(range.minPrice) && maxPrice === String(range.maxPrice);
                          }
                        } else {
                          checked = searchParams.getAll(key).includes(option);
                        }

                        return (

                          <label key={option} className=" flex items-center gap-2 py-1 cursor-pointer ">

                            <input type="checkbox" checked={checked} onChange={() => toggleOption(key,option)} />

                            <span>
                              {option}
                            </span>

                          </label>

                        );

                      })

                  }

                </div>

              </div>

            ))

        }

      </div>

      {/* MOBILE FOOTER */}

      {

        !sidebar && (

          <div className=" p-4 border-t flex gap-2 ">

            <button className="flex-1 border py-2rounded" onClick={clearFilters}>
              Clear
            </button>

            <button
              className=" flex-1 bg-black text-white py-2 rounded " onClick={applyFilters}>
              Apply
            </button>

          </div>

        )

      }

    </div>

  );
}