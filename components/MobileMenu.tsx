import Link from "next/link";
import { logout, useAuth } from "../utils/authHandler";

type ModileMenuProps = {
  links: IHeader[];
  isOpen: any;
  isFirstRender: any;
  onClose: any;
};

export default function MobileMenu({
  links,
  isOpen,
  isFirstRender,
  onClose,
}: ModileMenuProps) {
  const currentUser = useAuth();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => onClose()}
      className={`fixed z-10 w-full text-xl font-light lg:hidden ${isOpen ? "animate-slide-in" : `animate-slide-out ${isFirstRender ? "hidden" : ""}`}`}
    >
      <div
        className="bg-white min-h-screen grid grid-cols-1 place-content-start gap-y-16 px-8 py-28 text-right w-10/12 ml-auto shadow-lg"
        aria-label="mobile"
      >
        {currentUser && (
          <span className="text-gray-800 capitalize">
            Welcome, {currentUser.displayName.split(" ")[0]}!
          </span>
        )}
        {links &&
          links.map((link) => (
            <div
              key={link.href}
              className={`transition-colors duration-300 ${currentUser ? "underline" : "text-gray-800"}`}
            >
              <Link href={link.href}>{link.label}</Link>
            </div>
          ))}
        {currentUser && (
          <button
            type="button"
            className="flex font-light text-gray-800 items-center justify-end"
            onClick={logout}
          >
            Logout
          </button>
        )}
        <div className="text-sm mt-2 text-gray-500">
          <Link href="/terms">Terms</Link> &{" "}
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </div>
  );
}
