import { collection, getDocs } from 'firebase/firestore'
import { calculateReadingTime } from '../blog/[id]'
import { db } from '../../firebase/clientApp'
import { Fragment } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import Custom404 from '../404'

const Blog = () => {
    
    const fetchBlogs = async () => {
        const response  = await getDocs(collection(db, "blogs"))
        return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }

    const { data, isLoading, isError } = useQuery('blogs', fetchBlogs)

    const formatDate = (date) => `${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}.${date.getFullYear()}`

    if (isError) {
        return <Custom404></Custom404>
    }

    return (
        <div className="mx-auto max-w-xl">
            <div className="font-light text-sm mt-16">
                <p className="text-black">
                    Blog
                </p>
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

export default Blog;
