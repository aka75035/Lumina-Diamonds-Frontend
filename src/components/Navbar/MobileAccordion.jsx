import React from "react";
import { Link } from "react-router-dom";

export default function MobileAccordion({
  title,
  items = [],
  openSection,
  toggleSection,
  sectionKey,
  baseLink
}) {

  
  return (

    <div>

      <button
        onClick={() => toggleSection(sectionKey)}
        className="
          w-full
          flex
          justify-between
          items-center
          text-2xl
          text-gray-800
        "
      >

        <span>{title}</span>

        <span>
          {openSection === sectionKey ? "−" : "+"}
        </span>

      </button>

      {openSection === sectionKey && (

        <div className="ml-4 mt-4 flex flex-col gap-3">

          {items.map((item) => {

            return (
              <a
                key={item.slug}
                href={`${baseLink}/${item.slug}`}
                className="
                  text-lg
                  text-gray-600
                  hover:text-black
                "
              >
                {item.name}
              </a>
            );

          })}

        </div>

      )}

    </div>

  );
}