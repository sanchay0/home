import '../styles/globals.css'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
