import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/clientApp'
import { Fragment } from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { calculateReadingTime } from '../blog/[id]'

const Blog = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const blogs = async () => {
            const response  = await getDocs(collection(db, "blogs"))
            setData(response.docs)
        }

        blogs()
    }, [])

    const formatDate = (date) => `${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}.${date.getFullYear()}`

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
                                data ? data.map(blog => ({id: blog.id, ...blog.data()})).map(entry => (
                                    <Fragment key={entry.id}>
                                        <p className="dark:text-neutral-400 text-neutral-400">{formatDate(entry.created_at.toDate())}</p>
                                        <div className="md:col-span-2 w-full">
                                            <p className="dark:text-white text-black duration-200 hover:no-underline underline"><Link href={`/blog/${entry.id}`}>{entry.title}</Link></p>
                                            <p>{calculateReadingTime(entry.content)} minute read</p>
                                        </div>
                                    </Fragment>
                                )) : <></>
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
