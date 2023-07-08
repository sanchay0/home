import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { calculateReadingTime, formatDate } from '../../utils/helpers'
import { fetchBlogs } from '../../utils/api'

export default function Blogs() {
  const [sortedData, setSortedData] = useState<IPost[]>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [inputValue, setInputValue] = useState('')
//   const [tags, setTags] = useState<ITag[]>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedBlogs = await fetchBlogs()
                // const fetchedTags = await fetchTags()
                // setTags(fetchedTags)

                const sortedBlogs = fetchedBlogs.sort(
                    (a, b) => b.created_at.getTime() - a.created_at.getTime()
                )

                setSortedData(sortedBlogs)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }

        getData()
    }, [])

    const handleSubscribe = () => {
        if (!subscribed && inputValue) {
            setSubscribed(true)
        }
        setInputValue('')
        // TODO: add subscribe functionality
        // use {merge: true} when setting the subscriber email in firestore
        // also check if user is already subscribed
    }

    const handleInputChange = (e) => {
        setSubscribed(false)
        setInputValue(e.target.value)
    }


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
                    { sortedData && sortedData.map((post) => (
                        <div
                        key={post.id}
                        className="grid grid-cols-3 items-start md:grid-cols-3 text-neutral-500"
                        >
                            <p className="text-neutral-400">{formatDate(post.created_at)}</p>
                            <div className="md:col-span-1 w-full">
                                <Link href={`/blog/${post.id}`}>
                                    <span className="text-black cursor-pointer duration-200 hover:no-underline underline">
                                    {post.title}
                                    </span>
                                </Link>
                                <p>{calculateReadingTime(post.content)} minute read</p>
                            </div>
                        </div>
                    ))}
                    { sortedData && 
                    <div className="flex mt-12 md:mt-12 items-center justify-center">
                        <input
                            id="post-reply"
                            className="font-light focus:outline-none resize-none block p-2.5 w-3/4 border-b border-white focus:border-gray-600 mt-2 placeholder-gray-400"
                            placeholder="To receive future updates in your inbox, enter your email"
                            onChange={handleInputChange}
                            autoComplete="off"
                            value={inputValue} />
                        <button
                            type="button"
                            className="bg-gray-100 font-light hover:bg-gray-200 hover:text-gray-500 text-gray-400 text-sm px-4 py-2 duration-300 rounded-full ml-2"
                            onClick={handleSubscribe}>
                            { subscribed ? 'Subscribed!' : 'Subscribe' }
                        </button>
                    </div> }
                {/* { !tag && tags && (
                    <div className="font-light text-sm">
                        <p className="text-black">Labels</p>
                        <div className="flex mt-3">
                            {tags.map(t => (
                                <span key={t.id} className="mr-2">
                                    <Link href={`/blog/labels/${t.id}`}>
                                        <span className="cursor-pointer duration-200 hover:no-underline underline">{t.name}</span>
                                    </Link>
                                </span>
                            ))}
                        </div>
                    </div>
                )} */}
                </div>
            </div>
        </div>
        </>
    )
}
