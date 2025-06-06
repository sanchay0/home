import Link from "next/link";
import { logout, useAuth } from "../utils/authHandler";

export default function Header({ links }: HeaderProps) {
  const currentUser = useAuth();

  return (
    <div className="hidden lg:grid grid-cols-3 items-center">
      <div className="col-span-1" />
      <div className="col-span-1 flex justify-center">
        <ul className="flex gap-x-8 list-none">
          {links &&
            links.map((link) => (
              <li
                key={link.href}
                className="hover:text-black transition-colors duration-300"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-span-1 flex justify-center">
        {currentUser && (
          <div className="flex items-center gap-x-2">
            <span className="capitalize">
              Welcome, {currentUser.displayName.split(" ")[0]}!
            </span>
            <button
              type="button"
              className="flex font-light text-black items-center text-sm duration-200 hover:no-underline underline"
              onClick={logout}
            >
              (logout)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
