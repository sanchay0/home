import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import { calculateReadingTime, formatDate } from "../utils/helpers";
import { fetchBlogs } from "../utils/api";
import EmailSubscriptionForm from "../components/EmailSubscriptionForm";

type BlogProps = {
  sortedData: IPost[];
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const fetchedBlogs = await fetchBlogs();
    const sortedBlogs = fetchedBlogs
      .map((post) => ({ ...post, createdAt: new Date(post.createdAt) }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
      props: {
        sortedData: JSON.parse(JSON.stringify(sortedBlogs)),
      },
      revalidate: 5,
    };
  } catch {
    return {
      props: {
        sortedData: [],
      },
    };
  }
};

export default function Blogs({ sortedData }: BlogProps) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="grid gap-12 md:gap-24 mt-16">
        <div className="font-light text-sm">
          <div className="flex justify-between items-center">
            <span className="text-black">Blog</span>
            <Link href="/rss.xml" aria-label="RSS Feed">
              <span>
                <i className="fas fa-rss hover:text-black transition-colors duration-300" />
                <span className="sr-only">RSS Feed</span>
              </span>
            </Link>
          </div>
          <div className="grid gap-6 mt-3">
            {sortedData.map(({ id, createdAt, title, content }) => (
              <div
                key={id}
                className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"
              >
                <div>
                  <p className="text-neutral-400">
                    {formatDate(new Date(createdAt))}
                  </p>
                </div>
                <div className="md:col-span-2 w-full">
                  <Link href={`/blog/${id}`}>
                    <span className="text-black cursor-pointer duration-200 hover:no-underline underline">
                      {title}
                    </span>
                  </Link>
                  <p className="mt-1 md:mt-0">
                    {calculateReadingTime(content)} minute read
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <EmailSubscriptionForm />
          </div>
        </div>
      </div>
    </>
  );
}
