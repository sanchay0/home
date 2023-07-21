import { useState } from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { logout, useAuth } from '../utils/authHandler'

export default function Header({ links }: HeaderProps) {
  const currentUser = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const genericHamburgerLine = "h-0.5 w-6 my-1 bg-gray-800 transition ease transform duration-300"

  return (
    <>
      <button
        type="button"
        className="flex md:hidden relative z-40 flex-col h-12 w-12 justify-center items-center group float-right mt-4 mr-4"
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
        <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"}`} />
      </button>

      <div className="invisible md:visible grid grid-cols-3 items-center mt-10">
            <div className="col-span-1" />
            <div className="col-span-1 flex justify-center">
            <ul className="flex">
                {links &&
                links.map((link) => (
                    <li
                    key={link.href}
                    className="mr-6 hover:text-black transition-colors duration-300"
                    >
                    <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
            </div>
            <div className="col-span-1 flex justify-center">
            {currentUser && (
                <>
                <span>Welcome, {currentUser.displayName.split(' ')[0]}!</span>
                <button type="button"
                    className="ml-2 flex font-light text-black items-center text-sm duration-200 hover:no-underline underline"
                    onClick={logout}
                    >
                    (logout)
                </button>
                </>
            )}
            </div>
      </div>

      <MobileMenu links={links} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}