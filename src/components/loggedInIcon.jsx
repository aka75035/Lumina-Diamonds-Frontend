import userIcon from "../assets/user.png";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../lib/User";

export default function LoggedInIcon({ setShowLogin }) {

  const {
    loggedIn,
    setLoggedIn,
  } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <button
        onClick={() => setShowLogin(true)}
        className="text-sm font-medium hover:text-gray-600"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative group">

      <a href="/Account">
        <button className="pt-2">
          <img
            src={userIcon}
            alt="User"
            className="w-5"
          />
        </button>
      </a>

      <div
        className="
          absolute
          right-0
          top-full
          invisible
          opacity-0
          group-hover:visible
          group-hover:opacity-100
          transition-all
          duration-300
          bg-white
          shadow-xl
          rounded-lg
          p-3
          min-w-[140px]
          z-[9999]
        "
      >

        <button
          onClick={handleLogout}
          className="w-full text-left hover:text-blue-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}