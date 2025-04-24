import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchQuotes } from "../../utils/api";

export default function Quotes() {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes().then((data) => {
      const sorted = data
        .map((q: any) => ({
          ...q,
          createdAt: q.createdAt.toDate(),
        }))
        .sort(
          (a: IQuote, b: IQuote) =>
            a.createdAt.getTime() - b.createdAt.getTime(),
        );
      setQuotes(sorted);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

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
