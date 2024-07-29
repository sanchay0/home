import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchBlogsByTag, fetchTag } from "../../../utils/api";
import { calculateReadingTime, formatDate } from "../../../utils/helpers";

export default function Labels() {
  const [sortedData, setSortedData] = useState<IPost[]>(null);
  const [tag, setTag] = useState<ITag>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      try {
        let fetchedBlogs: IPost[];
        if (id) {
          fetchedBlogs = await fetchBlogsByTag(`${id}`);
          const fetchedTag: ITag = await fetchTag(`${id}`);
          setTag(fetchedTag);
        }

        const sortedBlogs = fetchedBlogs.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );

        setSortedData(sortedBlogs);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getData();
  }, [id]);

  return (
    <>
      <Head>
        <title>Blog - {tag ? tag.name : "tag"}</title>
      </Head>
      <div className="grid gap-12 md:gap-24 mt-16">
        <div className="font-light text-sm">
          <div className="flex justify-between">
            <div>
              <span className="text-black">Blog</span>
              {tag && (
                <span className="bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs px-3 py-1 duration-200 rounded-full ml-2">
                  {tag.name}
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-6 mt-3">
            {sortedData &&
              sortedData.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"
                >
                  <p className="text-neutral-400">
                    {formatDate(post.createdAt)}
                  </p>
                  <div className="md:col-span-2 w-full">
                    <Link href={`/blog/${post.id}`}>
                      <span className="text-black cursor-pointer duration-200 hover:no-underline underline">
                        {post.title}
                      </span>
                    </Link>
                    <p>{calculateReadingTime(post.content)} minute read</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
