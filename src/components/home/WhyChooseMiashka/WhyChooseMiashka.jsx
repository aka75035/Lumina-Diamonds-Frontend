import {
  ShieldCheck,
  Gem,
  Truck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Authenticity",
    description:
      "Every jewellery piece is crafted using certified diamonds and precious metals with complete transparency.",
  },
  {
    icon: Gem,
    title: "Master Craftsmanship",
    description:
      "Designed by skilled artisans with exceptional attention to detail, precision, and timeless elegance.",
  },
  {
    icon: Truck,
    title: "Insured Worldwide Delivery",
    description:
      "Secure, insured, and carefully packaged deliveries ensuring your jewellery arrives safely.",
  },
  {
    icon: Sparkles,
    title: "Lifetime Service",
    description:
      "Professional cleaning, polishing, resizing, and aftercare services to preserve your jewellery forever.",
  },
];

export default function WhyChooseMiashka() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-[#C8A75B] text-sm font-medium mb-4">
            The MIASHKA Difference
          </p>

          <h2
            className="text-4xl md:text-5xl text-black mb-6"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            Luxury Beyond Jewellery
          </h2>

          <p className="text-gray-600 text-lg leading-8 font-light">
            Every MIASHKA creation reflects exceptional craftsmanship,
            authenticity, and an uncompromising commitment to timeless luxury.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-gray-100 p-10 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-[#F8F6F1] flex items-center justify-center mb-8">
                  <Icon
                    size={30}
                    className="text-[#C8A75B]"
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  className="text-2xl text-black mb-4"
                  style={{ fontFamily: "Cormorant Garamond" }}
                >
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}