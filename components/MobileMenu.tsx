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
    <div onClick={() => onClose()} className={`fixed z-10 w-full text-3xl font-thin flex flex-col justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white flex flex-col min-h-screen items-center py-8" aria-label="mobile">
        { currentUser && <span className="mt-20 capitalize font-light">Welcome, {currentUser.displayName.split(' ')[0]}!</span> }
        <ul className="mt-20">
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
        { currentUser &&
          <button
            type="button"
            className="mt-20 flex font-thin items-center"
            onClick={logout}
          >
            Logout
          </button>
        }
        <div className="flex fixed bottom-8">
          <div className="text-sm mt-2 text-gray-500">
              <Link href="/terms">Terms</Link> & <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
