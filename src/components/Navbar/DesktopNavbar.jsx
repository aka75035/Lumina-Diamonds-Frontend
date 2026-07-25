import logo from "../../assets/logo.png";
import CartIcon from "../cart/cartIcon";
import LoggedInIcon from "../loggedInIcon";

export default function DesktopNavbar({
  loggedIn,
  setShowLogin,
}) {

  return (
    <div className="hidden lg:flex mx-auto max-w-6xl px-4 items-center justify-between h-16">

      <nav className="flex items-center justify-between w-full">

        <a href="/" className="flex items-center">
          <img
            src={logo}
            alt="MIASHKA Logo"
            className="h-25 w-auto object-contain"
          />
        </a>

        <div className="flex items-center gap-8">

          <a href="/collections">COLLECTIONS</a>

          <a href="/jewellery">GIFTING</a>

          <a href="/journal">JOURNAL</a>

          <a href="/about">ABOUT</a>

          <a href="/contact">CONTACT</a>

          <a href="/jewellery">JEWELLERY</a>

        </div>

        <div className="flex items-center gap-4">

          <CartIcon />

          <LoggedInIcon
            loggedIn={loggedIn}
            setShowLogin={setShowLogin}
          />

        </div>

      </nav>

    </div>
  );
}