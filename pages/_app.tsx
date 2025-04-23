import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import mailgo from "mailgo";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Header from "../components/Header";
import MobileMenuContainer from "../components/MobileMenuContainer";

NProgress.configure({ showSpinner: false });

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  useEffect(() => {
    mailgo({
      showFooter: false,
    });
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  const headerLinks: IHeader[] = pageProps?.headerLinks || [
    { href: "/", label: "Blog" },
    { href: "/quotes", label: "Quotes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <main className="flex-1 overflow-y-visible">
      <MobileMenuContainer links={headerLinks} />
      <div className="mx-auto max-w-7xl px-8 py-12">
        <Header links={headerLinks} />
        <div
          className={`mx-auto max-w-xl ${currentPage !== "/admin" && currentPage !== "/blog/[id]" ? "" : "md:max-w-2xl"} lg:pt-24`}
        >
          <Component {...pageProps} />
        </div>
      </div>
      <Analytics />
    </main>
  );
}

export default MyApp;
