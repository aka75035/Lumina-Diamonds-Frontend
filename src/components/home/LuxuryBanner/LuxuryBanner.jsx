export default function LuxuryBanner() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 overflow-hidden rounded-[40px] bg-[#F8F5F0]">

          {/* Left */}

          <div className="flex items-center p-12 lg:p-20">

            <div>

              <p className="uppercase tracking-[6px] text-[#C7A95B] text-sm">
                Wedding Collection
              </p>

              <h2 className="font-serif text-5xl lg:text-6xl leading-tight mt-5">
                Celebrate
                <br />
                Forever
              </h2>

              <p className="text-gray-600 mt-8 text-lg leading-8 max-w-md">
                Every love story deserves jewellery that lasts forever.
                Discover handcrafted engagement rings and bridal
                collections designed to become family heirlooms.
              </p>

              <a
                href="/jewellery?collection=Ishvara"
                className="inline-block mt-10 bg-black text-white px-8 py-4 rounded-full"
              >
                Explore Collection
              </a>

            </div>

          </div>

          {/* Right */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1800&auto=format&fit=crop"
              alt="Wedding Jewellery"
              className="w-full h-full object-cover min-h-[500px]"
            />

          </div>

        </div>

      </div>

    </section>
  );
}