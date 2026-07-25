import { useState } from "react";
import { Eye, EyeOff, X, Mail, Lock } from "lucide-react";
import { loginUser } from "../lib/User";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function Login({
  showLogin,
  setShowLogin,
  setShowSignup,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setLoggedIn, setUser, user } = useAuth();

  if (!showLogin) return null;

  async function handleLogin() {
    try {
      setLoading(true);

      await loginUser({
        email,
        password,
        remember,
        setShowLogin,
        setLoggedIn,
        setUser,
        user,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Gold Top Bar */}
        <div className="h-2 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>

        {/* Close Button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-black transition"
        >
          <X size={24} />
        </button>

        <div className="px-10 py-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="MIASHKA"
              className="h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl font-serif text-center font-semibold text-gray-900">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Sign in to your MIASHKA account
          </p>

          {/* Email */}
          <div className="relative mb-5">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 focus:outline-none focus:border-yellow-600 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* Password */}
          <div className="relative mb-4">

            <Lock
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-3 focus:outline-none focus:border-yellow-600 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Remember */}
          <div className="flex justify-between items-center text-sm mb-7">

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />

              Remember Me

            </label>

            <button className="text-yellow-700 hover:underline">
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            onClick={handleLogin}
            className="w-full bg-black hover:bg-yellow-700 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
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
          <button
            className="w-full border rounded-xl py-3 hover:bg-gray-100 transition font-medium"
          >
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center text-gray-500 mt-8">

            New to MIASHKA?

            <button
              className="text-yellow-700 ml-2 font-semibold hover:underline"
              onClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            >
              Create Account
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}