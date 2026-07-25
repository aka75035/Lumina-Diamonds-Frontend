import { Star } from "lucide-react";
import { Testimonials } from "../../../utils/Testmonials";

export default function CustomerTestimonials({
  testimonials = [],
}) {
  if (!Testimonials.length) return null;

  return (
    <section className="bg-[#FCFBF8] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-sm font-medium mb-4">
            Testimonials
          </p>

          <h2
            className="text-4xl md:text-5xl text-black mb-6"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            Loved by Our Clients
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            Every creation tells a story. Here's what our clients say
            about their MIASHKA experience.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Testimonials.map((item) => (
            <article
              key={item._id}
              className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating || 5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-[#C8A75B] text-[#C8A75B]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-8 text-[15px] mb-8">
                "{item.review}"
              </p>

              {/* Customer */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-gray-100">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <h3
                    className="text-xl text-black"
                    style={{
                      fontFamily: "Cormorant Garamond",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}