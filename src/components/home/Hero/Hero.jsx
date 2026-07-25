import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2070&auto=format&fit=crop",
    title: "Timeless Elegance",
    subtitle: "Fine Jewellery Crafted For Every Chapter Of Your Story",
  },
  {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070&auto=format&fit=crop",
    title: "Luxury Redefined",
    subtitle: "Discover Handcrafted Diamond Jewellery",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=2070&auto=format&fit=crop",
    title: "Forever Begins Here",
    subtitle: "Celebrate Every Milestone With MIASHKA",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[92vh] overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-center">

            <div className="max-w-7xl mx-auto w-full px-6">

              <div className="max-w-xl">

                <p className="uppercase tracking-[8px] text-white text-sm mb-6">
                  MIASHKA DIAMONDS
                </p>

                <h1 className="text-white text-5xl lg:text-7xl font-serif leading-tight">
                  {slide.title}
                </h1>

                <p className="text-gray-200 mt-8 text-lg leading-8">
                  {slide.subtitle}
                </p>

                <div className="mt-10 flex gap-4">

                  <a
                    href="/collections"
                    className="bg-[#C7A95B] text-black px-8 py-4 rounded-full font-medium"
                  >
                    Shop Collection
                  </a>

                  <a
                    href="/jewellery"
                    className="border border-white text-white px-8 py-4 rounded-full"
                  >
                    Explore
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>
      ))}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              current === index
                ? "bg-[#C7A95B] w-10"
                : "bg-white/50 w-2"
            }`}
          />
        ))}

      </div>

    </section>
  );
}