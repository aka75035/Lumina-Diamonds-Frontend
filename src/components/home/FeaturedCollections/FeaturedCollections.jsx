import { useEffect, useState } from "react";
import { getAllCollections } from "../../../lib/api";

export default function FeaturedCollections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await getAllCollections();
        setCollections(data || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCollections();
  }, []);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-[#C7A95B] text-sm">
            Discover
          </p>

          <h2 className="text-5xl font-serif mt-2">
            Featured Collections
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Explore our signature jewellery collections crafted for every occasion.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {collections.map((collection) => (

            <a
              key={collection._id}
              href={`/jewellery?collection=${collection.slug}`}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white"
            >

              <div className="relative h-[500px]">

                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8">

                  <h3 className="text-white text-3xl font-serif">
                    {collection.name}
                  </h3>

                  {collection.description && (
                    <p className="text-white/80 mt-2 line-clamp-2">
                      {collection.description}
                    </p>
                  )}

                  <button className="mt-6 bg-white text-black rounded-full px-6 py-3 font-medium">
                    Explore →
                  </button>

                </div>

              </div>

            </a>

          ))}

        </div>

      </div>

    </section>
  );
}