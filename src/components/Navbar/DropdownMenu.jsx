import { Link } from "react-router-dom";

export default function DropdownMenu({
  title,
  items = [],
  collections = [],
  titleLink = "/",
}) {
  return (
    <div className="group relative">
      {/* Menu Title */}

      <Link
        to={titleLink}
        className="
          relative
          block
          px-8
          py-5
          text-[13px]
          uppercase
          tracking-[0.2em]
          text-gray-900
          transition-colors
          duration-200
          hover:text-[#C8A75B]
        "
      >
        {title}

        <span
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            w-0
            bg-[#C8A75B]
            transition-all
            duration-300
            group-hover:w-full
          "
        />
      </Link>

      {/* Mega Menu */}

      <div
        className="
          invisible
          absolute
          left-1/2
          top-full
          z-50
          w-[900px]
          -translate-x-1/2
          rounded-3xl
          border
          border-gray-100
          bg-white
          p-10
          opacity-0
          shadow-2xl
          transition-all
          duration-300
          group-hover:visible
          group-hover:opacity-100
        "
      >
        <div className="grid grid-cols-3 gap-10">
          {/* Categories */}

          <div>
            <h3
              className="mb-6 text-2xl text-black"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              {title}
            </h3>

            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  key={item._id}
                  to={`/product?category=${item.slug}`}
                  className="
                    block
                    text-gray-600
                    transition-colors
                    hover:text-[#C8A75B]
                  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Collections */}

          <div>
            <h3
              className="mb-6 text-2xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Collections
            </h3>

            <div className="space-y-3">
              {collections.map((collection) => (
                <Link
                  key={collection._id}
                  to={`/collection/${collection.slug}`}
                  className="
                    block
                    text-gray-600
                    hover:text-[#C8A75B]
                  "
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Banner */}

          <div>
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/images/menu-banner.jpg"
                alt="Luxury Jewellery"
                className="h-72 w-full object-cover"
              />
            </div>

            <h3
              className="mt-5 text-3xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Signature Collection
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              Discover handcrafted diamond jewellery inspired by timeless
              elegance.
            </p>

            <Link
              to="/Collections"
              className="
                mt-6
                inline-block
                border-b
                border-[#C8A75B]
                pb-1
                text-[#C8A75B]
              "
            >
              Explore Collection →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}