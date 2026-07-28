import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2
              className="text-4xl text-black"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              LUMINA
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              Fine diamond jewellery crafted with timeless elegance,
              exceptional craftsmanship, and uncompromising quality.
            </p>

            <div className="mt-6 flex gap-4 text-lg">
              <a
                href="https://www.instagram.com/akash_yadav_7503/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8A75B]"
              >
                <FaInstagram />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8A75B]"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://wa.me/917007715017"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8A75B]"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3
              className="mb-5 text-2xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              About
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3
              className="mb-5 text-2xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Policies
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/return-policy">Return Policy</Link></li>
              <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="mb-5 text-2xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Get in Touch
            </h3>

            <div className="space-y-4 text-gray-600">
              <p>
                Email<br />
                <a
                  href="mailto:akashy9810@gmail.com"
                  className="hover:text-[#C8A75B]"
                >
                  akashy9810@gmail.com
                </a>
              </p>

              <p>
                Phone<br />
                <a
                  href="tel:+917007715017"
                  className="hover:text-[#C8A75B]"
                >
                  +91 70077 15017
                </a>
              </p>

              <p>
                Monday – Saturday<br />
                10:30 AM – 5:30 PM
              </p>
            </div>
          </div>

        </div>

        <div className="mt-14 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LUMINA Diamonds. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}