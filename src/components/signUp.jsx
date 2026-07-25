import { useState } from "react";
import {
  Eye,
  EyeOff,
  X,
  Mail,
  Lock,
  User,
  Phone,
} from "lucide-react";

import { signupUser } from "../lib/User";
import useAuth from "../hooks/useAuth";

export default function Signup({
  showSignup,
  setShowSignup,
  setShowLogin,
}) {
  const { setLoggedIn, setUser } = useAuth();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!showSignup) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (!acceptTerms) {
      alert("Please accept Terms & Conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signupUser({
        ...formData,
        setLoggedIn,
        setUser,
        setShowSignup,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="h-2 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>

        <button
          onClick={() => setShowSignup(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="px-10 py-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="MIASHKA"
              className="h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl font-serif font-semibold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Join MIASHKA Diamonds
          </p>

          {/* Name */}
          <div className="relative mb-4">
            <User
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="userName"
              placeholder="Full Name"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <Mail
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Mobile */}
          <div className="relative mb-4">
            <Phone
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">

            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-yellow-600"
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Confirm Password */}
          <div className="relative mb-5">

            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-yellow-600"
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 mb-6 text-sm text-gray-600 cursor-pointer">

            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              className="mt-1"
            />

            <span>
              I agree to the
              <button
                type="button"
                className="text-yellow-700 font-medium ml-1 hover:underline"
              >
                Terms & Conditions
              </button>
            </span>

          </label>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-black hover:bg-yellow-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-7">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-4 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google */}
          <button className="w-full border rounded-xl py-3 hover:bg-gray-100 transition font-medium">
            Continue with Google
          </button>

          {/* Login */}
          <p className="text-center mt-8 text-gray-500">

            Already have an account?

            <button
              onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              className="ml-2 text-yellow-700 font-semibold hover:underline"
            >
              Sign In
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}