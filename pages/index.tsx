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
    const sortedBlogs = fetchedBlogs.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    return {
      props: {
        sortedData: JSON.parse(JSON.stringify(sortedBlogs)),
      },
      revalidate: 10,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
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
          <div className="flex justify-between">
            <div>
              <span className="text-black">Blog</span>
            </div>
            <Link href="/rss.xml">
              <i className="fas fa-rss hover:text-black transition-colors duration-300" />
            </Link>
          </div>
          <div className="grid gap-6 mt-3">
            {sortedData &&
              sortedData.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"
                >
                  <div>
                    <p className="text-neutral-400">
                      {formatDate(new Date(post.createdAt))}
                    </p>
                  </div>
                  <div className="md:col-span-2 w-full">
                    <Link href={`/blog/${post.id}`}>
                      <p className="text-black cursor-pointer duration-200 hover:no-underline underline">
                        {post.title}
                      </p>
                    </Link>
                    <p className="mt-1 md:mt-0">
                      {calculateReadingTime(post.content)} minute read
                    </p>
                  </div>
                </div>
              ))}
            {sortedData && <EmailSubscriptionForm />}
          </div>
        </div>
      </div>
    </>
  );
}
