import Head from "next/head";
import { GetStaticProps } from "next";
import { fetchQuotes } from "../../utils/api";

interface QuotesProps {
  quotes: IQuote[];
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchQuotes();
  const quotes = data
    .map((q: any) => ({
      ...q,
      createdAt: q.createdAt.toDate().toISOString(),
    }))
    .sort(
      (a: IQuote, b: IQuote) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  return {
    props: {
      quotes,
    },
    revalidate: 5,
  };
};

export default function Quotes({ quotes }: QuotesProps) {
  return (
    <>
      <Head>
        <title>Quotes</title>
      </Head>
      <div className="grid gap-12 md:gap-24 font-light text-sm mt-16">
        <div>
          <div className="flex justify-between">
            <span className="text-black">Quotes</span>
          </div>
          <div className="mt-3 text-neutral-500">
            <p>
              I love quotes, the best ones pack a book&apos;s worth of insight
              into just a few lines. Here are some of my favorites that I like
              to revisit from time to time.
            </p>
          </div>
          {/* Quotes grid */}
          <div className="grid gap-6 mt-16">
            {quotes.map(({ id, content, author }, idx) => (
              <div
                key={id}
                className="md:grid md:grid-cols-3 items-start text-neutral-500"
              >
                <div
                  className={`
                    md:col-span-2 w-full
                    ${idx % 2 === 0 ? "md:col-start-1 text-left" : "md:col-start-2 text-right"}
                  `}
                >
                  <p className="italic text-black dark:text-white mb-2">
                    &ldquo;{content}&rdquo;
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    — {author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
