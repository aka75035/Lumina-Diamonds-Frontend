import { useEffect, useState } from "react";
import { getAllProducts } from "../../../lib/api";

export default function SignatureProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        console.log(data);

        // Show only first 8 products
        setProducts((data.products || []).slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-[#C8A75B] text-sm">
            Our Collection
          </p>

          <h2 className="text-5xl font-serif mt-3">
            Signature Pieces
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Handpicked jewellery crafted with precision, elegance and timeless beauty.
          </p>

        </div>

        {/* Products */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <a
              href={`/jewellery/${product._id}`}
              key={product._id}
              className="group"
            >

              <div className="bg-[#FAFAFA] rounded-3xl overflow-hidden border border-gray-100">

                {/* Image */}

                <div className="aspect-square overflow-hidden">

                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

                {/* Content */}

                <div className="p-6">

                  <p className="text-xs uppercase tracking-[3px] text-[#C8A75B]">

                    {product.metalType} • {product.purity}

                  </p>

                  <h3 className="mt-3 text-xl font-serif line-clamp-2 min-h-[60px]">

                    {product.title}

                  </h3>

                  <p className="mt-4 text-2xl font-semibold">

                    ₹
                    {Number(product.salePrice).toLocaleString("en-IN")}

                  </p>

                  <button
                    className="
                    mt-6
                    w-full
                    border
                    border-black
                    rounded-full
                    py-3
                    hover:bg-black
                    hover:text-white
                    transition
                    "
                  >
                    View Details
                  </button>

                </div>

              </div>

            </a>

          ))}

        </div>

        {/* Button */}

        <div className="text-center mt-16">

          <a
            href="/jewellery"
            className="
            inline-block
            bg-black
            text-white
            px-10
            py-4
            rounded-full
            "
          >
            View All Jewellery
          </a>

        </div>

      </div>

    </section>
  );
}