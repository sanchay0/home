import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import {
  calculateReadingTime,
  formatDate,
  validateEmail,
} from "../../utils/helpers";
import { fetchBlogs, putSubscriberIfAbsent } from "../../utils/api";

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
  const [subscribed, setSubscribed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [placeholder, setPlaceholder] = useState(
    "To receive future updates in your inbox, enter your email",
  );

  const handleSubscribe = async () => {
    if (!subscribed && inputValue) {
      if (!validateEmail(inputValue)) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
        const subscriber: ISubscriber = {
          email: inputValue,
        };
        putSubscriberIfAbsent(subscriber);
        setSubscribed(true);
      }
    }
    setInputValue("");
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 450) {
        setPlaceholder("Enter your email to receive future updates");
      } else {
        setPlaceholder(
          "To receive future updates in your inbox, enter your email",
        );
      }
    }

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    setSubscribed(false);
    setInputValue(e.target.value);
  };

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
            {sortedData && (
              <div className="mt-8 md:mt-12 mb-8 md:mb-12 items-center justify-center">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full">
                    <input
                      id="post-reply"
                      className="font-light text-base	md:text-sm focus:outline-none resize-none block p-2.5 w-full border-b border-white focus:border-gray-600 mt-2 placeholder-gray-400"
                      placeholder={placeholder}
                      onChange={handleInputChange}
                      autoComplete="off"
                      value={inputValue}
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-gray-100 font-light text-base md:text-sm hover:bg-gray-200 hover:text-gray-500 text-gray-400 px-4 py-3 duration-300 rounded-full md:ml-2 mt-2 md:mt-0"
                    onClick={handleSubscribe}
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </div>
                <div className="text-sm mt-1 text-red-400">
                  {isValidEmail ? "" : "Please enter a valid email"}
                </div>
                {/* <div className="flex">
                            <div className="text-xs mt-2 text-gray-400">
                                Email <Link href="/terms">Terms</Link> & <Link href="/privacy">Privacy</Link>
                            </div>
                        </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
