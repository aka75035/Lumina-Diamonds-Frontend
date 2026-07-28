import userIcon from "../assets/user.png";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../lib/User";

export default function LoggedInIcon({ setShowLogin }) {
  const { loggedIn, setLoggedIn } = useAuth();

  const handleLogout = async () => {
    const success = await logoutUser();

    if (!success) return;

    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <button
        onClick={() => setShowLogin(true)}
        className="text-sm font-medium transition-colors hover:text-[#B88A44]"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative group">
      <a href="/Account">
        <button className="flex items-center justify-center p-2 rounded-full transition hover:bg-[#F8F5F2]">
          <img
            src={userIcon}
            alt="Account"
            className="w-5 h-5 object-contain"
          />
        </button>
      </a>

      <div
        className="
          absolute
          right-0
          top-full
          mt-2
          w-48
          overflow-hidden
          rounded-2xl
          border
          border-[#ECE6DE]
          bg-white
          shadow-2xl
          opacity-0
          invisible
          translate-y-2
          transition-all
          duration-300
          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-y-0
          z-[9999]
        "
      >
        <a
          href="/Account"
          className="block px-5 py-3 text-sm text-gray-700 transition hover:bg-[#F8F5F2] hover:text-[#B88A44]"
        >
          My Account
        </a>

        <button
          onClick={handleLogout}
          className="w-full border-t border-[#ECE6DE] px-5 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}