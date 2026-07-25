import { useEffect, useState } from "react";
import { getParentChildCategories } from "../../../lib/api";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { parentCategories } = await getParentChildCategories();
        setCategories(parentCategories || []);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="bg-[#faf9f7] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-[#C7A95B] text-sm">
            Explore
          </p>

          <h2 className="text-5xl font-serif mt-2">
            Shop by Category
          </h2>

          <p className="text-gray-500 mt-5 max-w-xl mx-auto">
            Discover handcrafted jewellery for every occasion.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {categories.map((category) => (

            <a
              href={`/jewellery?category=${category.slug}`}
              key={category._id}
              className="group"
            >

              <div className="aspect-square rounded-full overflow-hidden border border-gray-200 bg-white shadow-sm">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="text-center mt-6">

                <h3 className="text-xl font-serif">
                  {category.name}
                </h3>

                <p className="text-[#C7A95B] mt-2">
                  View Collection →
                </p>

              </div>

            </a>

          ))}

        </div>

      </div>

    </section>
  );
}