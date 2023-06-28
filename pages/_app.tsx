import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import Footer from '../components/Footer'
import Head from 'next/head'
import Header from '../components/Header'
import mailgo from 'mailgo'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import { useEffect } from 'react'

NProgress.configure({showSpinner: false})
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    mailgo({
      dark: true,
    });
  }, []);

  const headerLinks = pageProps?.headerLinks || [
    { href: '/', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <Head>
          <title>Home</title>
        </Head>
        <Header links={headerLinks} />
        <div className="mx-auto max-w-7xl px-8 py-12 lg:pt-24">
          <Component {...pageProps} />
        </div>
        <Footer />
        <Analytics />
      </main>
    </>
  )
}

export default MyApp
