import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function MobileMenuContainer({ links }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine =
    "h-0.5 w-6 my-1 bg-gray-800 transition ease transform duration-300";

  return (
    <>
      <button
        type="button"
        className={`flex lg:hidden ${isOpen ? "fixed" : "absolute"} top-0 right-0 z-40 flex-col h-12 w-12 justify-center items-center group mt-4 mr-4`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "rotate-45 translate-y-2.5 opacity-50 group-hover:opacity-100"
              : "opacity-50 group-hover:opacity-100"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "-rotate-45 opacity-50 group-hover:opacity-100"
              : "opacity-50 group-hover:opacity-100"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"}`}
        />
      </button>
      <MobileMenu
        links={links}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
