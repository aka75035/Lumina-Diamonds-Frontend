import React, { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileMenu from "./MobileMenu";
import ProductBar from "./ProductBar";

import Login from "../login";
import Signup from "../signUp";

import useAuth from "../../hooks/useAuth";
import { checkLogin } from "../../lib/User";
import {
  getAllCollections,
  getParentChildCategories,
} from "../../lib/api";

export default function Navbar() {
  const { loggedIn, setLoggedIn, user, setUser } = useAuth();

  const [parentCategory, setParentCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [collection, setCollection] = useState([]);

  const [open, setOpen] = useState(false);

  // Login Modal
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    checkLogin(setLoggedIn, setUser);

    async function fetchData() {
      try {
        const [
          { parentCategories, childCategories },
          allCollections,
        ] = await Promise.all([
          getParentChildCategories(),
          getAllCollections(),
        ]);

        setParentCategory(parentCategories || []);
        setChildCategory(childCategories || []);
        setCollection(allCollections || []);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">

      <DesktopNavbar
        loggedIn={loggedIn}
        setShowLogin={setShowLogin}
      />

      <MobileNavbar
        loggedIn={loggedIn}
        setOpen={setOpen}
        setShowLogin={setShowLogin}
      />

      <MobileMenu
        open={open}
        setOpen={setOpen}
        categories={parentCategory}
        collections={collection}
      />

      <ProductBar
        parentCategories={parentCategory}
        childCategories={childCategory}
        collections={collection}
      />

      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
      />

      <Signup
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
      />

    </header>
  );
}