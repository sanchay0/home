import Footer  from '../components/Footer'
import Header from '../components/Header'

export default function HomePage() {
    const headerLinks = [
        { href: '/', label: 'About' },
        { href: '/blog', label: 'Blog' },
      ];

    return (
        <div>
            <main className="flex-1 overflow-y-auto">
            <Header links={headerLinks} />
            <div className="mx-auto max-w-7xl px-8 py-12 lg:pt-24">
                Feel free to shoot me a message on <a className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="https://twitter.com/sanchayjaveria" title="Twitter">Twitter</a>, or you can also send me an email at <a className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="mailto:sanchayjaveria@gmail.com" title="Email">sanchayjaveria [at] gmail [dot] com</a>
            </div>
            <Footer />
            </main>
        </div>
    )
}
