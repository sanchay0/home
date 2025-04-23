import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Quotes</title>
      </Head>
      <div className="grid gap-12 md:gap-24 font-light text-sm mt-16">
        <div className="font-light text-sm">
          <p className="dark:text-white text-black">Quotes</p>
          <div className="grid gap-6 mt-3">
            <div className="grid grid-cols-1 items-start md:grid-cols-1 text-neutral-500">
              <p>
                I love quotes, the best ones pack a book&apos;s worth of insight into just a few lines. Here are some of my favorites that I like to revisit from time to time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
