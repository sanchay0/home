import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import mailgo from 'mailgo'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Footer from '../components/Footer'
import Header from '../components/Header'

NProgress.configure({showSpinner: false})
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  useEffect(() => {
    mailgo({
      showFooter: false,
    })
  }, [])

  const headerLinks: IHeader[] = pageProps?.headerLinks || [
    { href: '/', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
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
  )
}

export default MyApp
