import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Hello!</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
