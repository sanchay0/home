import Link from 'next/link'

export default function Header({ links }: HeaderProps) {
    return (
        <ul className="flex justify-center mt-10">
            { links ? links.map((link) => (
            <li key={link.href} className="mr-6 hover:text-black transition-colors duration-300">
                <Link href={link.href}>{link.label}</Link>
            </li>
            )) : null}
        </ul>
    )
}