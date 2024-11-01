import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function MobileMenuContainer({ links }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const genericHamburgerLine =
    "h-0.5 w-6 my-1 bg-gray-800 transition ease transform duration-300";

  return (
    <>
      <button
        type="button"
        className={`flex lg:hidden ${isOpen ? "fixed" : "absolute"} top-0 right-0 z-40 flex-col h-12 w-12 justify-center items-center group mt-4 mr-4`}
        onClick={() => {
          if (isFirstRender) {
            // close button must've been clicked
            setIsFirstRender(false);
          }
          setIsOpen(!isOpen);
        }}
      >
        <div
          className={`${genericHamburgerLine} ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
        />
        <div
          className={`${genericHamburgerLine} ${isOpen ? "-rotate-45" : ""}`}
        />
        <div
          className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`}
        />
      </button>
      <MobileMenu
        links={links}
        isOpen={isOpen}
        isFirstRender={isFirstRender}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
