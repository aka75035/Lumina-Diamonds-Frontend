import { FaInstagram } from "react-icons/fa";
import { gallery } from "../../../utils/Insta";

export default function InstagramGallery({ Gallery = [] }) {
//   if (!gallery.length) return null;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center mb-16">

          <p className="uppercase tracking-[0.35em] text-[#C8A75B] text-sm font-medium mb-4">
            Follow Our Journey
          </p>

          <h2
            className="text-2xl transition-smooth md:text-5xl text-black mb-6"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            @MIASHKADIAMONDS
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            Discover our latest collections, craftsmanship,
            and behind-the-scenes moments.
          </p>

        </div>

        {/* Gallery */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {gallery.map((image) => (

            <a
              key={image._id}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >

              <div className="overflow-hidden rounded-3xl bg-gray-100 aspect-square">

                <img
                  src={image.image}
                  alt={image.alt || "MIASHKA Diamonds"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

              </div>

            </a>

          ))}

        </div>

        {/* Button */}

        <div className="flex justify-center mt-16">

          <a
            href="https://www.instagram.com/miashka_diamonds/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[#C8A75B] px-8 py-4 text-black hover:bg-[#C8A75B] hover:text-white transition-colors"
          >

            <FaInstagram size={20} />

            Follow on Instagram

          </a>

        </div>

      </div>
    </section>
  );
}