import logo from "../../assets/logo.png";
import CartIcon from "../cart/cartIcon";
import LoggedInIcon from "../loggedInIcon";

export default function MobileNavbar({
  setOpen,
  loggedIn,
  setShowLogin,
}) {
  return (
    <div className="lg:hidden border-b bg-white">

      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          LUMINA
        </a>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <CartIcon />

          <LoggedInIcon
            loggedIn={loggedIn}
            setShowLogin={setShowLogin}
          />

          <button
            onClick={() => setOpen(true)}
            aria-label="Open Menu"
            className="flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>

        </div>

      </div>

    </div>
  );
}