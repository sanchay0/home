import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { calculateReadingTime, formatDate, validateEmail } from '../../utils/helpers'
import { fetchBlogs, putSubscriberIfAbsent } from '../../utils/api'

type BlogProps = {
    sortedData: IPost[];
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const fetchedBlogs = await fetchBlogs()
        const sortedBlogs = fetchedBlogs.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )

        return {
            props: {
                sortedData: JSON.parse(JSON.stringify(sortedBlogs)),
            },
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return {
            props: {
                sortedData: [],
            },
        }
    }
}

export default function Blogs({ sortedData }: BlogProps) {
    const [subscribed, setSubscribed] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)

    const handleSubscribe = async () => {
        if (!subscribed && inputValue) {
            if (!validateEmail(inputValue)) {
                setIsValidEmail(false)
            } else {
                setIsValidEmail(true)
                const subscriber: ISubscriber = {
                    email: inputValue,
                }
                putSubscriberIfAbsent(subscriber)
                setSubscribed(true)
            }
        }
        setInputValue('')
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
                            <p className="col-span-1 text-neutral-400">{formatDate(new Date(post.createdAt))}</p>
                            <div className="col-span-2 md:col-span-2 w-full">
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
                    <div className="mt-12 md:mt-12 items-center justify-center">
                        <div className="flex">
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
                        </div>
                        <div className="text-sm mt-1 text-red-400">{ isValidEmail ? '' : 'Please enter a valid email' }</div>
                    </div> }
                </div>
            </div>
        </div>
        </>
    )
}