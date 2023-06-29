import { calculateReadingTime, formatDate } from '../../utils/helpers'
import { db } from '../../firebase/clientApp'
import { Fragment } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import Custom404 from '../404'
import { fetchBlogs } from '../../utils/api'

const Blogs = () => {
    const { data, isLoading, isError } = useQuery('blogs', fetchBlogs)

    if (isError) {
        return <Custom404></Custom404>
    }

    return (
        <div className="mx-auto max-w-xl">
            <div className="font-light text-sm mt-16">
                <div className="flex justify-between">
                    <p className="text-black">Blog</p>
                    <Link href="/rss.xml"><a title="RSS feed" className="hover:text-black transition-colors duration-300" target="_blank" rel="noopener noreferrer"><i className="fas fa-rss"></i></a></Link>
                </div>
                <div className="text-neutral-500 dark:text-neutral-400 mt-3 space-y-3">
                    <div className="grid gap-6 mt-3">
                    {
                        <div className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                            {
                                isLoading ? <></> : data.map(blog => (
                                    <Fragment key={blog.id}>
                                        <p className="dark:text-neutral-400 text-neutral-400">{formatDate(blog.created_at.toDate())}</p>
                                        <div className="md:col-span-2 w-full">
                                            <p className="dark:text-white text-black duration-200 hover:no-underline underline"><Link href={`/blog/${blog.id}`}>{blog.title}</Link></p>
                                            <p>{calculateReadingTime(blog.content)} minute read</p>
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <div className="mt-1">
<span className="bg-gray-100 text-gray-800 text-xs font-extralight px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Dark</span>
<span className="bg-gray-100 text-gray-800 text-xs font-extralight ml-1 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">tech</span>
</div> */}

export default Blogs;
