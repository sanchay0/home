import Link from 'next/link'
import { logout, useAuth } from '../utils/authHandler'

type ModileMenuProps = {
    links: IHeader[];
    isOpen: any;
    onClose: any;
}

export default function MobileMenu({ links, isOpen, onClose }: ModileMenuProps) {
  const currentUser = useAuth()

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => onClose()} className={`absolute z-10 text-5xl font-thin flex flex-col justify-center origin-top w-full top-0 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white flex flex-col min-h-screen items-center py-8" aria-label="mobile">
        {currentUser && (
          <>
            <span className="mt-20 text-3xl capitalize">Welcome, {currentUser.displayName.split(' ')[0]}!</span>
            <button
              type="button"
              className="mt-2 flex font-thin text-black underline items-center text-2xl"
              onClick={logout}
            >
              (logout)
            </button>
          </>
        )}
        <ul className="mt-16">
          {links &&
            links.map((link) => (
              <li
                key={link.href}
                className="w-full text-center py-8 hover:text-black transition-colors duration-300"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
