import { useEffect, useState } from 'react'
import Link from 'next/link'
import { calculateReadingTime, formatDate } from '../../utils/helpers'
import { fetchBlogs } from '../../utils/api'

export default function Blogs() {
    const [data, setData] = useState<IPost[]>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedBlogs: IPost[] = await fetchBlogs()
                setData(fetchedBlogs)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }

        getData()
    }, [])

    return (
        <div className="mx-auto max-w-xl">
            <div className="font-light text-sm mt-16">
                <div className="flex justify-between">
                    <p className="text-black">Blog</p>
                    <Link href="/rss.xml"><i className="fas fa-rss hover:text-black transition-colors duration-300" /></Link>
                </div>
                <div className="text-neutral-500 mt-3 space-y-3">
                    <div className="grid gap-6 mt-3">
                        {
                            data ? data.map(post => (
                                <div key={post.id} className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                                    <p className="text-neutral-400">{formatDate(post.created_at)}</p>
                                    <div className="md:col-span-2 w-full">
                                        <p className="text-black duration-200 hover:no-underline underline"><Link href={`/blog/${post.id}`}>{post.title}</Link></p>
                                        <p>{calculateReadingTime(post.content)} minute read</p>
                                    </div>
                                </div>
                            )) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
