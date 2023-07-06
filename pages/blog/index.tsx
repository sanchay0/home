import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { calculateReadingTime, formatDate } from '../../utils/helpers'
import { fetchBlogs } from '../../utils/api'

export default function Blogs() {
  const [sortedData, setSortedData] = useState<IPost[]>(null)
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
                </div>
            </div>
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
        </>
    )
}
