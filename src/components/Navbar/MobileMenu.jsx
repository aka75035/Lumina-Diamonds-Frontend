import React, { useState } from "react";

import MobileAccordion from "./MobileAccordion";

export default function MobileMenu({
  open,
  setOpen,
  categories,
  collections
}) {

  const [openSection, setOpenSection] = useState(null);

  function toggleSection(section) {

    setOpenSection(
      openSection === section
        ? null
        : section
    );

  }

  return (

    <nav
      className={`
        lg:hidden
        fixed
        top-0
        left-0
        w-full
        h-screen
        bg-white
        z-50
        flex
        flex-col
        gap-6
        p-8
        transform
        transition-transform
        duration-500
        ease-in-out
        overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >

      <button
        onClick={() => setOpen(false)}
        className="text-4xl self-end"
      >
        ×
      </button>

      <MobileAccordion
        title="Jewellery"
        items={categories}
        openSection={openSection}
        toggleSection={toggleSection}
        sectionKey="jewellery"
        baseLink="/product/category"
      />

      <MobileAccordion
        title="Collections"
        items={collections}
        openSection={openSection}
        toggleSection={toggleSection}
        sectionKey="collections"
        baseLink="/collections"
      />

      <a
        href="/cart"
        className="text-2xl text-gray-800"
      >
        Cart
      </a>

    </nav>

  );
}