import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#FCFBF8] py-24">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-[36px] bg-white border border-gray-100 shadow-sm p-10 md:p-16">

          {/* Heading */}

          <div className="text-center">

            <p className="uppercase tracking-[0.35em] text-[#C8A75B] text-sm font-medium mb-4">
              Stay Connected
            </p>

            <h2
              className="text-4xl md:text-5xl text-black mb-6"
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              Be the First to Discover
            </h2>

            <p className="mx-auto max-w-2xl text-gray-600 leading-8 text-lg">
              Receive exclusive access to new collections,
              limited-edition creations, luxury styling inspiration,
              and private events from LUMINA Diamonds.
            </p>

          </div>

          {/* Form */}

          <form
            className="mt-12 flex flex-col gap-4 md:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">

              <Mail
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter your email address"
                className="h-14 w-full rounded-full border border-gray-200 bg-white pl-14 pr-6 outline-none focus:border-[#C8A75B]"
              />

            </div>

            <button
              type="submit"
              className="h-14 rounded-full bg-black px-10 text-white transition-colors hover:bg-[#C8A75B]"
            >
              Subscribe
            </button>

          </form>

          {/* Bottom Text */}

          <p className="mt-6 text-center text-sm text-gray-500">
            By subscribing, you agree to receive updates from LUMINA Diamonds.
            You may unsubscribe at any time.
          </p>

        </div>
      </div>
    </section>
  );
}