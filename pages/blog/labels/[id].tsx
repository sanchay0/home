import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchBlogsByTag, fetchTag } from "../../../utils/api";
import { calculateReadingTime, formatDate } from "../../../utils/helpers";
import EmailSubscriptionForm from "../../../components/EmailSubscriptionForm";

export default function Labels() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [tag, setTag] = useState<ITag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useRouter().query;

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    Promise.all([fetchBlogsByTag(`${id}`), fetchTag(`${id}`)])
      .then(([blogs, tagData]) => {
        const sortedBlogs = blogs
          .map((post: any) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        setPosts(sortedBlogs);
        setTag(tagData);
        setError(null);
      })
      .catch(() => setError("Failed to load posts."))
      .finally(() => setLoading(false));
  }, [id]);

  let body;
  if (loading) {
    body = <span>Loading...</span>;
  } else if (error) {
    body = <span>{error}</span>;
  } else if (posts.length === 0) {
    body = <span>No posts found.</span>;
  } else {
    body = posts.map(({ id: postId, createdAt, title, content }) => (
      <div
        key={postId}
        className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500"
      >
        <p className="text-neutral-400">{formatDate(createdAt)}</p>
        <div className="md:col-span-2 w-full">
          <Link href={`/blog/${postId}`}>
            <span className="text-black cursor-pointer duration-200 hover:no-underline underline">
              {title}
            </span>
          </Link>
          <p>{calculateReadingTime(content)} minute read</p>
        </div>
      </div>
    ));
  }

  return (
    <>
      <Head>
        <title>Blog - {tag?.name || "tag"}</title>
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
          <div className="grid gap-6 mt-3">{body}</div>
          <div className="mt-12">
            <EmailSubscriptionForm />
          </div>
        </div>
      </div>
    </>
  );
}
